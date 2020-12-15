import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Popover, { ArrowContainer } from 'react-tiny-popover';

import * as frontline from '#styles/frontline';
// components
import * as Text from '#components/shared/Text';
import { ReactComponent as QuestionIcon } from '#assets/icons/question.svg';

// styles
import { buttonReset } from '#styles/mixins';

const Content = styled.div`
  background-color: ${props => props.theme.colors.lightGrey};
  border-radius: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.darkGrey};
  font-size: 0.8rem;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  max-width: 300px;
`;

const StyledButton = styled.button`
  ${buttonReset}
  margin-left: 0.5rem;
  position: relative;

  [data-whatinput='mouse'] & {
    outline: 0;
  }

  ${frontline.fl_static(css`
    color: ${props => props.theme.colors.white};
  `)}
  ${frontline.fl_attention(css`
    color: ${props => props.theme.colors.black};
  `)}
`;

const Wrapper = styled.span`
  position: relative;
`;

const Question = styled(QuestionIcon)`
  fill: currentColor;
  height: 14px;
  width: 14px;
`;

const PopoverInfo = ({
  className,
  content,
  toggleText,
  position = 'bottom',
  disableReposition = true,
  contentLocation = { top: 40, left: -20 },
}) => {
  const contentEl = useRef();
  const [open, setOpen] = useState(false);

  return (
    <Popover
      className={className}
      isOpen={open}
      position={position}
      disableReposition={disableReposition}
      onClickOutside={() => setOpen(false)}
      // contentLocation={contentLocation} this doesn't work properly
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowStyle={{ marginLeft: '4px' }}
          arrowColor={'#f6f6f6'}
          arrowSize={8}
        >
          <Content aria-live="polite">{content}</Content>
        </ArrowContainer>
      )}
      // contentDestination={contentEl.current} this doesn't work properly
      containerStyle={{ overflow: 'visible', zIndex: '100' }}
    >
      <Wrapper className={className}>
        <StyledButton aria-describedby="billboardTooltip" onClick={() => setOpen(!open)}>
          <Text.Screenreader>{!!toggleText ? toggleText : 'Toggle Help'}</Text.Screenreader>
          <Question />
        </StyledButton>
      </Wrapper>
      {/* <span id="billboardTooltip" ref={contentEl} aria-live="assertive" role="tooltip"></span> */}
    </Popover>
  );
};

export default PopoverInfo;
