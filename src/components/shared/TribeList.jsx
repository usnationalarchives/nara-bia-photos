import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// components
import * as Text from '#components/shared/Text';
import TribeThumbnails from '#components/shared/TribeThumbnails';

// styles
import { fl_allStates } from '#styles/frontline';

const Root = styled.ol``;

const Section = styled.li`
  margin-bottom: 4rem;
`;

const SectionHeading = styled.div`
  align-items: flex-end;
  display: flex;
  margin-bottom: 1rem;
`;

const SectionMeta = styled.p`
  font-size: 0.75rem;
  line-height: 1.8;
  margin-left: 0.5rem;

  @media all and ${props => props.theme.breakpoints.medium} {
    font-size: 1rem;
  }
`;

const Items = styled.ol`
  @media all and ${props => props.theme.breakpoints.medium} {
    column-count: 2;
    column-gap: 2rem;
  }

  @media all and ${props => props.theme.breakpoints.large} {
    column-count: 4;
  }
`;

const Item = styled.li`
  break-inside: avoid;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ItemLink = styled(Link)`
  ${fl_allStates(css`
    text-decoration: none;
    color: ${props => props.theme.colors.blue};
  `)}
`;

const TribeList = ({ groupedTribes }) => {
  return (
    <Root>
      {Object.entries(groupedTribes).map((section, i) => (
        <Section key={i}>
          <TribeThumbnails letter={section[0]} />

          <SectionHeading>
            <Text.H2 id={section[0].toLowerCase()}>{section[0]}</Text.H2>{' '}
            <SectionMeta>
              ({section[1].length} Tribal Nation
              {section[1].length > 1 ? 's' : null})
            </SectionMeta>
          </SectionHeading>
          <Items>
            {section[1].map((item, i) => (
              <Item key={i}>
                <ItemLink to={`/tribal-nations/${item.slug}`}>{item.name}</ItemLink>
              </Item>
            ))}
          </Items>
        </Section>
      ))}
    </Root>
  );
};

export default TribeList;
