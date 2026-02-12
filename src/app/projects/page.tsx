import { getStoredProjects } from "@/app/api/projects/route";
import ProjectCard from "@/app/components/ProjectCard";
import Link from "next/link";
import ProjectGrid from "@/app/components/ProjectGrid";

export const revalidate = 60;

const Projects = async () => {
  const projects = await getStoredProjects();
  return (
    <ProjectGrid>
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <ProjectCard project={project} mode="public" />
        </Link>
      ))}
    </ProjectGrid>
  );
};

export default Projects;
