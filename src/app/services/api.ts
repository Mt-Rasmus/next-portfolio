import { Project } from "../types/project";

/**
 * Client-side API service for admin operations
 * Uses fetch with cache: 'no-store' for admin operations to ensure fresh data
 */

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;

export const getProjectById = async (id: string): Promise<Project | null> => {
  const response = await fetch(BASE_URL, {
    cache: "no-store", // Always fetch fresh data for dynamic pages
  });
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  const projects: Project[] = await response.json();
  return projects.find((project) => project.id === id) || null;
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(BASE_URL, {
    cache: "no-store", // Always fetch fresh data for admin
  });
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

export const deleteProject = async (id: string) => {
  const res = await fetch(`${BASE_URL}?id=${id}`, {
    method: "DELETE",
  });
  return res.json();
};
