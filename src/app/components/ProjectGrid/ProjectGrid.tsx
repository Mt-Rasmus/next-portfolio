/** @jsxImportSource @emotion/react */
"use client";
import { ReactNode } from "react";
import { css } from "@emotion/react";

export default function ProjectGrid({ children }: { children: ReactNode }) {
  const gridStyle = css`
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    align-items: stretch;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;
  return <div css={gridStyle}>{children}</div>;
}
