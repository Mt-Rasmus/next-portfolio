/** @jsxImportSource @emotion/react */
"use client";
import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { montserrat } from "@/app/fonts";

const styledButtonStyle = css`
  font-family: ${montserrat.style.fontFamily};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.5rem 1rem;
  background-color: #bbba76;
  width: auto;
  &:hover {
    background-color: #a9a85f;
  }
`;

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function StyledButton({
  children,
  onClick,
  disabled,
  type = "button",
}: StyledButtonProps) {
  return (
    <Button
      css={styledButtonStyle}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
}
