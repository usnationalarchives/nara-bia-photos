import styled from "styled-components";

const ResultsHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 20px;
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default ResultsHeaderWrapper;
