import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import reactPackeryComponent from 'react-packery-component';
import { random } from 'lodash';
import tinycolor from 'tinycolor2';
import IPS from 'img-placeholder-src';

import { homepageGridThumbnailNaids } from '#modules/constants';

// hooks
import useRecords from '#hooks/useRecords';

import { fl_absoluteFill } from '#styles/frontline';

import iiifImage from '#modules/iiifImage';

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
  z-index: -1;
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
  top: 0;
  width: auto;
  overflow: visible;
  z-index: 2;
`;

const FidelitySliderStyled = styled(FidelitySlider)`
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  /* position: sticky; */
  top: 0;
`;

const Home = () => {
  const max = 7;
  const min = 4;

  const [gridSize, setGridSize] = useState(6);
  const items = Array.from({ length: 150 }, () => ({ bkg: random(1, 40) }));
  let inverseGridSize = gridSize * -1 + max + min;
  let size = 100 / ((inverseGridSize / max) * max);

  const [results] = useRecords({
    facets: {
      naIds: homepageGridThumbnailNaids,
    },
  });

  return (
    <div style={{ position: 'relative', overflow: 'visiible' }}>
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
        <Packery style={{ diplay: 'flex', alignItems: 'stretch' }} options={packeryOptions}>
          {[...results, ...results].map((result, i) => {
            return (
              <ImageSquareStyled
                // image={ips.src({ height: 500, width: 500 }, 'lorempixel', { unique: i })}
                image={iiifImage(result, 600)}
                size={size}
                bkg={items[i].bkg}
                key={`imageGrid-${i}`}
              ></ImageSquareStyled>
            );
          })}
        </Packery>
      </ImageGrid>
    </div>
  );
};

export default Home;
