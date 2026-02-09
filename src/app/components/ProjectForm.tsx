"use client";
import { createProject, updateProject } from "@/app/services/api";
import { type Project } from "@/app/types/project";
import { useState } from "react";

export default function ProjectForm({
  mode,
  project,
}: {
  mode?: "new" | "edit";
  project?: Project;
}) {
  console.log(project, mode);
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">
        {mode === "new" ? "Create Project" : "Update Project"}
      </button>
    </form>
  );
}
