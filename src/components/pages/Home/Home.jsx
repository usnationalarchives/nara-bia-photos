import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import reactPackeryComponent from 'react-packery-component';
import { random, shuffle } from 'lodash';
import tinycolor from 'tinycolor2';
import IPS from 'img-placeholder-src';
import { Modal } from 'react-responsive-modal';

import { homepageGridThumbnailNaids } from '#modules/constants';
import iiifImage from '#modules/iiifImage';

// hooks
import useRecords from '#hooks/useRecords';

import { fl_absoluteFill } from '#styles/frontline';

// components
// page specific components
import Intro from './Intro';
import ExplorePromo from './ExplorePromo';
// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import ImageSquare from '#components/shared/ImageSquare';
import FidelitySlider from '#components/shared/FidelitySlider';

// config
import content from '#config/content';

const Packery = reactPackeryComponent(React); // inject React
const ips = new IPS();

const packeryOptions = {
  percentPosition: true,
  transitionDuration: '0.5s',
};

const ImageGrid = styled.div`
  ${fl_absoluteFill}
  background-color: ${props => tinycolor(props.theme.colors.blue).darken(15).toString()};
  overflow-y: hidden;
  /* z-index: -; */
`;

const Grid = styled.div`
  display: grid;
  position: relative;
  /* grid-template-columns: repeat(5, 20vw [col-start]);
  grid-template-rows: 1fr repeat(6, 20vw); */

  ${props =>
    props.$columns === 4 &&
    css`
      grid-template-columns: repeat(4, ${props.$columnWidth}vw [col-start]);
      grid-template-rows: repeat(7, ${props.$columnWidth}vw);
    `}
  ${props =>
    props.$columns === 5 &&
    css`
      grid-template-columns: repeat(5, ${props.$columnWidth}vw [col-start]);
      grid-template-rows: repeat(7, ${props.$columnWidth}vw);
    `}
  ${props =>
    props.$columns === 6 &&
    css`
      grid-template-columns: repeat(6, ${props.$columnWidth}vw [col-start]);
      grid-template-rows: repeat(9, ${props.$columnWidth}vw);
    `}  
  ${props =>
    props.$columns === 7 &&
    css`
      grid-template-columns: repeat(7, ${props.$columnWidth}vw [col-start]);
      grid-template-rows: repeat(10, ${props.$columnWidth}vw);
    `}
`;

const IntroStyled = styled(Intro)`
  /* min-height: 40vw; */
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  z-index: 2;

  ${props =>
    props.$columns === 4 &&
    css`
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 3;
    `}

  ${props =>
    props.$columns === 5 &&
    css`
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 3;
    `}

  ${props =>
    props.$columns === 6 &&
    css`
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 1;
      grid-row-end: 3;
    `}

  ${props =>
    props.$columns === 7 &&
    css`
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: [row-start];
      grid-row-end: 4;
    `}
`;

const ExplorePromoStyled1 = styled(ExplorePromo)`
  grid-column-start: 3;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 5;
  min-height: 20vw;
  z-index: 2;

  ${props =>
    props.$columns === 4 &&
    css`
      grid-column-start: 3;
      grid-column-end: [column-end];
      grid-row-start: 4;
      grid-row-end: 5;
    `}

  ${props =>
    props.$columns === 5 &&
    css`
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 4;
      grid-row-end: 5;
    `}

  ${props =>
    props.$columns === 6 &&
    css`
      grid-column-start: 4;
      grid-column-end: 6;
      grid-row-start: 4;
      grid-row-end: 6;
    `}

  ${props =>
    props.$columns === 7 &&
    css`
      grid-column-start: 4;
      grid-column-end: 7;
      grid-row-start: 5;
      grid-row-end: 7;
    `}
`;

const ExplorePromoStyled2 = styled(ExplorePromo)`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 6;
  grid-row-end: 7;
  z-index: 2;

  ${props =>
    props.$columns === 4 &&
    css`
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 6;
      grid-row-end: 7;
    `}

  ${props =>
    props.$columns === 5 &&
    css`
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 6;
      grid-row-end: 7;
    `}

  ${props =>
    props.$columns === 6 &&
    css`
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 7;
      grid-row-end: 9;
    `}

  ${props =>
    props.$columns === 7 &&
    css`
      grid-column-start: 2;
      grid-column-end: 5;
      grid-row-start: 8;
      grid-row-end: 10;
    `}
`;

const ImageSquareStyled = styled(ImageSquare)`
  /* width: ${props => `${props.$size}wv`}; */
`;

const Track = styled.div`
  height: 100%;
  right: 0;
  position: absolute;
  padding-top: 30px;
  top: 0;
  width: auto;
  overflow: visible;
`;

const FidelitySliderStyled = styled(FidelitySlider)`
  background: rgba(0, 0, 0, 0.6);
  margin-right: 30px;
  padding: 10px;
  position: relative;
  position: sticky;
  top: 30px;
  z-index: 3;
`;

const Home = () => {
  const max = 7;
  const min = 4;

  const [gridSize, setGridSize] = useState(6);
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);

  const items = Array.from({ length: 150 }, () => ({ bkg: random(1, 40) }));
  let inverseGridSize = gridSize * -1 + max + min;
  let size = 100 / ((inverseGridSize / max) * max);

  const [results] = useRecords({
    facets: {
      naIds: homepageGridThumbnailNaids,
    },
  });

  const shuffleItems = items => {
    return shuffle([...items, ...items]);
  };

  const gridItems = useMemo(() => {
    return shuffleItems(results);
  }, [results, gridSize]);

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <Track>
          <FidelitySliderStyled
            color="#fff"
            defaultValue={gridSize}
            min={min}
            max={max}
            step={1}
            update={setGridSize}
          />
        </Track>
        <div style={{ display: 'block' }}>
          <Grid $columns={inverseGridSize} $columnWidth={size}>
            {/* <Layout.Padding> */}
            {/* <Layout.Wrapper> */}
            <IntroStyled $columns={inverseGridSize}></IntroStyled>
            <ExplorePromoStyled1
              $columns={inverseGridSize}
              scheme="yellow"
              title={content.home.tribalNationExplorer.title}
              text={content.home.tribalNationExplorer.text}
            ></ExplorePromoStyled1>
            <ExplorePromoStyled2
              $columns={inverseGridSize}
              scheme="green"
              title={content.home.photographExplorer.title}
              text={content.home.photographExplorer.text}
            ></ExplorePromoStyled2>
            {/* </Layout.Wrapper> */}
            {/* </Layout.Padding> */}
          </Grid>
        </div>
        <ImageGrid>
          <Packery
            style={{ diplay: 'flex', alignItems: 'stretch' }}
            options={packeryOptions}
            disableImagesLoaded={true}
          >
            {gridItems.map((result, i) => {
              return (
                <ImageSquareStyled
                  // image={ips.src({ height: 500, width: 500 }, 'lorempixel', { unique: i })}
                  bkg={items[i].bkg}
                  image={iiifImage(result, 600)}
                  key={`imageGrid-${i}`}
                  onClick={() => {
                    setOpen(true);
                    setImageIndex(i);
                  }}
                  size={size}
                ></ImageSquareStyled>
              );
            })}
          </Packery>
        </ImageGrid>
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setImageIndex(null);
        }}
        center
      >
        {gridItems.length > 0 && !!imageIndex && (
          <>
            <Text.H2 style={{ color: '#fff' }}>{gridItems[imageIndex].title}</Text.H2>
            <img src={iiifImage(gridItems[imageIndex], 600)} alt="" />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Home;
