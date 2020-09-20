import { styled } from "../../../theme";
import { StyledButtonProps } from "./CustomButton.types";

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  width: 120px;
  height: 40px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isOutlined }) =>
    !isOutlined ? theme.button.main : "transparent"};
  border: 1px solid
    ${({ theme, isOutlined }) =>
      isOutlined ? theme.button.main : "transparent"};
`;

export const StyledText = styled.span`
  font-size: 16px;
  font-weight: 400;
`;
