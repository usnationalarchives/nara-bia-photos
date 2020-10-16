import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {H1, H2, H3, H4, H5, H6, Intro, Label, Screenreader, Rich} from '#components/shared/Text';
import { statesByRegion, joinParams } from '#modules/helpers';
import Card from '#components/shared/Card';
import State from '#components/shared/State';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// config
import content from '#config/content';

// context
import { StateThumbnailProvider, withStateThumbnails } from '#context/StateThumbnails';

// assets
import { ReactComponent as InfoIcon } from '#assets/icons/info.svg';

// hooks
import useRecords from '#hooks/useRecords';

// components
import {Padding, Wrapper, Center} from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import RegionMap from '#components/shared/RegionMap';
import Select from '#components/shared/Select';
import { Grid, GridItem } from '#components/shared/Grid';

// modules
import { states, regions } from '#modules/constants';
import iiifImage from '#modules/iiifImage';

// styles
import * as frontline from '#styles/frontline';

const Billboard = () => {
  return <LandingBillboard title={content.states.title} intro={content.states.intro} introHelp={content.states.help} />;
};

// const statesExtended = states.map((state, index) => {
//   state.thumbnailNaId = stateThumbnailNaids[index];
//   return state;
// });

const getStatesByRegion = (states, regionSlug) => {
  return statesByRegion(states, regionSlug);
};

const LinkStyled = styled(Link)`
  ${frontline.fl_static(css`
    color: ${props => props.theme.colors.blue};
    text-decoration: none;
  `)}

  ${frontline.fl_attention(css`
    color: ${props => props.theme.colors.blue}
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
        <Card>
          <State state={state} results={results} thumbnailUrl={thumbnailUrl(thumbnailResults, state.thumbnailNaId)} />
        </Card>
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

  @media all and ${props => props.theme.breakpoints.medium} {
    flex-direction: row;
    align-items: center;
    margin-bottom: -80px;
  }

  > *:first-child {
    @media all and ${props => props.theme.breakpoints.medium} {
      flex: 1 1 70%;
      padding-right: 40px;
    }
  }
  > *:last-child {
    padding-top: 20px;
    @media all and ${props => props.theme.breakpoints.medium} {
      padding-top: 0;
      flex: 1 1 30%;
    }
  }
`;
const MapInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

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
        <H3>
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
        </H3>
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
          <Card>
            <State state={state} results={results} thumbnailUrl={thumbnailUrl(state.thumbnailNaId)} />
          </Card>
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
          <H3>
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
          </H3>
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
          <title>{`${content.states.title} - Bureau Of Indian Affairs Photography Finding Aid`}</title>
          <meta name="description" content={content.states.intro}></meta>
          <meta name="" content="" />
          <meta
            name="twitter:title"
            content={`${content.states.title} - Bureau Of Indian Affairs Photography Finding Aid`}
          />
          <meta name="twitter:site" content="@FIXME" />
          <meta name="twitter:card" content={'FIXME'} />
          <meta name="twitter:description" content={content.states.intro} />
          <meta name="twitter:image" content={'FIXME'} />
          <meta
            property="og:title"
            content={`${content.states.title} - Bureau Of Indian Affairs Photography Finding Aid`}
          />
          <meta name="og:description" content={content.states.intro} />
          <meta property="og:site_name" content="FIXME" />
          <meta property="og:url" content={window.location} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={'FIXME'} />
        </Helmet>

        <Billboard />

        <Padding>
          <Wrapper>
            <MapSelect>
              <p>{content.states.mapDirections}</p>
              <span>
                <Select style={{ width: '250px' }} onChange={handleSelect}>
                  <option value="">{content.states.selectPrompt}</option>
                  {states.map(state => (
                    <option value={state.slug} key={state.slug}>
                      {state.name}
                    </option>
                  ))}
                </Select>
              </span>
            </MapSelect>
            <RegionMap />
            <Wrapper narrow>
              <MapInfo>
                <span>
                  <InfoIcon width="17" fill="#345d96"></InfoIcon>
                </span>
                <p>{content.states.disclaimer}</p>
              </MapInfo>
            </Wrapper>
            {regions.map(region => (
              <RegionGroup key={region.slug} region={region}></RegionGroup>
            ))}
          </Wrapper>
        </Padding>
      </Fragment>
    </StateThumbnailProvider>
  );
};

export default StateLanding;
