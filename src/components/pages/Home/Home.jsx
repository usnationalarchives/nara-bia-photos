import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
// import reactPackeryComponent from 'react-packery-component';
import { random, shuffle, slice } from 'lodash';
import tinycolor from 'tinycolor2';
import IPS from 'img-placeholder-src';
import { Helmet } from 'react-helmet';
import { CarouselProvider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { homepageGridThumbnailNaids } from '#modules/constants';
import iiifImage from '#modules/iiifImage';

// hooks
import useRecords from '#hooks/useRecords';

import { fl_absoluteFill } from '#styles/frontline';

// components
// page specific components
import IntroStyled from './IntroStyled';
import ExploreTribalNationsStyled from './ExploreTribalNationsStyled';
import ExploreNativeAmericansStyled from './ExploreNativeAmericansStyled';
// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import ImageSquare from '#components/shared/ImageSquare';
import FidelitySlider from '#components/shared/FidelitySlider';
import RecordModal from '#components/shared/RecordModal';
import TribalNationModal from '#components/shared/TribalNationModal';
import NotableNativeAmericanModal from '#components/shared/NotableNativeAmericanModal';

// config
import content from '#config/content';

// const Packery = reactPackeryComponent(React); // inject React
const ips = new IPS();

const packeryOptions = {
  percentPosition: true,
  transitionDuration: '0.5s',
  resize: false,
  columnWidth: 0,
};

const ImageGrid = styled.div`
  ${fl_absoluteFill}
  background-color: ${props => tinycolor(props.theme.colors.blue).darken(15).toString()};
  display: flex;
  flex-wrap: wrap;
  overflow-y: hidden;
  /* z-index: -; */
`;

const Grid = styled.div`
  display: grid;
  position: relative;
  /* grid-template-columns: repeat(5, 20vw [col-start]);
  grid-template-rows: 1fr repeat(6, 20vw); */

  grid-template-columns: repeat(3, 33.333333vw [col-start]);
  grid-template-rows: repeat(18, 33.333333vw);

  @media all and (max-width: 1023px) {
    grid-template-rows: repeat(11, 33.333333vw);
    > *:nth-child(n + 20) {
      display: none;
      position: absolute;
    }
  }

  @media all and ${props => props.theme.breakpoints.full} and (max-width: 1199px) {
    ${props =>
      props.$columns === 4 &&
      css`
        grid-template-columns: repeat(4, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(9, ${props.$columnWidth}vw);

        > *:nth-child(n + 42) {
          display: none;
          position: absolute;
        }
      `}
    ${props =>
      props.$columns === 5 &&
      css`
        grid-template-columns: repeat(5, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(10, ${props.$columnWidth}vw);

        > *:nth-child(n + 34) {
          display: none;
          position: absolute;
        }
      `}
    ${props =>
      props.$columns === 6 &&
      css`
        grid-template-columns: repeat(6, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(9, ${props.$columnWidth}vw);

        > *:nth-child(n + 41) {
          display: none;
          position: absolute;
        }
      `}  
    ${props =>
      props.$columns === 7 &&
      css`
        grid-template-columns: repeat(7, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(10, ${props.$columnWidth}vw);

        > *:nth-child(n + 54) {
          display: none;
          position: absolute;
        }
      `}
  }

  @media all and (min-width: 1200px) {
    ${props =>
      props.$columns === 4 &&
      css`
        grid-template-columns: repeat(4, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(7, ${props.$columnWidth}vw);

        > *:nth-child(n + 30) {
          display: none;
          position: absolute;
        }
      `}
    ${props =>
      props.$columns === 5 &&
      css`
        grid-template-columns: repeat(5, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(7, ${props.$columnWidth}vw);

        > *:nth-child(n + 32) {
          display: none;
          position: absolute;
        }
      `}
    ${props =>
      props.$columns === 6 &&
      css`
        grid-template-columns: repeat(6, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(9, ${props.$columnWidth}vw);

        > *:nth-child(n + 45) {
          display: none;
          position: absolute;
        }
      `}  
    ${props =>
      props.$columns === 7 &&
      css`
        grid-template-columns: repeat(7, ${props.$columnWidth}vw [col-start]);
        grid-template-rows: repeat(10, ${props.$columnWidth}vw);

        > *:nth-child(n + 54) {
          display: none;
          position: absolute;
        }
      `}
  }
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
  display: none;
  margin-right: 30px;
  padding: 10px;
  position: relative;
  position: sticky;
  top: 30px;
  z-index: 3;

  @media all and ${props => props.theme.breakpoints.full} {
    display: flex;
  }
`;

const Home = () => {
  const max = 7;
  const min = 4;
  const gridPhotoLimts = {
    4: 54,
    5: 42,
    6: 38,
    7: 30,
  };

  const [gridSize, setGridSize] = useState(6);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [tribalNationModalOpen, setTribalNationModalOpen] = useState(false);
  const [notableNativeAmericanModalOpen, setNotableNativeAmericanModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);

  const items = Array.from({ length: 150 }, () => ({ bkg: random(1, 40) }));
  let inverseGridSize = gridSize * -1 + max + min;
  let size = 100 / ((inverseGridSize / max) * max);

  const [results, actions] = useRecords(
    {
      facets: {
        naIds: homepageGridThumbnailNaids,
      },
    },
    []
  );

  const shuffleItems = items => {
    return shuffle(items);
  };

  const gridItems = useMemo(() => {
    return shuffleItems(results);
  }, [results]); // add gridSize to shuffle on grid size change

  return (
    <div style={{ position: 'relative' }}>
      <Helmet>
        <title>Bureau Of Indian Affairs Photographs Finding Aid</title>
        {/* <meta name="description" content={content.topics.intro}></meta> */}
        <meta name="" content="" />
        <meta name="twitter:title" content="Bureau Of Indian Affairs Photographs Finding Aid" />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={'FIXME'} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta property="og:title" content="Bureau Of Indian Affairs Photographs Finding Aid" />
        <meta name="og:description" content={'FIXME'} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>

      <div>
        <Track>
          <FidelitySliderStyled
            aria-hidden="true"
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
            <IntroStyled $columns={inverseGridSize}></IntroStyled>
            <ExploreTribalNationsStyled
              $columns={inverseGridSize}
              scheme="yellow"
              onClick={() => {
                setTribalNationModalOpen(true);
              }}
              title={content.home.tribalNationExplorer.title}
              text={content.home.tribalNationExplorer.text}
            ></ExploreTribalNationsStyled>
            <TribalNationModal open={tribalNationModalOpen} setOpen={setTribalNationModalOpen} />
            <ExploreNativeAmericansStyled
              $columns={inverseGridSize}
              onClick={() => {
                setNotableNativeAmericanModalOpen(true);
              }}
              scheme="green"
              title={content.home.photographExplorer.title}
              text={content.home.photographExplorer.text}
            ></ExploreNativeAmericansStyled>
            <NotableNativeAmericanModal
              open={notableNativeAmericanModalOpen}
              setOpen={setNotableNativeAmericanModalOpen}
            />
            {slice(gridItems, 0, gridPhotoLimts[gridSize]).map((result, i) => {
              return (
                <ImageSquareStyled
                  // image={ips.src({ height: 500, width: 500 }, 'lorempixel', { unique: i })}
                  index={i}
                  alt={`Photograph Titled: ${result.title}` || ''}
                  bkg={items[i].bkg}
                  image={iiifImage(result, 600)}
                  key={`imageGrid-${i}`}
                  onClick={() => {
                    setImageIndex(i);
                    setRecordModalOpen(true);
                  }}
                  size={size}
                ></ImageSquareStyled>
              );
            })}
          </Grid>
        </div>
      </div>
      <CarouselProvider
        currentSlide={imageIndex}
        infinite={true}
        naturalSlideWidth={16}
        naturalSlideHeight={9}
        isIntrinsicHeight={true}
        totalSlides={gridItems.length}
      >
        <RecordModal
          items={gridItems}
          activeIndex={imageIndex}
          open={recordModalOpen}
          setOpen={setRecordModalOpen}
          setImageIndex={setImageIndex}
        />
      </CarouselProvider>
    </div>
  );
};

export default Home;
