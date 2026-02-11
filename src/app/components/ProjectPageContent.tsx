/** @jsxImportSource @emotion/react */
"use client";
import { Project } from "../types/project";
import { css } from "@emotion/react";
import Image from "next/image";

const containerStyle = css`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: var(--font-header);
  }
  p {
    font-size: 1.15rem;
    margin-bottom: 1.5rem;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

export default function ProjectPageContent({ project }: { project: Project }) {
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div css={containerStyle}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={800}
        height={600}
      />
    </div>
  );
}
