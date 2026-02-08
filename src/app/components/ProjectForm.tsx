"use client";
import { createProject, updateProject } from "@/app/services/api";
import { type Project } from "@/app/types/project";

export default function ProjectForm({
  mode,
  id,
}: {
  mode?: "new" | "edit";
  id?: string;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageURL") as string;
    if (mode === "new") {
      createProject({ title, description, imageUrl } as Project);
    } else {
      updateProject({ id, title, description, imageUrl } as Project);
    }
    console.log({ title, description, imageUrl });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" />
      <textarea name="description" placeholder="Description"></textarea>
      <input type="text" name="imageURL" placeholder="Image URL" />
      <button type="submit">
        {mode === "new" ? "Create Project" : "Update Project"}
      </button>
    </form>
  );
}
