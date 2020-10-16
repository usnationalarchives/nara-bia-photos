/*eslint no-undef: "warn"*/
/*eslint-env browser*/
import React, { useEffect, useState } from 'react';
import OpenSeaDragon from 'openseadragon';
import styled, { css } from 'styled-components';
import tinycolor from 'tinycolor2';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Script from 'react-load-script';

import { fl_allStates, fl_static, fl_attention, fl_visuallyHidden } from '#styles/frontline';
import * as Text from '#components/shared/Text';
import { colors } from '#styles/theme';

import iiifImage from '#modules/iiifImage';

import { ReactComponent as ArrowIcon } from '#assets/icons/photo-arrow.svg';
import { ReactComponent as CenterIcon } from '#assets/icons/photo-center.svg';
import { ReactComponent as DownloadIcon } from '#assets/icons/photo-download.svg';
import { ReactComponent as ShareIcon } from '#assets/icons/photo-share.svg';
import { ReactComponent as ZoomInIcon } from '#assets/icons/photo-zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from '#assets/icons/photo-zoom-out.svg';

const ViewerContainer = styled.div`
  background-color: ${props => props.theme.colors.darkGrey};
  position: relative;
  /* padding: 2rem 0; */
`;

const ViewerContols = styled.div`
  align-items: center;
  background-color: ${props => tinycolor(props.theme.colors.darkGrey).setAlpha(0.8).toRgbString()};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: absolute;
  padding: 30px 20px;
  bottom: 0;
  z-index: 1000;

  ${props => {
    if (!!props.left) {
      return css`
        align-items: center;
        justify-content: center;
        left: 0;
      `;
    }
    if (!!props.right) {
      return css`
        /* height: 50%; */
        /* height: calc(50% + 41px); */
        /* padding-top: 0; */
        right: 0;
        bottom: 0;
      `;
    }
  }}

  div > *:not(:first-child):not(.at-share-btn-elements) {
    margin-top: 10px;
  }
`;

const ViewerButtonStyled = styled.button`
  align-items: center;
  border: solid 1px #fff;
  background-color: transparent;
  border-radius: 41px;
  color: #fff;
  display: flex !important;
  height: 48px;
  justify-content: center;
  text-align: center;
  width: 48px;

  span {
    display: inline-block;
  }
`;

const ViewerStyled = styled.div`
  height: 500px;
  max-height: 80vh;
  width: 100%;

  @media all and ${props => props.theme.breakpoints.medium} {
    height: 730px;
  }
`;

const ViewerButton = styled.button`
  ${fl_visuallyHidden}
`;

const ImageViewer = ({ record, objects }) => {
  const [viewer, setViewer] = useState();
  const [zoomLevel, setZoomLevel] = useState();

  useEffect(() => {
    if (objects && viewer) {
      const tileSources = objects
        .map(object => object.imageTiles.url)
        .map(url => url.replace('catalog.archives.gov/catalogmedia', 's3.amazonaws.com/NARAprodstorage'));

      viewer.open(tileSources);
    }
    // we only care about the object prop, ignore other dependencies
    // eslint-disable-next-line
  }, [objects]);

  // useEffect(() => {
  //   if (typeof window.addthis !== 'undefined') {
  //     console.log('addthis', addthis);
  //     addthis.layers.refresh();
  //   }
  // }, []);

  useEffect(() => {
    initOpenSeaDragon();

    return () => {
      // clean up by destroying this viewer when unmounting
      if (viewer) {
        viewer.world.viewer.removeAllHandlers();
        viewer.destroy();
      }
    };
    // we only want to run this once, dont worry about other dependencies
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (objects && viewer) {
      // viewer.viewport.zoomTo(zoomLevel);
    }
  }, [zoomLevel]);

  const handleAddThisLoad = () => {
    // addthis.layers.refresh();
  };

  const initOpenSeaDragon = () => {
    viewer && viewer.destroy();

    const newViewer = OpenSeaDragon({
      id: 'viewer',
      prefixUrl: '/images/openseadragon/',
      sequenceMode: true,
      showSequenceControl: false,
      showReferenceStrip: true,
      viewportMargins: {
        top: 30,
        bottom: 30,
      },
      maxZoomLevel: 4,
      minZoomLevel: 0,
      // Custom button selectors
      zoomInButton: 'osd-zoom_in',
      zoomOutButton: 'osd-zoom_out',
      homeButton: 'osd-home',
      fullPageButton: 'osd-full_page',
      // referenceStripElement: 'referenceStripElement', // this is broken. see: https://github.com/openseadragon/openseadragon/issues/333
    });
    if (!!newViewer) {
      newViewer.world.viewer.addHandler('zoom', level => {
        setZoomLevel(level.zoom);
      });
    }
    setViewer(newViewer);
  };

  return (
    <ViewerContainer>
      <ViewerStyled id="viewer"></ViewerStyled>
      {/* 
      <ViewerContols left>
        <div>

        </div>
      </ViewerContols> */}
      <ViewerContols right>
        <div>
          {/* <ShareIcon width={20} fill="currentColor" />
            <Text.Screenreader>Share</Text.Screenreader> */}
          <Script
            url="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-50e7434a1e973d51"
            onLoad={() => {
              handleAddThisLoad();
            }}
          />
          <div
            style={{ border: 'solid 1px #fff', borderRadius: '49px' }}
            className="addthis_inline_share_toolbox_biyw"
          ></div>
        </div>
        <div>
          <ViewerButtonStyled id="osd-zoom_in">
            <ZoomInIcon width={20} fill="currentColor" />
            <Text.Screenreader>Zoom In</Text.Screenreader>
          </ViewerButtonStyled>
          {false && (
            <Slider
              min={viewer.viewport.getMinZoom()}
              max={5}
              step={0.25}
              trackStyle={{ height: '2px', backgroundColor: colors.blue }}
              railStyle={{ height: '2px', backgroundColor: colors.blue }}
              handleStyle={{
                boxShadow: 'none',
                borderColor: colors.blue,
              }}
              defaultValue={viewer.viewport.getZoom(true)}
              onChange={val => {
                setZoomLevel(val);
              }}
              vertical={true}
              value={zoomLevel}
            />
          )}
          <ViewerButtonStyled id="osd-home">
            <CenterIcon width={20} fill="currentColor" />
            <Text.Screenreader>Home</Text.Screenreader>
          </ViewerButtonStyled>
          <ViewerButtonStyled id="osd-zoom_out">
            <ZoomOutIcon width={20} fill="currentColor" />
            <Text.Screenreader>Zoom Out</Text.Screenreader>
          </ViewerButtonStyled>
        </div>
        <div>
          <ViewerButtonStyled as="a" href={iiifImage(record, 'full')}>
            <DownloadIcon width={20} fill="currentColor" />
            <Text.Screenreader>Download original photograph of: {record.title}</Text.Screenreader>
          </ViewerButtonStyled>
        </div>
        {/* <ViewerButtonStyled id="osd-full_page">
          <Text.Screenreader>Full Page</Text.Screenreader>
        </ViewerButtonStyled> */}
      </ViewerContols>
      <div id="referenceStripElement"></div>
    </ViewerContainer>
  );
};

export default ImageViewer;
