import React, { ComponentProps } from 'react';
import { Checkout } from '@app/Checkout/Checkout';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Checkout',
  component: Checkout,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Checkout>> = (args) => <Dashboard {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
