import { getStoredProjects } from "@/app/api/projects/route";
import ProjectCard from "@/app/components/ProjectCard";
import Link from "next/link";
import ProjectGrid from "@/app/components/ProjectGrid";
import type { Metadata } from "next";

/**
 * RENDERING STRATEGY: Incremental Static Regeneration (ISR)
 * - Pre-rendered at build time like SSG
 * - Automatically revalidates every 60 seconds
 * - Balances static performance with content freshness
 * - Users get fast static pages, but changes appear within 60s
 */

export const metadata: Metadata = {
  title: "Projects | Portfolio Rasmus Ståhl",
  description: "Browse through my web development projects and portfolio work.",
};

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
