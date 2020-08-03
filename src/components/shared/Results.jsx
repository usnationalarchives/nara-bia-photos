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
  margin: 10px 10px 40px;
  overflow: hidden;
  position: relative;
  max-width: 50%;
  width: ${(props) =>
    props.fidelity *
    (props.record.aspectRatio ? props.record.aspectRatio : 1)}px;
`;

const Results = ({ results, data, fidelity }) => {
  return (
    <ResultsStyles>
      {data.map((record) => (
        <Item key={record.slug} record={record} fidelity={fidelity}>
          <Result key={record.naId} record={record} scale={fidelity} />
        </Item>
      ))}
    </ResultsStyles>
  );
};

export default Results;
