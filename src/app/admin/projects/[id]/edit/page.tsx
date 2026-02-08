import ProjectForm from "@/app/components/ProjectForm";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProjectForm mode="edit" id={params.id} />;
}
