import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import { CustomButton } from "./CustomButton";
import { CustomButtonProps } from "./CustomButton.types";

export default {
  title: "atoms/CustomButton",
  component: CustomButton,
  argTypes: {
    text: {
      control: "text",
      defaultValue: "Click me!",
    },
    color: {
      control: "color",
    },
    onClick: { action: "clicked!" },
  },
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "twitter", value: "#00aced" },
        { name: "facebook", value: "#3b5998" },
      ],
    },
  },
} as Meta;

export const CustomButtonStory: Story<CustomButtonProps> = (args) => (
  <CustomButton {...args} />
);

export const Primary = CustomButtonStory.bind({});
Primary.args = {
  text: "Button",
};
