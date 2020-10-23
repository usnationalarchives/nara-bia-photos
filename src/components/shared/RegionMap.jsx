import React, { Fragment, useState, memo, createRef, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import { find, includes } from 'lodash';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled, { css } from 'styled-components';
import d3plus, { TextBox } from 'd3plus-text';
import { ReactComponent as PhotoIcon } from '#assets/icons/photo.svg';
import tinycolor from 'tinycolor2';

// hooks
import useRecords from '#hooks/useRecords';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const RegionMapWrapper = styled.div`
  .rsm-geography:hover {
    cursor: pointer;
  }
`;

const RegionMarker = ({ region, fill }) => {
  const regionLabel = createRef();

  let { name, slug, mapLabelCooridnates } = region;

  useEffect(() => {
    var width = 55;
    // eslint-disable-next-line default-case
    switch (slug) {
      case 'southern-plains-eastern-oklahoma':
        width = 70;
        break;
      case 'pacific-alaska':
        name = 'Alaska Region';
        break;
    }
    name = name.toUpperCase();
    new TextBox()
      .select(regionLabel.current)
      .data([{ text: name }])
      .fontColor(fill)
      .fontSize(8)
      .width(width)
      .render();
  }, []);

  return (
    <Marker coordinates={mapLabelCooridnates}>
      <g ref={regionLabel} />
    </Marker>
  );
};

const MapChart = ({}) => {
  const history = useHistory();
  const [activeMapState, setActiveMapState] = useState('');

  const [stateResults, dimensions] = useRecords({
    purgeDimensions: true,
  });
  const statesWithResults = dimensions.recordsByState.group().all();

  const getState = geoID => {
    const state = find(states, state => {
      return state.val == geoID;
    });
    return state;
  };

  const getFill = geoID => {
    let hue = '#ddd';
    const state = getState(geoID);
    if (state) {
      const region = find(regions, region => {
        return region.slug == state.region;
      });
      hue = region.mapColors.region;
    }
    return hue;
  };

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

  const PhotoIconStyled = styled(PhotoIcon)`
    display: inline-block;
    margin-right: 6px;
  `;

  const getNumberOfStateResults = (states, state) => {
    const filteredStates = states.filter(s => s.key === state.name);
    if (filteredStates.length > 0) {
      return filteredStates[0].value;
    } else {
      return '0';
    }
  };

  return (
    <RegionMapWrapper>
      <ReactTooltip backgroundColor="#fff" textColor="#333" borderColor="#DDD" border={true}>
        {!!activeMapState && (
          <StyledTooltipContent>
            <span>{activeMapState.name}</span>
            <PhotoIconStyled width="15"></PhotoIconStyled> {getNumberOfStateResults(statesWithResults, activeMapState)}{' '}
            Records
          </StyledTooltipContent>
        )}
      </ReactTooltip>
      <ComposableMap projection="geoAlbersUsa" data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            /* Remove Hawaii */
            geographies = geographies.filter(item => item.properties.name !== 'Hawaii');
            return (
              <>
                {geographies.map(geo => {
                  const fill = getFill(geo.id);
                  const stroke = tinycolor(fill).darken(10).toString();
                  const hoverFill = tinycolor(fill).darken(25).toString();
                  const state = getState(geo.id);
                  const hasResults = !!state && statesWithResults.map(s => s.key).includes(state.name);
                  return (
                    <Geography
                      aria-label={!!state ? state.name : ''}
                      style={{
                        default: {
                          fill: fill,
                        },
                        hover: {
                          fill: hasResults ? hoverFill : fill,
                        },
                      }}
                      key={geo.rsmKey}
                      onClick={() => {
                        hasResults && history.push(`/states/${state.slug}`);
                      }}
                      onMouseEnter={() => {
                        setActiveMapState(states.find(state => state.val == geo.id));
                      }}
                      onMouseLeave={() => {
                        setActiveMapState(null);
                      }}
                      stroke={stroke}
                      geography={geo}
                      fill={fill}
                    />
                  );
                })}
              </>
            );
          }}
        </Geographies>
        {regions.map(region => {
          return <RegionMarker key={`region-${region.slug}`} region={region} fill="#333333"></RegionMarker>;
        })}
      </ComposableMap>
    </RegionMapWrapper>
  );
};

export default memo(MapChart);
