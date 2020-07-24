import styled from "styled-components";

export const Text = styled.input`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 21px;
  border: 0;
  height: 42px;
  padding: 16px 22px;

  [data-whatinput="mouse"] & {
    outline: none;
  }
`;
