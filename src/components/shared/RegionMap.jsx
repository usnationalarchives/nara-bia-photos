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

  const RegionMarker = () => {
    return (
      <g key="adsfasdfasdfas">
        <Marker coordinates={[-116.8, 30.7]}>
          <text y="2" fontSize={10} textAnchor="middle">
            Alaska Region
          </text>
        </Marker>
      </g>
    );
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
                {geographies.map(geo => {
                  const centroid = geoCentroid(geo);
                  const cur = states.find(s => s.val === geo.id);
                  console.log(centroid, geo.properties.name);
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
        <Marker coordinates={[-119.97292512079247, 37.18397337102898]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            California
          </text>
        </Marker>{' '}
        <Marker coordinates={[-119.97292512079247, 36.58397337102898]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Region
          </text>
        </Marker>
        <Marker coordinates={[-105.54795634775779, 36.997256788375054]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Western Region
          </text>
        </Marker>
        <Marker coordinates={[-113.67014978137767, 37.70563386025311]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Southwest Region
          </text>
        </Marker>
        <Marker coordinates={[-85.30200559812172, 37.53502330485163]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Eastern Region
          </text>
        </Marker>
        <Marker coordinates={[-118.56200520337062, 43.93465032631577]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Northwest Region
          </text>
        </Marker>
        <Marker coordinates={[-152.3794192251042, 63.92441825088091]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Alaska Region
          </text>
        </Marker>
        <Marker coordinates={[-100.22752309700857, 44.4445012204703]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Great Plains Region
          </text>
        </Marker>
        <Marker coordinates={[-109.63302925840122, 47.0524662795163]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Rocky Mountain Region
          </text>
        </Marker>
        <Marker coordinates={[-91.9931633606855, 44.62584839989349]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Midwest Region
          </text>
        </Marker>
        <Marker coordinates={[-98.79322972354891, 33.58832303946829]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Southern Plains Region &
          </text>
        </Marker>
        <Marker coordinates={[-98.79322972354891, 32.88832303946829]} fill="#777">
          <text textAnchor="middle" fill="#333333" fontSize={10}>
            Eastern Oklahoma Region
          </text>
        </Marker>
        {/*
        <Marker coordinates={[115.8, 30.7]} fill="#777">
          <text textAnchor="middle" fill="#F53">
            USA
          </text>
        </Marker>
        <Marker coordinates={[114.8, 30.7]} fill="#777">
          <text textAnchor="middle" fill="#F53">
            Mexico
          </text>
        </Marker> */}
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
