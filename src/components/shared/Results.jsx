import React from "react";
import styled from "styled-components";

// components
import Result from "#components/shared/Result";

const ResultsStyles = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 20px -10px 0;
`;

const Item = styled.li`
  flex: auto;
  height: ${(props) => props.fidelity + 60}px;
  margin: 10px 10px 20px;
  overflow: hidden;
  position: relative;
  width: ${(props) =>
    props.fidelity *
    (props.record.aspectRatio ? props.record.aspectRatio : 1)}px;

  &:nth-child(${(props) => props.data.length}),
  &:nth-child(${(props) => props.data.length - 1}) {
    flex-grow: 0;
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    max-width: 50%;
    margin-bottom: 40px;
  }
`;

const Results = ({ results, data, fidelity }) => {
  return (
    <ResultsStyles>
      {data.map((record) => (
        <Item key={record.slug} data={data} record={record} fidelity={fidelity}>
          <Result key={record.naId} record={record} scale={fidelity} />
        </Item>
      ))}
    </ResultsStyles>
  );
};

export default Results;
