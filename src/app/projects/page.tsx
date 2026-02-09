import { getStoredProjects } from "@/app/api/projects/route";
import ProjectCard from "@/app/components/ProjectCard";
import Link from "next/link";

export const revalidate = 60;

export default async function Projects() {
  const projects = await getStoredProjects();
  console.log(projects);
  return (
    <div>
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <ProjectCard key={project.id} project={project} />
        </Link>
      ))}
    </div>
  );
}
