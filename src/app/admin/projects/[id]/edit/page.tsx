import ProjectForm from "@/app/components/ProjectForm";
import { getProjectById } from "@/app/services/api";

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectForm mode="edit" project={project} />;
};

export default EditProjectPage;
