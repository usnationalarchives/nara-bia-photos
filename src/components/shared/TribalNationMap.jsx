import React, { Fragment, useState, memo, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import styled, { css } from 'styled-components';

import tinycolor from 'tinycolor2';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const TribalNationMap = ({ activeStates }) => {
  const getState = geoID => {
    const state = states.find(state => {
      return state.val == geoID;
    });
    return state;
  };

  const getFill = geoID => {
    let hue = '#ddd';
    const state = getState(geoID);
    if (state) {
      const isActive = activeStates.findIndex((element, index, arr) => {
        return state.name === element;
      });
      if (isActive >= 0) {
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
    <div style={{ width: '100%' }}>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            /* Remove Hawaii */
            geographies = geographies.filter(item => item.properties.name !== 'Hawaii');
            return (
              <>
                {geographies.map(geo => {
                  // console.log(geo);
                  const fill = getFill(geo.id);
                  const stroke = tinycolor('#253B5D').darken(10).toString();
                  return (
                    <Geography
                      style={{
                        default: {
                          fill: fill,
                        },
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
    </div>
  );
};

TribalNationMap.propTypes = {
  activeStates: PropTypes.array,
};

export default memo(TribalNationMap);
