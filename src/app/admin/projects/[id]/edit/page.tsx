import ProjectForm from "@/app/components/ProjectForm";
import { getProjectById } from "@/app/services/api";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const projectParams = await params;
  const project = await getProjectById(projectParams.id);
  if (!project) {
    return <div>Project not found</div>;
  }
  return <ProjectForm mode="edit" project={project} />;
}
