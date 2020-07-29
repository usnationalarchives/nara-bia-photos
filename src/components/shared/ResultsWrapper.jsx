import styled from "styled-components";

const ResultsWrapper = styled.div`
  border-top: solid 1px ${(props) => props.theme.colors.mediumGrey};
  margin-top: 2rem;
  padding-top: 2rem;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin-top: 3.2rem;
    padding-top: 3.2rem;
  }
`;

export default ResultsWrapper;
