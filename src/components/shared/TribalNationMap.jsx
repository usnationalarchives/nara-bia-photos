import React, { Fragment, useState, memo, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { geoCentroid } from 'd3-geo';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import tinycolor from 'tinycolor2';

import { colors } from '#styles/theme';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
// Offsets for small state lables
const offsets = {
  VT: [-80, -20],
  NH: [-30, -55],
  MA: [50, -40],
  RI: [50, -10],
  CT: [40, 25],
  NJ: [40, 30],
  DE: [30, 45],
  MD: [48, 80],
  DC: [51, 21],
};

const TribalNationMapWrapper = styled.div`
  .rsm-geography.active:hover,
  .rsm-annotation-text:hover {
    cursor: pointer;
  }
`;

const TribalNationMap = ({ activeStates }) => {
  const history = useHistory();

  const getState = geoID => {
    const state = states.find(state => {
      return state.val == geoID;
    });
    return state;
  };

  const isActive = state => {
    if (state) {
      const index = activeStates.findIndex((element, index, arr) => {
        return state.name === element;
      });
      return index >= 0;
    } else {
      return false;
    }
  };

  const renderAnnotation = id => {
    if (id === 'VT' || id === 'NH') {
      return (
        <text
          x="-8"
          textAnchor="end"
          fill={colors.yellow}
          style={{ fontSize: '35px', fontWeight: 'bold' }}
          x={4}
          fontSize={16}
          alignmentBaseline="middle"
        >
          {id}
        </text>
      );
    } else {
      return (
        <text
          fill={colors.yellow}
          style={{ fontSize: '35px', fontWeight: 'bold' }}
          x={4}
          fontSize={16}
          alignmentBaseline="middle"
        >
          {id}
        </text>
      );
    }
  };

  const getFill = state => {
    let hue = '#ddd';
    if (state) {
      const active = isActive(state);
      if (active) {
        hue = '#FAD980'; // active States are highlighted yellow
      } else {
        // Otherwise, their color is derived from the region they belong to
        const region = regions.find(region => {
          return region.slug == state.region;
        });
        hue = region.mapColors.listing;
      }
    }
    return hue;
  };

  return (
    <TribalNationMapWrapper style={{ width: '100%' }}>
      <p tabIndex="0" class="screenreader">
        Maps of states containing photographs from this Tribal Nation. Select a state to see photographs specific to
        that state.
      </p>
      <ComposableMap projection="geoAlbersUsa" width={900} height={600}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            /* Remove Hawaii */
            geographies = geographies.filter(item => item.properties.name !== 'Hawaii');
            return (
              <>
                {geographies.map(geo => {
                  // console.log(geo);
                  const state = getState(geo.id);
                  const fill = getFill(state);
                  const active = isActive(state);
                  const hoverFill = active ? tinycolor(fill).brighten(25).toString() : fill;
                  const stroke = tinycolor('#253B5D').darken(10).toString();
                  return (
                    <Geography
                      aria-label={!!state ? `${state.name}` : ''}
                      aria-hidden={active ? false : true}
                      tabIndex={active ? '0' : ''}
                      className={active ? 'active' : ''}
                      style={{
                        default: {
                          fill: fill,
                        },
                        hover: {
                          fill: hoverFill,
                        },
                      }}
                      onClick={() => {
                        history.push(`/states/${getState(geo.id).slug}`);
                      }}
                      key={geo.rsmKey}
                      stroke={stroke}
                      geography={geo}
                      fill={fill}
                    />
                  );
                })}
                {geographies.map(geo => {
                  const centroid = geoCentroid(geo);
                  const cur = states.find(s => s.val === geo.id);
                  const state = getState(geo.id);
                  const active = isActive(state);
                  return (
                    cur &&
                    active &&
                    Object.keys(offsets).indexOf(cur.id) !== -1 && (
                      <g key={geo.rsmKey + '-name'}>
                        <Annotation
                          subject={centroid}
                          dx={offsets[cur.id][0]}
                          dy={offsets[cur.id][1]}
                          className="rsm-annotation-text"
                          onClick={() => {
                            history.push(`/states/${getState(geo.id).slug}`);
                          }}
                          connectorProps={{
                            stroke: colors.yellow,
                          }}
                        >
                          {renderAnnotation(cur.id)}
                        </Annotation>
                      </g>
                    )
                  );
                })}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>
    </TribalNationMapWrapper>
  );
};

TribalNationMap.propTypes = {
  activeStates: PropTypes.array,
};

export default memo(TribalNationMap);
