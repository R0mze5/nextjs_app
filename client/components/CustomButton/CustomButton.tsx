import React from "react";

import { StyledButton, StyledText } from "./CustomButton.styled";

import { CustomButtonProps } from "./CustomButton.types";

export const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  color,
  isOutlined,
  onClick,
  href,
}) => {
  let anchorProps = {};

  if (href) {
    anchorProps = {
      href,
    };
  }

  return (
    <StyledButton
      as={href ? "a" : "button"}
      onClick={onClick}
      isOutlined={isOutlined}
      color={color}
      {...anchorProps}
    >
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
};
