import { createGlobalStyle } from "styled-components";

import { normalize } from "styled-normalize";
import { ThemeProps } from "./types";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    background: ${({ theme }: ThemeProps) => theme.body};
    color: ${({ theme }: ThemeProps) => theme.text};
    font-family: Roboto;
  }
`;
