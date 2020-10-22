import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ReactComponent as SmallGridIcon } from '#assets/icons/grid-small.svg';
import { ReactComponent as LargeGridIcon } from '#assets/icons/grid-large.svg';
import { colors } from '#styles/theme';

const SliderStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  @media all and ${props => props.theme.breakpoints.medium} {
    width: 250px;
  }
`;

const Handle = props => {
  console.log(props);
  return <div className="rc-slider-handle"></div>;
};

const FidelitySlider = ({
  color = colors.blue,
  min = 120,
  max = 320,
  step = 20,
  defaultValue = 220,
  update,
  className,
}) => {
  return (
    <SliderStyles style={{ color: color }} className={className}>
      <SmallGridIcon width="30" style={{ marginRight: '20px' }} fill={color}></SmallGridIcon>
      <Slider
        min={min}
        max={max}
        step={step}
        ariaLabelForHandle={'fidelity-slider'}
        trackStyle={{ height: '2px', backgroundColor: color }}
        railStyle={{ height: '2px', backgroundColor: color }}
        handleStyle={{
          boxShadow: 'none',
          borderColor: color,
        }}
        // handle={Handle}
        defaultValue={defaultValue}
        onChange={val => {
          update(val);
        }}
      />
      <LargeGridIcon width="30" style={{ marginLeft: '20px' }} fill={color}></LargeGridIcon>
    </SliderStyles>
  );
};

export default FidelitySlider;
