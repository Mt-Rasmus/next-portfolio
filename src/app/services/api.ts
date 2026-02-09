import { Project } from "../types/project";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;

export const getProjectById = async (id: string): Promise<Project | null> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const projects: Project[] = await response.json();
  return projects.find((project) => project.id === id) || null;
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  } else {
    return response.json();
  }
};

export const createProject = async (project: Project) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const updateProject = async (project: Project) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const deleteProject = async (id: number) => {
  const res = await fetch(`${BASE_URL}?id=${id}`, {
    method: "DELETE",
  });
  return res.json();
};
