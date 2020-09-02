import styled, { css } from 'styled-components';
import * as frontline from '#styles/frontline';

export const RowStyles = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  width: 100%;

  @media all and ${props => props.theme.breakpoints.medium} {
    flex-direction: row;
    flex-wrap: no-wrap;
    margin-top: 3rem;
  }
`;

export const LabelStyles = styled.span`
  flex: 0 0 auto;
  margin-bottom: 12px;
  margin-right: 20px;

  @media all and ${props => props.theme.breakpoints.medium} {
    flex: 1 0 140px;
  }
`;

export const ValueStyles = styled.div`
  flex: 2 1 100%;
  display: flex;
  flex-direction: column;

  @media all and ${props => props.theme.breakpoints.medium} {
    flex-direction: row;
    flex-wrap: no-wrap;
  }

  > * {
    max-width: 600px;
  }
`;
