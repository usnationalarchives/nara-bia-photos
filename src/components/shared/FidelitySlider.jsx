import React from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ReactComponent as SmallGridIcon } from "#assets/icons/grid-small.svg";
import { ReactComponent as LargeGridIcon } from "#assets/icons/grid-large.svg";

const SliderStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 250px;
  }
`;

const FidelitySlider = ({ update }) => {
  return (
    <SliderStyles>
      <SmallGridIcon width="30" style={{ marginRight: "20px" }}></SmallGridIcon>
      <Slider
        min={100}
        max={350}
        step={25}
        defaultValue={225}
        onChange={(val) => {
          update(val);
        }}
      />
      <LargeGridIcon width="30" style={{ marginLeft: "20px" }}></LargeGridIcon>
    </SliderStyles>
  );
};

export default FidelitySlider;
