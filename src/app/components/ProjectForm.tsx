/** @jsxImportSource @emotion/react */
"use client";
import { createProject, updateProject } from "@/app/services/api";
import { type Project } from "@/app/types/project";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { montserrat } from "@/app/fonts";

const formContinerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
  max-width: 600px;
  margin: 2rem auto;
  font-family: ${montserrat.style.fontFamily};
  button {
    font-family: ${montserrat.style.fontFamily};
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #bbba76;
    &:hover {
      background-color: #a9a85f;
    }
  }
`;

const formInputStyle = css`
  padding: 0.5rem;
  border: 1px solid #bbba76;
  outline: none;
  background-color: white;
  border-radius: 4px;
  font-size: 1rem;
`;

const errorMessageStyle = css`
  color: red;
  font-size: 0.875rem;
  font-weight: 500;
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

  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");

  const router = useRouter();

  const submitDisabled =
    !title || !description || !imageUrl || !!titleError || !!urlError;

  const validateTitle = (value: string) => {
    if (value.length > 50) {
      setTitleError("Title must be less than 50 characters");
    } else {
      setTitleError("");
    }
  };

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      setUrlError("");
    } catch {
      setUrlError("Please enter a valid URL");
    }
  };

  const handleSubmit = () => {
    if (titleError || urlError) return;
    const projectData: Project = {
      title,
      description,
      imageUrl,
      id: project?.id.toString() || "",
    };
    if (mode === "new") {
      createProject(projectData);
    } else {
      updateProject(projectData);
    }
    router.push("/admin");
  };
  return (
    <div css={formContinerStyle}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        css={formInputStyle}
        onChange={(e) => {
          setTitle(e.target.value);
          validateTitle(e.target.value);
        }}
      />
      {titleError && <div css={errorMessageStyle}>{titleError}</div>}
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
        onChange={(e) => {
          setImageUrl(e.target.value);
          validateUrl(e.target.value);
        }}
      />
      {urlError && <div css={errorMessageStyle}>{urlError}</div>}
      <Button onClick={handleSubmit} disabled={submitDisabled}>
        {mode === "new" ? "Create Project" : "Update Project"}
      </Button>
    </div>
  );
}
