import React, { Fragment, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as Text from '#components/shared/Text';
import { statesByRegion, joinParams } from '#modules/helpers';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';
import { includes } from 'lodash';

// config
import content from '#config/content';

// context
import { StateThumbnailProvider, withStateThumbnails } from '#context/StateThumbnails';

// assets
import { ReactComponent as InfoIcon } from '#assets/icons/info.svg';

// hooks
import useRecords from '#hooks/useRecords';

// components
import * as Layout from '#components/shared/Layout';
import Card from '#components/shared/Card';
import State from '#components/shared/State';
import LandingBillboard from '#components/shared/LandingBillboard';
import RegionMap from '#components/shared/RegionMap';
import Select from '#components/shared/Select';
import { Grid, GridItem } from '#components/shared/Grid';
import BannerImageAnnotation from '#components/shared/BannerImageAnnotation';

// modules
import { states, regions } from '#modules/constants';
import iiifImage from '#modules/iiifImage';

// styles
import * as frontline from '#styles/frontline';

const Billboard = () => {
  return (
    <LandingBillboard
      bannerImage={content.states.bannerImage}
      bannerImage2x={content.states.bannerImage2x}
      title={content.states.title}
      intro={content.states.intro}
      introHelp={content.states.help}
      imagePopup={
        <BannerImageAnnotation>
          <li>
            <span class="uppercase" aria-label="Left">
              Left
            </span>
            <Link to="/298613">Pala Reservation. Well</Link>
          </li>

          <li>
            <span class="uppercase" aria-label="Right">
              Right
            </span>
            <Link to="/298614">Pala Reservation. Reinforcement of first joint of caisson</Link>
          </li>

          <li>
            <span class="uppercase" aria-label="Right">
              Right
            </span>
            <Link to="/118970357">Landscape</Link>
          </li>
        </BannerImageAnnotation>
      }
    />
  );
};

const getStatesByRegion = (states, regionSlug) => {
  return statesByRegion(states, regionSlug);
};

const LinkStyled = styled(Link)`
  ${frontline.fl_static(css`
    color: ${props => props.theme.colors.blue};
    text-decoration: none;
  `)}

  ${frontline.fl_attention(css`
    color: ${props => props.theme.colors.blue};
    text-decoration: underline;
  `)}
`;

const RegionGroupStyled = styled.div`
  margin: 30px 0;
`;

const thumbnailUrl = (results, naId) => {
  const result = results.filter(result => result.naId === naId)[0];

  if (result) {
    const url = JSON.parse(result.objects)[0].thumbnail.url;
    return url;
  }
};

const CardStyled = styled(Card)`
  ${frontline.fl_attention(css`
    outline: 2px solid ${props => props.theme.colors.blue};
    outline-offset: -2px;
  `)}
`;

const Item = withStateThumbnails(({ state, stateThumbnailContext }) => {
  // Query records specific to this state
  const [results, dimensions, hasActiveFilters] = useRecords({
    facets: { states: [state.name] },
  });

  const thumbnailResults = stateThumbnailContext.state.thumbnailNaIds;
  if (results.length) {
    state.total = results.length;
    return (
      <GridItem key={state.slug}>
        <CardStyled>
          <State state={state} results={results} thumbnailUrl={thumbnailUrl(thumbnailResults, state.thumbnailNaId)} />
        </CardStyled>
      </GridItem>
    );
  } else {
    return false;
  }
});

const MapSelect = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px auto -20px;
  max-width: 600px;

  @media all and ${props => props.theme.breakpoints.large} {
    flex-direction: row;
    align-items: center;
    margin-bottom: -80px;
  }

  > *:first-child {
    @media all and ${props => props.theme.breakpoints.large} {
      flex: 1 1 70%;
      padding-right: 40px;
    }
  }
  > *:last-child {
    padding-top: 20px;
    @media all and ${props => props.theme.breakpoints.large} {
      padding-top: 0;
      flex: 1 1 30%;
    }
  }
`;
const MapInfo = styled.div`
  align-items: flex-start;
  display: flex;
  font-size: 13px;
  flex-direction: row;
  line-height: 20px;

  @media all and ${props => props.theme.breakpoints.medium} {
    margin-top: -50px;
  }

  > *:first-child {
    flex: 1 0 auto;
    padding-right: 5px;
    margin-top: 3px;
  }
  > *:last-child {
    flex: 1 1 auto;
  }
`;

const RegionGroup = ({ region }) => {
  const regionStates = getStatesByRegion(states, region.slug);
  // Query records this specific state
  const [regionResults] = useRecords({
    facets: { states: regionStates.map(x => x.name) },
  });
  return (
    regionResults.length > 0 &&
    region.slug !== 'california' && (
      <RegionGroupStyled key={region.slug}>
        <Text.H3>
          <LinkStyled
            to={() => ({
              pathname: '/search',
              search: joinParams(
                'states',
                regionStates.map(x => x.name)
                // FIXME search pages will fail if passed a state param that is not included in the data set
              ),
            })}
          >
            {region.name}
          </LinkStyled>
        </Text.H3>
        <Grid>
          {regionStates.map(state => (
            <Item key={state.slug} state={state}></Item>
          ))}
        </Grid>
      </RegionGroupStyled>
    )
  );
};

const StateLanding = () => {
  const [activeMapState, setActiveMapState] = useState('');
  const thumbnailNaIds = states.map(t => t.thumbnailNaId);
  const history = useHistory();

  const [results] = useRecords({
    facets: {
      naIds: thumbnailNaIds,
    },
  });

  const [stateResults, dimensions] = useRecords({
    purgeDimensions: true,
  });
  const statesWithResults = dimensions.recordsByState
    .group()
    .all()
    .map(s => s.key);

  const thumbnailUrl = naId => {
    const result = results.filter(result => result.naId === naId)[0];

    if (result) {
      const url = iiifImage(result, 600);
      return url;
    }
  };

  const Item = ({ state }) => {
    // Query records specific to this state
    const [results] = useRecords({
      facets: { states: [state.name] },
    });

    if (results.length) {
      state.total = results.length;
      return (
        <GridItem key={state.slug}>
          <CardStyled>
            <State state={state} results={results} thumbnailUrl={thumbnailUrl(state.thumbnailNaId)} />
          </CardStyled>
        </GridItem>
      );
    } else {
      return false;
    }
  };

  const RegionGroup = ({ region }) => {
    const regionStates = getStatesByRegion(states, region.slug);
    // Query records this specific state
    const [regionResults] = useRecords({
      facets: { states: regionStates.map(x => x.name) },
    });
    return (
      regionResults.length > 0 &&
      region.slug !== 'california' && (
        <RegionGroupStyled key={region.slug}>
          <Text.H3>
            <LinkStyled
              to={() => ({
                pathname: '/search',
                search: joinParams(
                  'states',
                  regionStates.map(x => x.name)
                  // FIXME search pages will fail if passed a state param that is not included in the data set
                ),
              })}
            >
              {region.name}
            </LinkStyled>
          </Text.H3>
          <Grid>
            {regionStates.map(state => (
              <Item key={state.slug} state={state}></Item>
            ))}
          </Grid>
        </RegionGroupStyled>
      )
    );
  };

  const handleSelect = event => {
    const slug = event.target.value;
    history.push('/states/' + slug);
  };

  return (
    <StateThumbnailProvider>
      <Fragment>
        <Helmet>
          <title>{`${content.states.title} - Bureau Of Indian Affairs Photographs Finding Aid`}</title>
          <meta name="description" content={'Explore records from the Bureau of Indian Affairs by state.'}></meta>
          <meta
            name="twitter:title"
            content={`${content.states.title} - Bureau Of Indian Affairs Photographs Finding Aid`}
          />
          <meta name="twitter:site" content={window.location} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content={'Explore records from the Bureau of Indian Affairs by state.'} />
          <meta name="twitter:image" content={`${process.env.PUBLIC_URL}/og-image.png`} />
          <meta
            property="og:title"
            content={`${content.states.title} - Bureau Of Indian Affairs Photographs Finding Aid`}
          />
          <meta name="og:description" content={'Explore records from the Bureau of Indian Affairs by state.'} />
          <meta property="og:site_name" content="Bureau of Indian Affairs Photography Finding Aid" />
          <meta property="og:url" content={window.location} />
          <meta property="og:type" content="website" />
          <meta name="og:image" content={`${process.env.PUBLIC_URL}/og-image.png`} />
        </Helmet>

        <Billboard />

        <Layout.Padding>
          <Layout.Wrapper>
            <MapSelect>
              <p>{content.states.mapDirections}</p>
              <span>
                <Select style={{ width: '250px' }} onChange={handleSelect} aria-label="Select a state">
                  <option value="">{content.states.selectPrompt}</option>
                  {regions.map(region => {
                    const regionStates = getStatesByRegion(states, region.slug);
                    return (
                      <optgroup label={region.name}>
                        {regionStates.map(state => {
                          return (
                            <option value={state.slug} key={state.slug}>
                              {state.name}
                            </option>
                          );
                        })}
                      </optgroup>
                    );
                  })}
                </Select>
              </span>
            </MapSelect>
            <RegionMap />
            <Layout.Wrapper narrow>
              <MapInfo>
                <span>
                  <InfoIcon width="17" fill="#345d96"></InfoIcon>
                </span>
                <p>{content.states.disclaimer}</p>
              </MapInfo>
            </Layout.Wrapper>
            {regions.map(region => (
              <RegionGroup key={region.slug} region={region}></RegionGroup>
            ))}
          </Layout.Wrapper>
        </Layout.Padding>
      </Fragment>
    </StateThumbnailProvider>
  );
};

export default StateLanding;
