import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Popover from 'react-tiny-popover';

// components
import * as Layout from '#components/shared/Layout';
import * as Text from '#components/shared/Text';
import PopoverNav from '#components/shared/PopoverNav';

// styles
import { buttonReset } from '#styles/mixins';

const Root = styled.div`
  background-color: ${props => props.theme.colors.blue};
  padding: 2rem 0;
`;

const Label = styled(Text.Label)`
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`;

const Title = styled(Text.H1)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
  margin-top: 0.75rem;
  max-width: 700px;
`;

const Intro = styled(Text.Intro)`
  color: ${props => props.theme.colors.white};
`;

const TitleButton = styled.button`
  ${buttonReset}
  display: inline;
  text-align: left;
  line-height: inherit;

  [data-whatinput='mouse'] & {
    outline: none;
  }

  &:after {
    // don't alphabetize these, the order is important
    border: 8px solid white;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;

    content: '';
    display: inline-block;
    height: 16px;
    margin-left: 1rem;
    width: 16px;
  }
`;

const ListingBillboard = ({ label, title, intro, items, slugPrefix }) => {
  const popoverEl = useRef();
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  // collapse the mobile navigation when following a link
  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <Label>{label}</Label>
          <Popover
            isOpen={navOpen}
            disableReposition
            onClickOutside={() => setNavOpen(false)}
            contentLocation={{ top: 60, left: 0 }}
            content={<PopoverNav items={items} slugPrefix={slugPrefix} />}
            contentDestination={popoverEl.current}
            containerStyle={{ overflow: 'visible' }}
          >
            <div style={{ position: 'relative' }}>
              <Title>
                <TitleButton onClick={() => setNavOpen(!navOpen)}>{title}</TitleButton>
              </Title>
              <div ref={popoverEl}></div>
            </div>
          </Popover>

          <Intro>{intro}</Intro>
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default ListingBillboard;
