import ProjectForm from "@/app/components/ProjectForm/ProjectForm";
import { getProjectById } from "@/app/services/api";

/**
 * RENDERING STRATEGY: Server-Side Rendering (SSR)
 * - Dynamic route requiring authentication
 * - Always fetches latest project data on each request
 * - No static generation for admin editing functionality
 * Why not SSG or ISR?
 * - Admin editing is infrequent - performance less critical
 * - SSR Always guarantees the absolute latest data
 */

export const dynamic = "force-dynamic";

const EditProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectForm mode="edit" project={project} />;
};

export default EditProjectPage;
