import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// styles
import { fl_allStates, fl_attention } from '#styles/frontline';

const Root = styled.div`
  background-color: ${props => props.theme.colors.lightGrey};
  border-radius: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  width: 300px;
`;

const Items = styled.ul`
  margin: 0.5rem 0;
`;

const Item = styled.li`
  color: ${props => props.theme.colors.darkGrey};
  margin-bottom: 0.5rem;
  font-size: 0.95rem;

  &:last-child {
    margin: 0;
  }
`;

const ItemLink = styled(Link)`
  ${fl_allStates(css`
    color: ${props => props.theme.colors.darkGrey};
    text-decoration: none;
  `)}

  ${fl_attention(css`
    color: ${props => props.theme.colors.blue};
  `)}
`;

const PopoverNav = ({ slugPrefix, items, ...props }) => {
  return (
    <Root {...props}>
      <Items>
        {items.map(item => (
          <Item key={item.slug}>
            <ItemLink to={`/${slugPrefix}/${item.slug}`}>{item.name}</ItemLink>
          </Item>
        ))}
        {items.length === 0 && <p>No Results</p>}
      </Items>
    </Root>
  );
};

export default PopoverNav;
