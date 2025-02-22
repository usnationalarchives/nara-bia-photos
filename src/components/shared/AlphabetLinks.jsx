import React from 'react';
import styled, { css } from 'styled-components';

// modules
import { alphabet } from '#modules/helpers';

// styles
import { fl_allStates } from '#styles/frontline';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Link = styled.a`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100%;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-bottom: 10px;
  margin-right: 10px;
  text-align: center;
  text-transform: uppercase;
  width: 40px;

  &[disabled] {
    opacity: 0.5;
  }

  ${fl_allStates(css`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

const AlphabetLinks = ({ activeLetters, ...props }) => {
  return (
    <Root {...props} role="navigation" aria-label="Alphabet">
      {alphabet().map((letter, i) => {
        const hasTribalNations = activeLetters.indexOf(letter.toUpperCase()) >= 0;
        return (
          <Link
            key={i}
            id={`section-link-${letter}`}
            aria-label={hasTribalNations ? `Jump to Tribal Nations starting with the letter ${letter}` : null}
            href={hasTribalNations ? `#section-${letter}` : null}
            disabled={!hasTribalNations}
            aria-hidden={!hasTribalNations}
          >
            {letter}
          </Link>
        );
      })}
    </Root>
  );
};
export default AlphabetLinks;
