/** @jsxImportSource @emotion/react */
"use client";
import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";

const styledButtonStyle = css`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.5rem 1rem;
  background-color: var(--foreground);
  width: auto;
  &:hover {
    background-color: var(--primary-darkest);
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
