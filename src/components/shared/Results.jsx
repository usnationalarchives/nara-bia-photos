import React from 'react';
import styled, { css } from 'styled-components';

// components
import Result from '#components/shared/Result';

const ResultsWrapper = styled.div`
  ${props =>
    !!props.$singleRow &&
    css`
      width: 100%;
      overflow-x: scroll;
    `}

  @media all and ${props => props.theme.breakpoints.medium} {
    ${props =>
      !!props.$singleRow &&
      css`
        overflow-x: hidden;
      `}
  }
`;
const ResultsStyles = styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 20px -10px 0;

  ${props =>
    !!props.$singleRow &&
    css`
      flex-wrap: nowrap;
      min-width: 800px;
      /* overflow-x: scroll; */
    `}
`;

const Item = styled.li`
  flex: auto;
  height: ${props => props.fidelity + 70}px;
  margin: 10px 10px 20px;
  overflow: hidden;
  position: relative;
  /* width: ${props => props.fidelity * (props.record.aspectRatio ? props.record.aspectRatio : 1)}px; */

  ${props =>
    !props.singleRow &&
    css`
      &:nth-child(${props => props.dataLength}),
      &:nth-child(${props => props.dataLength - 1}) {
        flex-grow: 0;
      }
    `}

  @media all and ${props => props.theme.breakpoints.large} {
    margin-bottom: 40px;
  }
`;

const Results = ({ className, results = [], data, fidelity, singleRow }) => {
  return (
    <>
      {data.length > 0 && (
        <ResultsWrapper $singleRow={singleRow}>
          <ResultsStyles className={className} role="main" aria-label="Results" $singleRow={singleRow}>
            {data.map(record => (
              <Item
                style={{ width: `${Math.floor(fidelity * (record.aspectRatio ? record.aspectRatio : 1))}px` }}
                singleRow={singleRow}
                key={record.slug}
                dataLength={data.length}
                record={record}
                fidelity={fidelity}
              >
                <Result key={record.naId} record={record} scale={fidelity} />
              </Item>
            ))}
          </ResultsStyles>
        </ResultsWrapper>
      )}
      {data.length < 1 && <p style={{ margin: '30px', textAlign: 'center' }}>There are no photographs</p>}
    </>
  );
};

export default Results;
