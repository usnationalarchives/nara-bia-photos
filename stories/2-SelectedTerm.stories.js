import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import SelectedTerm from '../src/components/pages/Search/SelectedTerm';

export default {
  title: 'Selected Term',
  component: SelectedTerm,
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
};

export const valueData = 'Testing';

export const Default = () => (
  <SelectedTerm value={text('valueData', valueData)} />
);
