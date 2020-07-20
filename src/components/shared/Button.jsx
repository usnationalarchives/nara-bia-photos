import styled, { css } from "styled-components";

import { buttonReset } from "#styles/mixins";

export const buttonStyles = css`
  ${buttonReset}
  border-radius: 23px;
  border: 1px solid ${(props) => props.theme.colors.white};
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 16px 22px;
  text-decoration: none;
  text-transform: uppercase;
`;

export const ButtonLink = styled.a`
  ${buttonStyles}
`;

const Button = styled.button`
  ${buttonStyles}
`;

export default Button;
