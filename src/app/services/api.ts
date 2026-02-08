import { Project } from "../types/project";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  } else {
    return response.json();
  }
};

// export const createProject = async (project: Project) => {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(project),
//   });
//   return res.json();
// };
