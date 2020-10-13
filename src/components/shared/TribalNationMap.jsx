import React, { Fragment, useState, memo, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';

import tinycolor from 'tinycolor2';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const TribalNationMapWrapper = styled.div`
  .rsm-geography.active:hover {
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

  const isActive = (state) => {
    if (state) {
      const index = activeStates.findIndex((element, index, arr) => {
        return state.name === element;
      });
      return index >= 0;
    } else {
      return false;
    }
  }

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
      <ComposableMap projection="geoAlbersUsa">
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
                      className={active ? 'active': ''}
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
