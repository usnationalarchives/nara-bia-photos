import React, { setState, useState, useEffect, useContext } from 'react';
import { Modal } from 'react-responsive-modal';
import styled, { css } from 'styled-components';
import tinycolor from 'tinycolor2';
import { useHistory } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext, CarouselContext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import { ReactComponent as ArrowRightIcon } from '#assets/icons/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '#assets/icons/arrow-left.svg';
import { ReactComponent as CrossIcon } from '#assets/icons/cross.svg';

// constants
import { tribalNations, externalUrls } from '#modules/constants';

// modules
import iiifImage from '#modules/iiifImage';
import { getRecordTopics, getRecordStates } from '#modules/helpers';

// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import Meta from '#components/shared/Meta';
import Button from '#components/shared/Button';

// styles
import * as frontline from '#styles/frontline';

const MetaStyled = styled(Meta)`
  display: inline-block;
`;

const MetaWrapper = styled.div`
  border-bottom: 1px solid ${tinycolor('#fff').setAlpha(0.4).toRgbString()};
  color: #fff;
  align-items: flex-start;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;

  > * {
    align-items: center;
    display: flex;
    margin-right: 25px;
    margin-bottom: 20px;

    &:not(:first-child) {
      padding-left: 25px;
      border-left: solid 1px ${tinycolor('#fff').setAlpha(0.4).toRgbString()};
    }
  }
`;

const carouselButtonStyles = css`
  height: 100%;
  position: absolute;
  top: 0;
  width: 100px;

  ${frontline.fl_static(css`
    background: none;
    border: none;
    outline: none;
  `)}
`;

const ButtonBackStyled = styled(ButtonBack)`
  ${carouselButtonStyles}
  left: 0;
`;
const ButtonNextStyled = styled(ButtonNext)`
  ${carouselButtonStyles}
  right: 0;
`;

const RecordModal = ({ activeIndex, items, open, setOpen, setImageIndex }) => {
  const history = useHistory();
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);

  if (activeIndex !== null) {
    var record = items[activeIndex];
    var tribalNation = tribalNations.filter(tribalNation => tribalNation.name === record.tribes)[0];
    var recordTopics = getRecordTopics(record.tags);
    var recordStates = getRecordStates(record.states);
  }
  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
      setImageIndex(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return (
    <Modal
      animationDuration={300}
      closeIcon={<CrossIcon width={30} fill="#fff" />}
      showCloseIcon={true}
      open={open}
      onClose={() => {
        setOpen(false);
        setImageIndex(null);
      }}
      center
    >
      {items.length > 0 && !!record && (
        <Layout.Padding>
          <Layout.Wrapper medium>
            <Text.H3 style={{ color: '#fff' }}>{record.title}</Text.H3>
            <MetaWrapper>
              {tribalNation && (
                <MetaStyled
                  label="Tribal Nation"
                  outine
                  onClick={() => {
                    setOpen(false);
                  }}
                  scheme="light"
                  items={[{ label: record.tribes, link: `/tribal-nations/${tribalNation ? tribalNation.slug : ''}` }]}
                ></MetaStyled>
              )}
              {!!record.date && <MetaStyled label="Date" outine items={[{ label: record.date }]}></MetaStyled>}
              {!!recordTopics.length && (
                <MetaStyled
                  label="Topics"
                  outine
                  // onClick={() => {
                  //   alert('onclick from meta');
                  //   setOpen(false);
                  // }}
                  scheme="light"
                  items={recordTopics.map(topic => {
                    return {
                      label: topic.name,
                      link: `/topics/${topic.slug}`,
                      onClick: () => {
                        setOpen(false);
                        // A timeout is required so the the scroll prevention is
                        // removeed prior to navigating to a new route. The timeout
                        // value is set to after the modals `animationDuration` prop
                        setTimeout(() => {
                          history.push(`/topics/${topic.slug}`);
                        }, 400);
                      },
                    };
                  })}
                ></MetaStyled>
              )}{' '}
              {!!recordStates.length && (
                <MetaStyled
                  label="States"
                  outine
                  onClick={() => {
                    setOpen(false);
                  }}
                  scheme="light"
                  items={recordStates.map(state => {
                    return { label: state.name, link: `/states/${state.slug}` };
                  })}
                ></MetaStyled>
              )}
            </MetaWrapper>
            <div style={{ position: 'relative' }}>
              <Slider classNameAnimation="slider_sliderAnimation">
                {items.map((record, index) => {
                  return (
                    <Slide index={index}>
                      <Image style={{ margin: 'auto' }} src={iiifImage(record, 600)} alt={record.title || ''} />
                    </Slide>
                  );
                })}
              </Slider>
              <ButtonBackStyled>
                <span className="screenreader">Previous Slide</span>
                <ArrowLeftIcon width={20} fill="#fff"></ArrowLeftIcon>
              </ButtonBackStyled>
              <ButtonNextStyled>
                <span className="screenreader">Next Slide</span>
                <ArrowRightIcon width={20} fill="#fff"></ArrowRightIcon>
              </ButtonNextStyled>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Button
                scheme="green"
                outline={false}
                onClick={() => {
                  setOpen(false);
                  // A timeout is required so the the scroll prevention is
                  // removeed prior to navigating to a new route. The timeout
                  // value is set to after the modals `animationDuration` prop
                  setTimeout(() => {
                    history.push(`/${record.slug}`);
                  }, 500);
                }}
              >
                Explore in more detail<span className="screenreader"> Photograph: {record.title}</span>
              </Button>
            </div>
          </Layout.Wrapper>
        </Layout.Padding>
      )}
    </Modal>
  );
};

export default RecordModal;
