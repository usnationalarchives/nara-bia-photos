import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  padding: 0.5rem 1rem;
`;

const Items = styled.ul``;

const Item = styled.li``;

const PopoverNav = ({ slugPrefix, items, ...props }) => {
  return (
    <Root {...props}>
      <Items>
        {items.map((item) => (
          <Item key={item.slug}>
            <Link to={`/${slugPrefix}/${item.slug}`}>{item.name}</Link>
          </Item>
        ))}
      </Items>
    </Root>
  );
};

export default PopoverNav;
