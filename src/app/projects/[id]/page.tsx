import { getProjectById } from "@/app/services/api";

export default async function ProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const project = await getProjectById(id);

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
