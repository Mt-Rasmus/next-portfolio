import ProjectForm from "@/app/components/ProjectForm";

/**
 * RENDERING STRATEGY: Static Site Generation (SSG)
 * - Simple form page with no dynamic data
 * - Can be pre-rendered for fast initial load
 * - Form submission handled client-side via API routes
 */

const NewProjectPage = () => {
  return <ProjectForm mode="new" />;
};

export default NewProjectPage;
