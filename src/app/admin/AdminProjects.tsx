"use client";
import { deleteProject } from "@/app/services/api";
import ProjectGrid from "../components/ProjectGrid";
import ProjectCard from "../components/ProjectCard";
import { useRouter } from "next/navigation";
import { Project } from "../types/project";
import { useState } from "react";

const AdminProjects = ({ projects }: { projects: Project[] }) => {
  const router = useRouter();

  const [projectList, setProjectList] = useState<Project[]>(projects);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjectList((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  return (
    <div>
      <ProjectGrid>
        {projectList.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            mode="admin"
            onEdit={() => router.push(`/admin/projects/${project.id}/edit`)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </ProjectGrid>
    </div>
  );
};

export default AdminProjects;
