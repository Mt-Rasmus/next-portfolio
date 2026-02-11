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
  align-items: center;
  text-align: center;
  padding: 1rem;
  border: 1px solid var(--primary-dark);
  background-color: var(--primary-light);
  height: 220px;
  justify-content: space-between;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  transition: transform 0.3s ease-out;
  animation: growIn 0.3s ease-out;

  &:hover {
    transform: scale(1.05);
  }

  @keyframes growIn {
    from {
      transform: scale(0.8);
    }
  }
  button {
    font-size: 1.5rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
  }
  h1 {
    font-weight: 300;
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
  return (
    <div
      css={cardContainerStyle}
      onClick={() => mode === "admin" && setOverlayVisible(!overlayVisible)}
    >
      <div css={imageContainerStyle}>
        <SmartImage
          src={project.imageUrl}
          alt={project.title}
          width={300}
          height={200}
        />
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
