import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from '#styles/theme';
import { ReactComponent as SearchIcon } from '#assets/icons/close.svg';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { action } from '@storybook/addon-actions';
import Button from '#components/shared/Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const stylesData = 'Lorem Ipsum';
export const IconData = 'Portraits';

export const Styles = () => (
  <>
    <Button scheme="green">{text('Button Text', stylesData)}</Button>
    <br />
    <Button scheme="blue">{text('Button Text', stylesData)}</Button>
    <br />
    <Button disabled="true">{text('Button Text', stylesData)}</Button>
    <br />
  </>
);

Styles.story = {
  name: 'styles',
};

export const Icon = () => (
  <Button scheme="blue" onClick={action('clicked')}>
    {text('Button Text', IconData)}
    <SearchIcon width="11" fill="currentColor" />
  </Button>
);

Icon.story = {
  name: 'with icon',
};
