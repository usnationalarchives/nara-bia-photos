import React from 'react';
import styled from 'styled-components';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ReactComponent as SmallGridIcon } from '#assets/icons/grid-small.svg';
import { ReactComponent as LargeGridIcon } from '#assets/icons/grid-large.svg';

const SliderStyles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 250px;
  }
`;

const FidelitySlider = ({ update }) => {
  return (
    <SliderStyles>
      <SmallGridIcon width="30" style={{ marginRight: '20px' }}></SmallGridIcon>
      <Slider
        min={20}
        max={100}
        step={20}
        reverse={true}
        defaultValue={60}
        onChange={(val) => {
          update(val);
        }}
      />
      <LargeGridIcon width="30" style={{ marginLeft: '20px' }}></LargeGridIcon>
    </SliderStyles>
  );
};

export default FidelitySlider;
