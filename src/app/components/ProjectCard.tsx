/** @jsxImportSource @emotion/react */
"use client";
import { type Project } from "@/app/types/project";
import Image from "next/image";
import { css } from "@emotion/react";
import { montserrat } from "@/app/fonts";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

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
  position: relative;
  button {
    font-size: 1.5rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
  }
  h1 {
    font-family: ${montserrat.style.fontFamily};
    font-weight: 500;
    margin-top: 1rem;
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    height: 300px;
    max-width: 400px;
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

const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

const ProjectCard = ({
  project,
  mode,
  onEdit = () => {},
  onDelete = () => {},
}: {
  project: Project;
  mode: "public" | "admin";
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  // used for mobile devices to toggle overlay visibility on tap
  const [overlayVisible, setOverlayVisible] = useState(false);
  const isCloudinary = project.imageUrl.includes("res.cloudinary.com");
  return (
    <div
      css={cardContainerStyle}
      onClick={() => mode === "admin" && setOverlayVisible(!overlayVisible)}
    >
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
      {mode === "admin" && (
        <div css={[overlayStyle, overlayVisible && { opacity: 1 }]}>
          <button onClick={onEdit}>
            <FaEdit />
          </button>
          <button onClick={onDelete}>
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
