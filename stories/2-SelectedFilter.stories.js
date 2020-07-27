import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import SelectedFilter from '../src/components/shared/SelectedFilter';

export default {
  title: 'Selected Term',
  component: SelectedFilter,
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const valueData = 'Portraits';

export const Default = () => (
  <SelectedFilter value={text('Filter Text', valueData)} />
);
