import React, { Fragment, useState, useEffect, createRef } from 'react';
import styled, { css } from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Results from '#components/shared/Results';
import { sampleSize } from 'lodash';
import { Helmet } from 'react-helmet';
import { useHistory, useLocation } from 'react-router-dom';

// import 'react-tabs/style/react-tabs.css';

import { ReactComponent as CitationIcon } from '#assets/icons/citations.svg';
import { ReactComponent as DetailsIcon } from '#assets/icons/details.svg';
import { ReactComponent as ExternalIcon } from '#assets/icons/external-link.svg';
import { ReactComponent as SeriesIcon } from '#assets/icons/series.svg';

import { getRecordTopics, getRecordStates, getIdFromPathname } from '#modules/helpers';

// constants
import { tribalNations, externalUrls } from '#modules/constants';

import iiifImage from '#modules/iiifImage';

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

const SeriesHeader = styled.div`
  @media all and ${props => props.theme.breakpoints.medium} {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  > * {
    margin-top: 1rem;

    @media all and ${props => props.theme.breakpoints.medium} {
      margin-top: 0;
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
  // const [record, setRecord] = useState(null);
  const titleTextRef = createRef();
  const history = useHistory();
  const location = useLocation();

  const [results] = useRecords(
    {
      facets: {
        naIds: [naId],
      },
    },
    []
  );

  const record = results[0];

  var [thumbnailResults] = useRecords(
    !!record
      ? {
          facets: {
            parentSeriesNaId: record.parentSeriesNaId,
          },
        }
      : false
  );

  if (record) {
    var tribalNation = tribalNations.filter(tribalNation => tribalNation.name === record.tribes)[0];
    var recordTopics = getRecordTopics(record.tags);
    var recordStates = getRecordStates(record.states);
    thumbnailResults = thumbnailResults.filter(r => {
      return r.naId !== record.naId;
    });
  }

  useEffect(() => {
    if (record) {
      setObjects(JSON.parse(record.objects).filter(o => o.imageTiles));
    }
  }, [record]);

  return (
    <>
      <Helmet>
        <title>{!!record ? record.title : getIdFromPathname(location.pathname)}</title>
        {!!record && !!record.scopeContentNote && <meta name="description" content={record.scopeContentNote} />}
        <meta name="" content="" />
        <meta name="twitter:title" content={!!record ? record.title : getIdFromPathname(location.pathname)} />
        <meta name="twitter:site" content="@FIXME" />
        {!!record && !!record.scopeContentNote && <meta name="twitter:card" content={record.scopeContentNote} />}
        {!!record && !!record.scopeContentNote && <meta name="twitter:description" content={record.scopeContentNote} />}
        {!!record && <meta name="twitter:image" content={iiifImage(record, '1080')} />}
        <meta property="og:title" content={!!record ? record.title : getIdFromPathname(location.pathname)} />
        {!!record && !!record.scopeContentNote && <meta name="og:description" content={record.scopeContentNote} />}
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="article" />
        {!!record && <meta property="og:image" content={iiifImage(record, '1080')} />}
      </Helmet>
      {!!record && (
        <>
          <Layout.Padding style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <Layout.Wrapper>
              <Shave textRef={titleTextRef} maxHeight={130} options={{ character: '&nbsp; ' }}>
                <Text.H1 ref={titleTextRef}>{record.title}</Text.H1>
              </Shave>
              <MetaWrapper>
                {tribalNation && (
                  <MetaStyled
                    label="Tribal Nation"
                    outine
                    items={[
                      {
                        label: record.tribes,
                        link: `/tribal-nations/${tribalNation ? tribalNation.slug : ''}`,
                        onClick: () => {
                          history.push(`/tribal-nations/${tribalNation ? tribalNation.slug : ''}`);
                        },
                      },
                    ]}
                  ></MetaStyled>
                )}
                {!!record.date && <MetaStyled label="Date" outine items={[{ label: record.date }]}></MetaStyled>}
                {!!recordTopics.length && (
                  <MetaStyled
                    label="Topics"
                    outine
                    items={recordTopics.map(topic => {
                      return {
                        label: topic.name,
                        link: `/topics/${topic.slug}`,
                        onClick: () => {
                          history.push(`/topics/${topic.slug}`);
                        },
                      };
                    })}
                  ></MetaStyled>
                )}{' '}
                {!!recordStates.length && (
                  <MetaStyled
                    label="States"
                    outine
                    items={recordStates.map(state => {
                      return {
                        label: state.name,
                        link: `/states/${state.slug}`,
                        onClick: () => {
                          history.push(`/states/${state.slug}`);
                        },
                      };
                    })}
                  ></MetaStyled>
                )}
              </MetaWrapper>
            </Layout.Wrapper>
          </Layout.Padding>
          <ImageViewer record={record} objects={objects} />
          <Layout.Padding style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <Layout.Wrapper>
              <Tabs>
                <TabList style={{ overflowX: 'hidden' }}>
                  {' '}
                  {/* prevents the scrollbar on Windows */}
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
                  {!!record.scopeContentNote && (
                    <Table.RowStyles>
                      <Table.LabelStyles>
                        <Text.Label style={{ fontSize: '13px', fontWeight: 'normal' }}>Description:</Text.Label>
                      </Table.LabelStyles>
                      <Table.ValueStyles>
                        <p>{record.scopeContentNote}</p>
                      </Table.ValueStyles>
                    </Table.RowStyles>
                  )}
                  <Table.RowStyles>
                    <Table.LabelStyles>
                      <Text.Label style={{ fontSize: '13px', fontWeight: 'normal' }}>
                        National Archives Catalog Identifier:
                      </Text.Label>
                    </Table.LabelStyles>
                    <Table.ValueStyles>
                      <ExternalLink href={`${externalUrls.catalogRecordDetail}/${record.naId}`}>
                        {record.naId}
                      </ExternalLink>
                    </Table.ValueStyles>
                  </Table.RowStyles>
                </TabPanel>
                <TabPanel>
                  <Table.RowStyles>
                    <p>
                      {record.title},{!!record.date ? `${record.date} ` : ' '}[Photographs and other Graphic Materials];
                      Records of the Bureau of Indian Affairs, Record Group 75;
                      {!!record.location ? ` ${record.location}` : ' '}[online version available through the National
                      Archives Catalog (National Archives Identifier {record.naId}) at{' '}
                      <a href={`https://catalog.archives.gov/id/${record.naId}`}>
                        https://catalog.archives.gov/id/{record.naId}
                      </a>
                      ;{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(new Date())}
                      ].
                    </p>
                  </Table.RowStyles>
                </TabPanel>
              </Tabs>
            </Layout.Wrapper>
          </Layout.Padding>
          {!!thumbnailResults.length && (
            <Layout.Padding style={{ marginBottom: '3rem' }}>
              <Layout.Wrapper>
                <SectionHeader>
                  <SeriesIcon width={20}></SeriesIcon>
                  <span>Also in this series</span>
                </SectionHeader>
                <SeriesHeader>
                  <p style={{ marginRight: '20px' }}>
                    There are {thumbnailResults.length.toLocaleString('en')} other digitized records in the archival
                    series {record.parentSeriesTitle}
                  </p>

                  <ExternalLink
                    style={{ flex: '1 0 auto' }}
                    href={`https://catalog.archives.gov/search?q=*:*&f.ancestorNaIds=${record.parentSeriesNaId}&sort=naIdSort%20asc&f.materialsType=photographsandgraphics`}
                  >
                    View All in the Catalog
                  </ExternalLink>
                </SeriesHeader>
                <Results singleRow data={sampleSize(thumbnailResults, 3)} fidelity={250} />
              </Layout.Wrapper>
            </Layout.Padding>
          )}
        </>
      )}
    </>
  );
};

export default Record;
