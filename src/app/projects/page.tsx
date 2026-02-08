import { getStoredProjects } from "@/app/api/projects/route";
import ProjectCard from "@/app/components/ProjectCard";

export const revalidate = 60;

export default async function Projects() {
  const projects = await getStoredProjects();
  console.log(projects);
  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
