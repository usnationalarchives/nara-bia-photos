import React, { Fragment, useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Results from '#components/shared/Results';
import { sampleSize } from 'lodash';
// import 'react-tabs/style/react-tabs.css';

import { ReactComponent as CitationIcon } from '#assets/icons/citations.svg';
import { ReactComponent as DetailsIcon } from '#assets/icons/details.svg';
import { ReactComponent as ExternalIcon } from '#assets/icons/external-link.svg';
import { ReactComponent as SeriesIcon } from '#assets/icons/series.svg';

import { getRecordTopics } from '#modules/helpers';

// constants
import { tribalNations, externalUrls } from '#modules/constants';

// components
import * as Text from '#components/shared/Text';
import * as Table from '#components/shared/Table';
import * as Layout from '#components/shared/Layout';
import ImageViewer from './ImageViewer';
import Meta from '#components/shared/Meta';
import Shave from '#components/shared/Shave';
import ExternalLink from '#components/shared/ExternalLink';

// hooks
import useRecords from '#hooks/useRecords';

const MetaStyled = styled(Meta)`
  display: inline-block;
`;

const MetaWrapper = styled.div`
  align-items: flex-start;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;

  > * {
    align-items: center;
    display: flex;
    margin-right: 25px;
    margin-bottom: 20px;

    &:not(:first-child) {
      padding-left: 25px;
      border-left: solid 1px ${props => props.theme.colors.mediumGrey};
    }
  }
`;

const SectionHeader = styled(Text.Label)`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.blue};
  display: flex;
  flex-direction: row;
  padding: 10px 0 10px;

  > *:first-child {
    margin-right: 10px;
  }
`;

const Record = ({ ...props }) => {
  const slug = props.match.params.slug;
  const slugParts = slug.split('-');
  const naId = parseInt(slugParts[slugParts.length - 1]);
  const [objects, setObjects] = useState();
  const titleTextRef = createRef();

  const [results] = useRecords({
    facets: {
      naIds: [naId],
    },
  });

  const record = results[0];

  if (record) {
    var tribalNation = tribalNations.filter(tribalNation => tribalNation.name === record.tribes)[0];
    var recordTopics = getRecordTopics(record.tags);
  }

  var [thumbnailResults] = useRecords(
    record
      ? {
          facets: {
            // parentSeriesNaId: record.parentSeriesNaId,
            parentSeriesTitle: record.parentSeriesTitle,
          },
        }
      : false
  );

  useEffect(() => {
    if (record) {
      setObjects(JSON.parse(record.objects).filter(o => o.imageTiles));
    }
  }, [record]);

  console.log(record);
  console.log(thumbnailResults.length);

  return (
    !!record && (
      <>
        <Layout.Padding style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          <Layout.Wrapper>
            {record && (
              <Fragment>
                <Shave textRef={titleTextRef} maxHeight={130} options={{ character: '&nbsp; ' }}>
                  <Text.H1 ref={titleTextRef}>{record.title}</Text.H1>
                </Shave>
                <MetaWrapper>
                  {tribalNation && (
                    <MetaStyled
                      label="Tribal Nation"
                      outine
                      items={[
                        { label: record.tribes, link: `/tribal-nations/${tribalNation ? tribalNation.slug : ''}` },
                      ]}
                    ></MetaStyled>
                  )}
                  <MetaStyled label="Date" outine items={[{ label: 'FIXME' }]}></MetaStyled>
                  {!!recordTopics.length && (
                    <MetaStyled
                      label="Topics"
                      outine
                      items={recordTopics.map(topic => {
                        return { label: topic.name, link: `/topics/${topic.slug}` };
                      })}
                    ></MetaStyled>
                  )}
                </MetaWrapper>
                <ImageViewer objects={objects} />

                <Tabs>
                  <TabList>
                    <Tab>
                      <DetailsIcon width={20} />
                      <Text.Label>Details</Text.Label>
                    </Tab>
                    <Tab>
                      <CitationIcon width={20} />
                      <Text.Label>Citation</Text.Label>
                    </Tab>
                  </TabList>

                  <TabPanel>
                    <Table.RowStyles>
                      <Table.LabelStyles>
                        <Text.Label style={{ fontSize: '13px', fontWeight: 'normal' }}>Description:</Text.Label>
                      </Table.LabelStyles>
                      <Table.ValueStyles>
                        <p>
                          Vestibulum id ligula porta felis euismod semper. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Aenean eu leo quam.
                          Pellentesque ornare sem lacinia quam venenatis vestibulum.
                        </p>
                      </Table.ValueStyles>
                    </Table.RowStyles>
                    <Table.RowStyles>
                      <Table.LabelStyles>
                        <Text.Label style={{ fontSize: '13px', fontWeight: 'normal' }}>
                          National Archives Identifier:
                        </Text.Label>
                      </Table.LabelStyles>
                      <Table.ValueStyles>
                        <a href={`${externalUrls.catalogRecordDetail}/${record.naId}`}>{record.naId}</a>
                      </Table.ValueStyles>
                    </Table.RowStyles>
                    <Table.RowStyles>
                      <Table.LabelStyles>&nbsp;</Table.LabelStyles>
                      <Table.ValueStyles>
                        <ExternalLink href={`${externalUrls.catalogRecordDetail}/${record.naId}`}>Catalog</ExternalLink>
                      </Table.ValueStyles>
                    </Table.RowStyles>
                  </TabPanel>
                  <TabPanel></TabPanel>
                </Tabs>
              </Fragment>
            )}
          </Layout.Wrapper>
        </Layout.Padding>
        <Layout.Padding style={{ marginBottom: '3rem' }}>
          <Layout.Wrapper>
            <SectionHeader>
              <SeriesIcon width={20}></SeriesIcon>
              <span>Also in this series</span>
            </SectionHeader>
            <div
              style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}
            >
              <p style={{ marginRight: '20px' }}>
                There are {thumbnailResults.length} other records in the archival series {record.parentSeriesTitle}
              </p>

              <ExternalLink
                style={{ flex: '1 0 auto' }}
                href={`https://catalog.archives.gov/search?q=*:*&f.ancestorNaIds=${record.parentSeriesNaId}&sort=naIdSort%20asc&f.materialsType=photographsandgraphics`}
              >
                View All
              </ExternalLink>
            </div>
            <Results singleRow data={sampleSize(thumbnailResults, 3)} fidelity={250} />
          </Layout.Wrapper>
        </Layout.Padding>
      </>
    )
  );
};

export default Record;
