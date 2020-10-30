import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import styled from 'styled-components';
import * as Layout from '#components/shared/Layout';
import Button from '#components/shared/Button';
import { ReactComponent as SearchIcon } from '#assets/icons/search.svg';
import tinycolor from 'tinycolor2';

import * as Text from '../../shared/Text';

const H1 = styled(Text.H1)`
  color: white;
  line-height: 1;
`;

const Banner = styled.div`
  background-color: ${props => props.theme.colors.blue};
  padding: 1rem 0 2rem;

  @media all and ${props => props.theme.breakpoints.medium} {
    padding: 3rem 0 4rem;
  }
`;

const InputGroup = styled.div`
  position: relative;

  > * {
    background-color: #fff;
    border: solid 2px ${props => props.theme.colors.blue};
    border-radius: 23px;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    padding: 3px;
    position: relative;
    z-index: 2;
  }

  &:after {
    content: '';
    opacity: 0;
    background-color: ${props => tinycolor(props.theme.colors.blue).darken(30).toString()};
    border-radius: 56px;
    height: 100%;
    left: 0;
    padding: 0;
    position: absolute;
    top: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
    width: 100%;
    z-index: 1;
  }

  &:focus-within:after {
    opacity: 0.3;
    transform: scaleX(1.015) scaleY(1.2);
  }

  .grow {
    flex: 1 auto;
  }

  .shrink {
    flex: 0 0 auto;
  }
`;

const StyledButton = styled(Button)`
  height: 40px;
  width: 40px;
  padding: 0;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: #00000;
  padding: 0 15px;
  width: 100%;

  &:focus {
    outline: 0;
  }
`;

const QueryField = ({ defaultValue, setQuery }) => {
  const handleSearch = debounce(value => {
    setQuery('');
    setQuery(value);
  }, 300);

  return (
    <Banner>
      <Layout.Padding>
        <Layout.Wrapper narrow="true">
          <form role="search" action={`${process.env.PUBLIC_URL}/search`} method="get">
            <label htmlFor="q">
              <H1>Search</H1>
            </label>
            <InputGroup>
              <div>
                <Input
                  type="text"
                  id="q"
                  name="q"
                  defaultValue={defaultValue}
                  className="grow"
                  placeholder="Enter a keyword or phrase"
                  onKeyUp={event => handleSearch(event.target.value)}
                />
                <span className="shirnk">
                  <StyledButton type="submit" scheme={'green'}>
                    <SearchIcon width="20" fill="currentColor" />
                    <Text.Screenreader>Search</Text.Screenreader>
                  </StyledButton>
                </span>
              </div>
            </InputGroup>
          </form>
        </Layout.Wrapper>
      </Layout.Padding>
    </Banner>
  );
};

QueryField.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default QueryField;
