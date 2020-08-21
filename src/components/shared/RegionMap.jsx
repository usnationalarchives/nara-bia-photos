import React, { Fragment, useState, memo } from 'react';
import { geoCentroid } from 'd3-geo';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled, { css } from 'styled-components';
import { ReactComponent as PhotoIcon } from '#assets/icons/photo.svg';

import tinycolor from 'tinycolor2';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const MapChart = ({}) => {
  const history = useHistory();
  const [activeMapState, setActiveMapState] = useState('');

  const getState = geoID => {
    const state = _.find(states, state => {
      return state.val == geoID;
    });
    return state;
  };

  const getFill = geoID => {
    let hue = '#ddd';
    const state = getState(geoID);
    if (state) {
      const region = _.find(regions, region => {
        return region.slug == state.region;
      });
      hue = region.hue;
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
    <div>
      <ReactTooltip backgroundColor="#fff" textColor="#333" borderColor="#DDD" border={true}>
        {activeMapState && <TooltipContent activeMapState={activeMapState}></TooltipContent>}
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
                  return (
                    <Geography
                      style={{
                        default: {
                          fill: fill,
                        },
                        hover: {
                          fill: hoverFill,
                        },
                      }}
                      key={geo.rsmKey}
                      onClick={() => {
                        console.log('click');
                        history.push(`/states/${getState(geo.id).slug}`);
                      }}
                      onMouseEnter={() => {
                        const { name } = geo.properties;
                        setActiveMapState(geo.id);
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
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
