import React from "react";
import styled from "styled-components";

const Grid = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 -20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const GridItem = styled.li`
  padding: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 50%;
  }

  @media all and ${(props) => props.theme.breakpoints.large} {
    width: 33.33%;
  }
`;

export { Grid, GridItem };
