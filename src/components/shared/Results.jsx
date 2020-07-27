import React, { Fragment } from 'react';

// components
import Result from '#components/shared/Result';
import styled from 'styled-components';

const ResultsSyles = styled.ul`
  margin: 20px -15px;

  li {
    margin-top: 2rem;
    display: inline-block;
    padding: 0 15px;
    /* padding: 0 15px; */
  }
`;

const Results = ({ results, data, fidelity }) => {
  return (
    <ResultsSyles>
      {data.map((record) => (
        <li>
          <Result key={record.naId} record={record} scale={fidelity} />
        </li>
      ))}
    </ResultsSyles>
  );
};

export default Results;
