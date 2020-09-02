import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '#components/shared/Button';
import { useHistory } from 'react-router-dom';

const Label = styled.span`
  font-size: 0.8125rem;
  margin-right: 10px;
  text-transform: uppercase;
`;

const Item = styled.span`
  display: inline-block;
`;

const List = styled.ul`
  display: inline-block;
  list-style: none;
`;

const Li = styled.li`
  display: inline-block;
  margin: 5px 0 5px 15px;
`;

const Meta = ({ className, label, items = [] }) => {
  const history = useHistory();

  return (
    <div className={className}>
      <Label>{label}:</Label>
      {items.length >= 1 && (
        <List>
          {items.map((item, index) => {
            return (
              <Li key={`meta-${index}`}>
                <Item outline as={item.link ? Button : 'span'} onClick={() => history.push(item.link)}>
                  {item.label}
                </Item>
              </Li>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default Meta;
