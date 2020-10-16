import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// components
import {H1, H2, H3, H4, H5, H6, Intro, Label, Screenreader, Rich} from '#components/shared/Text';
import Results from '#components/shared/Results';

// hooks
import useRecords from '#hooks/useRecords';

// modules
import { tribalNationThumbnails } from '#modules/constants';

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
            data={thumbnailResults.filter(result =>
              tribalNationThumbnails[section[0].toLowerCase()].includes(result.naId)
            )}
            fidelity={250}
          />

          <SectionHeading>
            <H2>
              <a
                aria-label={`Tribal Nations starting with the letter ${section[0].toLowerCase()}`}
                id={`section-${section[0].toLowerCase()}`}
                href={`#section-${section[0].toLowerCase()}`}
              >
                {section[0]}
              </a>
            </H2>
            <SectionMeta>
              ({section[1].length} Tribal {section[1].length > 1 ? 'Nations' : 'Nation'})
            </SectionMeta>
            <a className="screenreader" href={`#section-link-${section[0].toLowerCase()}`}>
              Back to Alphabet navigation
            </a>
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
