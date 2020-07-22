import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Root = styled.ol``;

const Section = styled.li`
  margin-bottom: 2rem;
`;

const Items = styled.ol``;

const Item = styled.li``;

const TribeList = ({ groupedTribes }) => {
  return (
    <Root>
      {Object.entries(groupedTribes).map((section, i) => (
        <Section key={i}>
          <p id={section[0].toLowerCase()}>{section[0]}</p>
          <Items>
            {section[1].map((item, i) => (
              <Item key={i}>
                <Link to={`/tribal-nations/${item.slug}`}>{item.name}</Link>
              </Item>
            ))}
          </Items>
        </Section>
      ))}
    </Root>
  );
};

export default TribeList;
