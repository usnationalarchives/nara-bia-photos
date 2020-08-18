import React from 'react';
import styled from 'styled-components';

// components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import PopoverInfo from '#components/shared/PopoverInfo';

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

const Billboard = ({ title, intro, introHelp, ...props }) => {
  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <Title>{title}</Title>
          {intro && (
            <Intro>
              {intro}
              {introHelp && <PopoverInfo content={introHelp} />}
            </Intro>
          )}
          {props.children}
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default Billboard;
