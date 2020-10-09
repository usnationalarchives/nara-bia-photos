import React, { setState, useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { countBy, concat, orderBy, fromPairs, uniqBy } from 'lodash';
import { Link } from 'react-router-dom';

import { ReactComponent as CrossIcon } from '#assets/icons/cross.svg';

// constants
import { tribalNations } from '#modules/constants';
import { getRecordTopics } from '#modules/helpers';
import { records, actions, groups } from '#modules/data';

// modules
import iiifImage from '#modules/iiifImage';

// hooks
import useRecords from '#hooks/useRecords';

// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import Select from '#components/shared/Select';

// styles
import * as frontline from '#styles/frontline';

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
  const [activeTribalNation, setActiveTribalNation] = useState(groups[0].key);

  useEffect(() => {
    // setActiveTribalNation(groups[0].key);
  }, []);

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
    return topic;
  });
  // order the topic by their count
  const orderedTopics = orderBy(
    calculatedTopics,
    x => {
      return x['count'];
    },
    'desc'
  );

  console.log('orderedTopics', orderedTopics);
  console.log('activeTribalNation', activeTribalNation);

  const tribalNation = tribalNations.filter(tn => tn.name === activeTribalNation)[0];
  console.log('tribalNation', tribalNation);

  return (
    <Modal
      animationDuration={300}
      closeIcon={<CrossIcon width={30} fill="#fff" />}
      showCloseIcon={true}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      center
    >
      <Layout.Padding style={{ color: '#fff' }}>
        <Layout.Wrapper medium>
          <Text.H3 style={{ color: '#fff' }}>{'Feature Tribal Nation'}</Text.H3>
          {!!activeTribalNation && (
            <>
              <Text.H2 style={{ color: '#fff' }}>{tribalNation.name}</Text.H2>
              <label>Select a featured Tribal Nation</label>
              <Select
                style={{ width: '250px' }}
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
              <p>
                The chart below shows the breakdown of all photos known to be associated with the {activeTribalNation}.
                Click on a topic to see related photos or select one of the other 10 featured Tribal Nations from the
                menu on the right.{' '}
              </p>
              <p>
                Interested in viewing all Tribal Nations? Visit the{' '}
                <a
                  href={`tribal-nations/${tribalNation.slug}`}
                  onClick={() => {
                    setOpen(false);
                    // A timeout is required so the the scroll prevention is
                    // removeed prior to navigating to a new route. The timeout
                    // value is set to after the modals `animationDuration` prop
                    setTimeout(() => {
                      history.push(`tribal-nations/${tribalNation.slug}`);
                    }, 400);
                  }}
                >
                  Tribal Nations page
                </a>
                .
              </p>
              <ul>
                {orderedTopics.map(topic => {
                  return (
                    <li key={topic.name}>
                      {topic.name} {topic.count}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </Layout.Wrapper>
      </Layout.Padding>
    </Modal>
  );
};

export default TribalNationModal;
