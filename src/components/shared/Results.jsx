import React, { Fragment } from "react";
import styled from "styled-components";

// components
import Result from "#components/shared/Result";

const ResultsStyles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 20px -15px 0;
`;

const Item = styled.li`
  flex: 1 0 auto;
  padding: 15px;
  margin-bottom: 40px;
  position: relative;
`;

const Results = ({ results, data, fidelity }) => {
  return (
    <ResultsStyles>
      {data.map((record) => (
        <Item key={record.slug} fidelity={fidelity}>
          <Result key={record.naId} record={record} scale={fidelity} />
        </Item>
      ))}
    </ResultsStyles>
  );
};

export default Results;
