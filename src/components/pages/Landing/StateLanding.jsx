import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Text from '#components/shared/Text';
import { statesByRegion, joinParams } from '#modules/helpers';
import { Grid, GridItem } from '#components/shared/Grid';
import Card from '#components/shared/Card';
import State from '#components/shared/State';
import styled, { css } from 'styled-components';
import ReactTooltip from 'react-tooltip';

// assets
import { ReactComponent as PhotoIcon } from '#assets/icons/photo.svg';

// hooks
import useRecords from '#hooks/useRecords';

// components
import * as Layout from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import RegionMap from '#components/shared/RegionMap';

// modules
import { states, regions } from '#modules/constants';

// styles
import * as frontline from '#styles/frontline';

const Billboard = () => {
  return (
    <LandingBillboard
      title="States"
      intro="Lorem Ipsum Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
    />
  );
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

const StateLanding = () => {
  const thumbnailNaIds = states.map(t => t.thumbnailNaId);
  const [activeMapState, setActiveMapState] = useState('');

  const [results] = useRecords({
    facets: {
      naIds: thumbnailNaIds,
    },
  });

  const thumbnailUrl = naId => {
    const result = results.filter(result => result.naId === naId)[0];

    if (result) {
      const url = JSON.parse(result.objects)[0].thumbnail.url;
      return url;
    }
  };

  const Item = ({ state }) => {
    // Query records specific to this state
    const [results, dimensions, hasActiveFilters] = useRecords({
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
  const PhotoIconStyled = styled(PhotoIcon)`
    display: inline-block;
    margin-right: 6px;
  `;

  const StyledTooltipContent = styled.div`
    font-weight: bold;
    font-size: 14px;
    span {
      display: block;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
    }
  `;

  const TooltipContent = ({ activeMapState }) => {
    if (activeMapState) {
      const state = states.find(state => state.val == activeMapState);
      if (!!state) {
        return (
          <StyledTooltipContent>
            <span>{state.name}</span>
            <PhotoIconStyled width="15"></PhotoIconStyled> ## Records
          </StyledTooltipContent>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <Billboard />

      <Layout.Padding>
        <Layout.Wrapper>
          <RegionMap setTooltipContent={setActiveMapState} />
          <ReactTooltip backgroundColor="#fff" textColor="#333" borderColor="#DDD" border={true}>
            {activeMapState && <TooltipContent activeMapState={activeMapState}></TooltipContent>}
          </ReactTooltip>
          {regions.map(region => (
            <RegionGroup key={region.slug} region={region}></RegionGroup>
          ))}
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default StateLanding;
