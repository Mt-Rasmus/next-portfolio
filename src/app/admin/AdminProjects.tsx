"use client";
import { deleteProject } from "@/app/services/api";
import ProjectGrid from "../components/ProjectGrid";
import ProjectCard from "../components/ProjectCard";
import { useRouter } from "next/navigation";
import { Project } from "../types/project";

export default function AdminPage({ projects }: { projects: Project[] }) {
  const router = useRouter();
  return (
    <div>
      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            mode="admin"
            onEdit={() => router.push(`/admin/projects/${project.id}/edit`)}
            onDelete={() => deleteProject(project.id)}
          />
        ))}
      </ProjectGrid>
    </div>
  );
}
