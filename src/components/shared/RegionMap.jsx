import React, { Fragment, useState, memo, createRef, useEffect } from 'react';
import { geoCentroid } from 'd3-geo';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';
import { states, regions } from '#modules/constants';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled, { css } from 'styled-components';
import d3plus, { TextBox } from 'd3plus-text';
import { ReactComponent as PhotoIcon } from '#assets/icons/photo.svg';

import tinycolor from 'tinycolor2';

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

  return (
    <RegionMapWrapper>
      <ReactTooltip backgroundColor="#fff" textColor="#333" borderColor="#DDD" border={true}>
        {!!activeMapState && (
          <StyledTooltipContent>
            <span>{activeMapState.name}</span>
            <PhotoIconStyled width="15"></PhotoIconStyled> ## Records
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
                        history.push(`/states/${getState(geo.id).slug}`);
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
                {geographies.map(geo => {
                  const centroid = geoCentroid(geo);
                  const cur = states.find(s => s.val === geo.id);
                  // console.log(centroid, geo.properties.name);
                  return null;
                  // <g key={geo.rsmKey + '-name'}>
                  //   {cur && centroid[0] > -160 && centroid[0] < -67 && (
                  //     <Marker coordinates={centroid}>
                  //       <text y="2" fontSize={14} textAnchor="middle">
                  //         {cur.id}
                  //       </text>
                  //     </Marker>
                  //   )}
                  // </g>
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
