import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { sampleSize } from 'lodash';

import { ReactComponent as CaretIcon } from '#assets/icons/caret.svg';

// components
import * as Text from '#components/shared/Text';
import Results from '#components/shared/Results';

// hooks
import useRecords from '#hooks/useRecords';

// modules
import { tribalNationThumbnails } from '#modules/constants';

// styles
import { fl_allStates, fl_static, fl_attention, fl_visuallyHidden } from '#styles/frontline';

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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -20px;
`;

const Item = styled.li`
  break-inside: avoid;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
  padding: 8px 20px;
  flex: 0 0 100%;

  @media all and ${props => props.theme.breakpoints.medium} {
    flex: 0 0 50%;
  }

  @media all and ${props => props.theme.breakpoints.large} {
    flex: 0 0 25%;
  }
`;

const ItemLink = styled(Link)`
  ${fl_static(css`
    color: ${props => props.theme.colors.blue};
    text-decoration: none;
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const ReturnLink = styled('a')`
  font-size: 0.75rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: solid 1px ${props => props.theme.colors.mediumGrey};
  text-transform: uppercase;
  line-height: 1.8;

  ${fl_static(css`
    color: ${props => props.theme.colors.blue};
    text-decoration: none;
  `)}
  ${fl_attention(css`
    color: ${props => props.theme.colors.darkBlue};
    text-decoration: underline;
  `)}

  @media all and ${props => props.theme.breakpoints.medium} {
    font-size: 14px;
  }

  span {
    @media all and ${props => props.theme.breakpoints.mediumMax} {
      ${fl_visuallyHidden}
    }
  }

  svg {
    margin-left: 5px;
    margin-top: -0.3em;
    transform: rotate(180deg);
    vertical-align: middle;
  }
`;

const TribeList = ({ groupedTribes }) => {
  const [thumbnailResults] = useRecords({
    facets: {
      naIds: Object.values(tribalNationThumbnails).flat(),
    },
  });

  return (
    <Root>
      {Object.entries(groupedTribes).map((section, i) => (
        <Section key={i}>
          <Results
            singleRow
            data={sampleSize(
              thumbnailResults.filter(result => tribalNationThumbnails[section[0].toLowerCase()].includes(result.naId)),
              3
            )}
            fidelity={250}
          />

          <SectionHeading>
            <Text.H2>
              <a
                aria-label={`Tribal Nations starting with the letter ${section[0].toLowerCase()}`}
                id={`section-${section[0].toLowerCase()}`}
                href={`#section-${section[0].toLowerCase()}`}
              >
                {section[0]}
              </a>
            </Text.H2>
            <SectionMeta>
              ({section[1].length} Tribal {section[1].length > 1 ? 'Nations' : 'Nation'})
            </SectionMeta>
            <ReturnLink aria-label="Return to index" href={`#section-link-${section[0].toLowerCase()}`}>
              <span>Return to</span> index
              <CaretIcon width="10" fill="#345d96" />
            </ReturnLink>
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
