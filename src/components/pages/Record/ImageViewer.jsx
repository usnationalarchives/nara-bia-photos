import React, { useEffect, useState } from 'react';
import OpenSeaDragon from 'openseadragon';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

import { fl_allStates, fl_static, fl_attention, fl_visuallyHidden } from '#styles/frontline';
import * as Text from '#components/shared/Text';

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
  background-color: ${props => tinycolor(props.theme.colors.darkGrey).setAlpha(0.8).toRgbString()};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: absolute;
  padding: 30px 20px;
  right: 0;
  top: 0;
  z-index: 1000;

  div > *:not(:first-child) {
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
  height: 41px;
  justify-content: center;
  text-align: center;
  width: 41px;

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

  useEffect(() => {
    initOpenSeaDragon();

    return () => {
      // clean up by destroying this viewer when unmounting
      viewer && viewer.destroy();
    };
    // we only want to run this once, dont worry about other dependencies
    // eslint-disable-next-line
  }, []);

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
      // Custom button selectors
      zoomInButton: 'osd-zoom_in',
      zoomOutButton: 'osd-zoom_out',
      homeButton: 'osd-home',
      fullPageButton: 'osd-full_page',
      // referenceStripElement: 'referenceStripElement', // this is broken. see: https://github.com/openseadragon/openseadragon/issues/333
    });

    setViewer(newViewer);
  };

  return (
    <ViewerContainer>
      <ViewerStyled id="viewer"></ViewerStyled>
      <ViewerContols>
        <div>
          <ViewerButtonStyled id="osd-zoom_in">
            <ZoomInIcon width={20} fill="currentColor" />
            <Text.Screenreader>Zoom In</Text.Screenreader>
          </ViewerButtonStyled>
          <ViewerButtonStyled id="osd-zoom_out">
            <ZoomOutIcon width={20} fill="currentColor" />
            <Text.Screenreader>Zoom Out</Text.Screenreader>
          </ViewerButtonStyled>
        </div>
        <div>
          <ViewerButtonStyled id="osd-home">
            <CenterIcon width={20} fill="currentColor" />
            <Text.Screenreader>Home</Text.Screenreader>
          </ViewerButtonStyled>
        </div>
        <div>
          <ViewerButtonStyled>
            <ShareIcon width={20} fill="currentColor" />
            <Text.Screenreader>Share</Text.Screenreader>
          </ViewerButtonStyled>
          <ViewerButtonStyled as="a" href={iiifImage(record, 'full')}>
            <DownloadIcon width={20} fill="currentColor" />
            <Text.Screenreader>Download</Text.Screenreader>
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
