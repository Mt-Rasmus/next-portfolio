import { getProjects } from "@/app/services/api";

export default async function Projects() {
  const projects = await getProjects();
  console.log(projects);
  return <div>Projects</div>;
}
