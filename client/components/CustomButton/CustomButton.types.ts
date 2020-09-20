import React from "react";

export interface CustomButtonProps {
  text: string;
  isOutlined?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  href?: string;
  color?: string;
}

export type StyledButtonProps = Pick<CustomButtonProps, "isOutlined">;
