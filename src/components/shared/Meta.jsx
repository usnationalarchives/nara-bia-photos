import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '#components/shared/Button';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import tinycolor from 'tinycolor2';

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

const Meta = ({ className, label, items = [], scheme = 'dark' }) => {
  const history = useHistory();

  return (
    <div className={className}>
      <Label>{label}:</Label>
      {items.length >= 1 && (
        <List>
          {items.map((item, index) => {
            return (
              <Li key={`meta-${index}`}>
                <Item
                  outline
                  scheme={scheme === 'light' ? 'white' : false}
                  as={!!item.link ? Button : 'span'}
                  onClick={() => {
                    item.onClick();
                  }}
                >
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

Meta.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.array,
  scheme: PropTypes.string,
};

export default Meta;
