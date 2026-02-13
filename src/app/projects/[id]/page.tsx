import { getProjectById } from "@/app/services/api";
import ProjectPageContent from "@/app/components/ProjectPageContent/ProjectPageContent";
import { getStoredProjects } from "@/app/api/projects/route";
import { getImage } from "@/helpers/getImage";
/**
 * RENDERING STRATEGY: Static Site Generation (SSG) with ISR
 * - Uses generateStaticParams to pre-render all project pages at build time
 * - Provides instant page loads and optimal SEO
 * - ISR allows updates without full rebuild (revalidate inherited from parent)
 */

// Generate static paths for all projects at build time
export async function generateStaticParams() {
  const projects = await getStoredProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

const ProjectPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  // Generate blur placeholder for images
  let blurDataURL: string | undefined;
  let imageWidth: number | undefined;
  let imageHeight: number | undefined;
  try {
    const imageData = await getImage(project.imageUrl);
    blurDataURL = imageData.base64;
    imageWidth = imageData.img.width;
    imageHeight = imageData.img.height;
  } catch (error) {
    console.error("Failed to generate blur placeholder:", error);
  }

  return (
    <ProjectPageContent
      project={project}
      blurDataURL={blurDataURL}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
    />
  );
};

export default ProjectPage;
