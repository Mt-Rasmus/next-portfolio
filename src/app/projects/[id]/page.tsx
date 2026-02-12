import { getProjectById } from "@/app/services/api";
import ProjectPageContent from "@/app/components/ProjectPageContent";

const ProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }
  return <ProjectPageContent project={project} />;
};

export default ProjectPage;
