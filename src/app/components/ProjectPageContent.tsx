import { Project } from "../types/project";

export default async function ProjectPageContent({
  project,
}: {
  project: Project;
}) {
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <img src={project.imageUrl} alt={project.title} />
    </div>
  );
}
