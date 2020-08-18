import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Popover, { ArrowContainer } from 'react-tiny-popover';

// components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import PopoverInfo from '#components/shared/PopoverInfo';
import { ReactComponent as QuestionIcon } from '#assets/icons/question.svg';

// styles
import { buttonReset } from '#styles/mixins';

const Root = styled.div`
  background-color: ${props => props.theme.colors.blue};
  padding: 2rem 0 3rem;
`;

const Title = styled(Text.H1)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const Intro = styled(Text.Intro)`
  color: ${props => props.theme.colors.white};
  max-width: 530px;
`;

const IntroHelpButton = styled.button`
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

const IntroHelp = ({ content }) => {
  const introHelpEl = useRef();
  const [introHelpOpen, setIntroHelpOpen] = useState(false);
  return (
    <Popover
      isOpen={introHelpOpen}
      position={'bottom'}
      disableReposition
      onClickOutside={() => setIntroHelpOpen(false)}
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
          <PopoverInfo>{content}</PopoverInfo>
        </ArrowContainer>
      )}
      contentDestination={introHelpEl.current}
      containerStyle={{ overflow: 'visible', zIndex: '100' }}
    >
      <span style={{ position: 'relative' }}>
        <IntroHelpButton onClick={() => setIntroHelpOpen(!introHelpOpen)}>
          <Text.Screenreader>Help</Text.Screenreader>
          <Question />
        </IntroHelpButton>
        <span ref={introHelpEl}></span>
      </span>
    </Popover>
  );
};

const Billboard = ({ title, intro, introHelp, ...props }) => {
  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <Title>{title}</Title>
          {intro && (
            <Intro>
              {intro}
              {introHelp && <IntroHelp content={introHelp} />}
            </Intro>
          )}
          {props.children}
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default Billboard;
