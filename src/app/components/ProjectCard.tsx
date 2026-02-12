/** @jsxImportSource @emotion/react */
"use client";
import { type Project } from "@/app/types/project";
import { css } from "@emotion/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import SmartImage from "./SmartImage";

const cardContainerStyle = css`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 280px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.075);

  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-8px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    .project-overlay {
      opacity: 1;
    }
  }

  &:hover .project-overlay {
    opacity: 1;
  }
  h1 {
    font-weight: 500;
    font-size: 1.25rem;
    margin: 1.5rem 1rem;
    color: black;
    text-align: center;
  }
  @media (max-width: 768px) {
    width: 25rem;
  }
`;

const imageWrapperStyle = css`
  width: 100%;
  border-radius: 0px !important;
  height: 200px;
  overflow: hidden;
  background-color: white;

  img {
    object-fit: cover;
    width: 100% !important;
    height: 100% !important;
  }
`;

const overlayStyle = css`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
  height: 200px;

  button {
    font-size: 1.5rem;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px;
    border-radius: 50%;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background: white;
      color: black;
      transform: scale(1.1);
    }
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
  return (
    <div
      css={cardContainerStyle}
      onClick={() => mode === "admin" && setOverlayVisible(!overlayVisible)}
    >
      <div css={imageWrapperStyle}>
        <SmartImage
          src={project.imageUrl}
          alt={project.title}
          width={300}
          height={200}
        />
        {mode === "admin" && (
          <div
            className="project-overlay"
            css={[overlayStyle, overlayVisible && { opacity: 1 }]}
          >
            <button onClick={onEdit}>
              <FaEdit />
            </button>
            <button onClick={onDelete}>
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <h1>{project.title}</h1>
    </div>
  );
};

export default ProjectCard;
