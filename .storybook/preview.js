// .storybook/preview.js

import React from "react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import { GlobalStyles, theme, ThemeProvider } from "../theme";
import { StoryContext, StoryGetter, StoryWrapper } from "@storybook/addons";

// Global decorator to apply the styles to all stories
// export const decorators = [
//   Story => (
//     <ThemeProvider theme={theme.lightTheme}>
//       <Story />
//     </ThemeProvider>
//   ),
// ];

const withThemeProvider = (Story, context) => {
  const selectedTheme = context.globals.theme;

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "lightTheme",
    toolbar: {
      icon: "circlehollow",
      // array of plain string values or MenuItem shape (see below)
      items: ["lightTheme", "darkTheme"],
    },
  },
};

export const decorators = [withThemeProvider];
