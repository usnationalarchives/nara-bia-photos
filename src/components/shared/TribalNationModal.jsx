import React, { setState, useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { countBy, concat, orderBy, fromPairs, uniqBy } from 'lodash';
import { Link } from 'react-router-dom';
import chroma, { scale } from 'chroma-js';
import tinycolor from 'tinycolor2';
import ReactTooltip from 'react-tooltip';
import scroll from '@threespot/freeze-scroll';

import { ReactComponent as CrossIcon } from '#assets/icons/cross.svg';

// constants
import { tribalNations } from '#modules/constants';
import { getRecordTopics } from '#modules/helpers';
import { records, actions, groups } from '#modules/data';

// helpers
import { joinParams } from '#modules/helpers';

// modules
import iiifImage from '#modules/iiifImage';

// hooks
import useRecords from '#hooks/useRecords';

// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import Select from '#components/shared/Select';
import Button from '#components/shared/Button';

// styles
import * as frontline from '#styles/frontline';
import { colors } from '#styles/theme';

const TopicChartWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const TopicChart = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 3rem;
  min-width: 900px;
`;

const TopicChartItem = styled.li`
  /* background-color: ${props => props.color}; */
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 0 1 ${props => props.percentage}%;
  height: 100px;
  overflow-x: hidden;
  position: relative;
  justify-content: center;

  &:before {
    background-color: #fff;
    content: '';
    height: 100%;
    position: absolute;
    right: 0;
    width: 1px;
    z-index: 2;
  }

  button {
    background-color: ${props => props.color};
    color: ${props => props => tinycolor.mostReadable(props.color, ['#000', '#fff', { level: 'AA', size: 'large' }])};
    transition: background-color 0.3s ease;
    width: 100%;

    ${frontline.fl_static(css`
      background-color: ${props => props.color};
    `)}
    ${frontline.fl_attention(css`
      background-color: ${props => tinycolor(props.color).darken(15).toString()};
    `)}
  }

  span {
    display: block;
    white-space: nowrap;
    ${props =>
      props.percentage <= 10 &&
      css`
        opacity: 0.3;
      `}
  }

  span:first-child {
    font-size: 14px;
    font-weight: bold;
  }
  span:last-child {
    font-size: 22px;
    font-weight: normal;
  }
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column-reverse;

  > * {
    margin-top: 15px;
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    flex-direction: row;

    > * {
      margin-top: 0;
    }
    > *:first-child {
      padding-right: 50px;
    }
  }
`;

const ButtonStyled = styled.button`
  ${frontline.fl_static(css`
    border: none;
    background: none;
    color: ${props => props.theme.colors.blue};
  `)}
  ${frontline.fl_static(css`
    text-decoration: underline;
  `)}
`;

const TribalNationModal = ({ open, setOpen }) => {
  const history = useHistory();
  const [r, dim] = useRecords({
    purgeDimensions: true, // prevent inheriting previous filters
    facets: { tribes: [] },
  });
  const groups = dim.recordsByTribe
    .group()
    .top(10)
    .filter(i => i.key && tribalNations.map(i => i.name).includes(i.key));
  const [activeTribalNation, setActiveTribalNation] = useState(null);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [activeTribalNation]);

  useEffect(() => {
    setActiveTribalNation(groups[0].key);
  }, []);

  useEffect(() => {
    if (open) {
      scroll.freeze();
    }
  });

  // Gets the records associated withe the active Tribal Nation
  const [results, dimensions, h, a, grps] = useRecords({
    purgeDimensions: true,
    facets: {
      tribes: [activeTribalNation],
    },
  });
  // // Group the tags assocaiated with record results
  // const tags = dimensions.recordsByTag
  //   .group()
  //   .all()
  //   .filter(i => !!i.key && grps.topics.includes(i.key));

  // Get Topic data from record results
  let topicsArray = results.map(record => {
    return getRecordTopics(record.tags);
  });
  // flatten the topicsArray [[a, b], [b, c]] => [a, b, b, c]
  topicsArray = concat(...topicsArray);

  // count the number of each topic based on it name
  let topicCount = countBy(topicsArray, topic => {
    return topic.name;
  });

  // use the unique topic values, construct a new object array
  // containing the topic data and it's count
  let calculatedTopics = uniqBy(topicsArray, t => t.name).map(topic => {
    topic.count = topicCount[topic.name];
    topic.percentage = (topic.count / topicsArray.length) * 100;
    return topic;
  });
  // order the topic by their count
  let orderedTopics = orderBy(
    calculatedTopics,
    x => {
      return x['count'];
    },
    'desc'
  );
  // Build a color array based on the number of topics
  const colorScale = chroma
    .scale([colors.blue, '#BBCAE4', '9BD4CF', '#376462'])
    .mode('lab')
    .colors(orderedTopics.length);
  // add the corresponding color to the topic object
  // used when rendering the visualization
  orderedTopics = orderedTopics.map((topic, i) => {
    topic.color = colorScale[i];
    return topic;
  });

  const tribalNation = tribalNations.filter(tn => tn.name === activeTribalNation)[0];

  return (
    <>
      <ReactTooltip className="tip" effect="solid" />

      <Modal
        classNames={{
          overlay: 'react-responsive-modal-overlay--light',
          modal: 'customModal',
        }}
        animationDuration={300}
        onAnimationEnd={() => {
          ReactTooltip.rebuild();
        }}
        focusTrapped={true}
        closeIcon={
          <>
            <span className="screenreader">Close</span>
            <CrossIcon width={30} fill="#000" />
          </>
        }
        showCloseIcon={true}
        // The modal libraries scroll blocking does not work properly with
        // setting the `html` styles to `scroll-behavior: smooth;`.
        // Instead, the blocking functionality is disable and reimplmented
        // using @threespot/freeze-scroll within a React useEffect above.
        blockScroll={false}
        open={open}
        onClose={() => {
          scroll.unfreeze();
          setOpen(false);
        }}
        center
      >
        <Layout.Padding style={{ color: '#000', marginTop: '5rem' }}>
          <Layout.Wrapper large>
            <Text.H4 style={{ color: '#000', textTransform: 'uppercase' }}>{'Featured Tribal Nation'}</Text.H4>
            {!!activeTribalNation && (
              <ContentLayout>
                <div>
                  <Text.H2 style={{ color: '#000', marginTop: '1rem', marginBottom: '1rem' }}>
                    {tribalNation.name}
                  </Text.H2>
                  <p style={{ margin: '1.2rem 0' }}>
                    The chart below shows the breakdown of all photos known to be associated with the{' '}
                    {activeTribalNation}. Click on a topic to see related photos or select one of the other 10 featured
                    Tribal Nations from the menu on the right.{' '}
                  </p>
                  <p>
                    Interested in viewing all Tribal Nations? Visit the{' '}
                    <ButtonStyled
                      onClick={() => {
                        setOpen(false);
                        history.push(`/tribal-nations/${tribalNation.slug}`);
                      }}
                    >
                      Tribal Nations page
                    </ButtonStyled>
                    .
                  </p>
                </div>
                <div>
                  <label htmlFor="tribal_nation">Select a featured Tribal Nation</label>
                  <Select
                    style={{ width: '100%', marginTop: '15px' }}
                    id="tribal_nation"
                    name="tribal_nation"
                    onChange={event => {
                      setActiveTribalNation(event.target.value);
                    }}
                  >
                    {groups.map(tribalNation => (
                      <option value={tribalNation.key} key={tribalNation.key}>
                        {tribalNation.key}
                      </option>
                    ))}
                  </Select>
                </div>
              </ContentLayout>
            )}
          </Layout.Wrapper>
        </Layout.Padding>
        {!!activeTribalNation && (
          <Layout.Padding style={{ color: '#000' }}>
            <Layout.Wrapper large>
              <TopicChartWrapper>
                <TopicChart>
                  {orderedTopics.map(topic => {
                    return (
                      <TopicChartItem
                        key={topic.name}
                        percentage={topic.percentage}
                        color={topic.color}
                        // data-for="tribalNationModalTooltip"
                        data-tip={topic.percentage <= 10 ? `${topic.name} ${topic.count}` : null}
                      >
                        <button
                          style={{
                            border: 'none',
                            outline: 'none',
                            paddingLeft: '15px',
                            height: '100%',
                            textAlign: 'left',
                          }}
                          onClick={() => {
                            setOpen(false);
                            history.push(`/tribal-nations/${tribalNation.slug}?${joinParams('topics', [topic.name])}`);
                          }}
                        >
                          <span>{topic.name}</span>
                          <span>{topic.count}</span>
                        </button>
                      </TopicChartItem>
                    );
                  })}
                </TopicChart>
              </TopicChartWrapper>
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Button
                  scheme="green"
                  outline={false}
                  onClick={() => {
                    setOpen(false);
                    history.push(`/tribal-nations/${tribalNation.slug}`);
                  }}
                >
                  View all {results.length} photos
                </Button>
              </div>
            </Layout.Wrapper>
          </Layout.Padding>
        )}
      </Modal>
    </>
  );
};

export default TribalNationModal;
