import React, { Fragment, useState, memo } from 'react';
import { geoCentroid } from 'd3-geo';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

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

const MapChart = ({ setTooltipContent }) => {
  const history = useHistory();

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

  return (
    <div>
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
                        setTooltipContent(geo.id);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent();
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
