/** @jsxImportSource @emotion/react */
"use client";
import { createProject, updateProject } from "@/app/services/api";
import { type Project } from "@/app/types/project";
import { useState } from "react";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { css } from "@emotion/react";

const formContinerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
  max-width: 600px;
  margin: 2rem auto;
`;

const formInputStyle = css`
  padding: 0.5rem;
  border: 1px solid #bbba76;
  background-color: white;
  border-radius: 4px;
  font-size: 1rem;
`;

export default function ProjectForm({
  mode,
  project,
}: {
  mode?: "new" | "edit";
  project?: Project;
}) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const handleSubmit = () => {
    if (mode === "new") {
      createProject({ title, description, imageUrl } as Project);
    } else {
      updateProject({
        id: project?.id,
        title,
        description,
        imageUrl,
      } as Project);
    }
  };
  return (
    <div css={formContinerStyle}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        css={formInputStyle}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        name="description"
        placeholder="Description"
        value={description}
        css={formInputStyle}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={imageUrl}
        css={formInputStyle}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button type="submit" onClick={handleSubmit}>
        {mode === "new" ? "Create Project" : "Update Project"}
      </Button>
    </div>
  );
}
