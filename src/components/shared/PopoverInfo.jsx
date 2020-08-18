import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Popover, { ArrowContainer } from 'react-tiny-popover';

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
  width: 300px;
`;

const StyledButton = styled.button`
  ${buttonReset}
  margin-left: 0.5rem;

  [data-whatinput='mouse'] & {
    outline: 0;
  }
`;

const Question = styled(QuestionIcon)`
  fill: ${props => props.theme.colors.white};
  height: 14px;
  width: 14px;
`;

const PopoverInfo = ({ content }) => {
  const contentEl = useRef();
  const [open, setOpen] = useState(false);

  return (
    <Popover
      isOpen={open}
      position={'bottom'}
      disableReposition
      onClickOutside={() => setOpen(false)}
      contentLocation={{ top: 40, left: -20 }}
      content={({ position, targetRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          targetRect={targetRect}
          popoverRect={popoverRect}
          arrowStyle={{ marginLeft: '4px' }}
          arrowColor={'#f6f6f6'}
          arrowSize={8}
        >
          <Content>{content}</Content>
        </ArrowContainer>
      )}
      contentDestination={contentEl.current}
      containerStyle={{ overflow: 'visible', zIndex: '100' }}
    >
      <span style={{ position: 'relative' }}>
        <StyledButton onClick={() => setOpen(!open)}>
          <Text.Screenreader>Help</Text.Screenreader>
          <Question />
        </StyledButton>
        <span ref={contentEl}></span>
      </span>
    </Popover>
  );
};

export default PopoverInfo;
