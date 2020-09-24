import React, { createRef, useEffect, useState } from 'react';
import shave from 'shave';
import { debounce } from 'lodash';

import styled from 'styled-components';

import Toggle from '#components/shared/Toggle';

const Text = styled.span`
  .js-shave {
    display: block !important;
    max-height: 1em;
    position: relative;
    overflow: hidden;

    &:after {
      content: '';
      background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
      height: 110%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;

const Shave = ({ maxHeight, options, children, textRef }) => {
  const [active, setActive] = useState(false);
  const [shaved, setShaved] = useState(false);

  function renderText() {
    if (active) {
      return <>{children}</>;
    } else {
      return <Text>{children}</Text>;
    }
  }

  useEffect(() => {
    if (textRef.current && !active) {
      shave(textRef.current, maxHeight, options);
      // Check whether or not the text has been shaved. The `shave` library does not expose the state.
      // Instead, we have to query the dom for the existance of the shaved element
      if (textRef.current.querySelectorAll('.js-shave').length >= 1) {
        setShaved(true);
      }
    }

    window.addEventListener(
      'resize',
      debounce(() => setShaved(false), 300)
    );
  }, [active, shaved]);

  return (
    <>
      {renderText()}
      {!!shaved && (
        <Toggle
          defaultText="Show Full Title"
          activeText="Collapse"
          style={{ marginTop: '20px' }}
          outline
          onClick={() => setActive(!active)}
        ></Toggle>
      )}
    </>
  );
};

export default Shave;
