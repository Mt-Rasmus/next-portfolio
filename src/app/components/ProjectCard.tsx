/** @jsxImportSource @emotion/react */
"use client";
import { type Project } from "@/app/types/project";
import Image from "next/image";
import { css } from "@emotion/react";
import { montserrat } from "@/app/fonts";

const cardContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 5px solid #cdce83;
  background-color: #ffffff;
  height: 220px;
  justify-content: space-between;
  border-radius: 4px;
  h1 {
    font-family: ${montserrat.style.fontFamily};
    font-weight: 500;
    margin-top: 1rem;
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const imageContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
`;

const imageStyle = css`
  width: 100%;
  object-fit: cover;
  max-width: 300px;
  height: auto;
  max-height: 200px;
  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 300px;
  }
`;

const ProjectCard = ({ project }: { project: Project }) => {
  const isCloudinary = project.imageUrl.includes("res.cloudinary.com");
  return (
    <div css={cardContainerStyle}>
      <div css={imageContainerStyle}>
        {isCloudinary ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={400}
            height={300}
            css={imageStyle}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.imageUrl} alt={project.title} css={imageStyle} />
        )}
      </div>
      <h1>{project.title}</h1>
    </div>
  );
};

export default ProjectCard;
