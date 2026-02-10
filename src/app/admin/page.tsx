import { getProjects } from "@/app/services/api";
import AdminPageContent from "@/app/components/AdminPageContent";

export default async function AdminPage() {
  const projects = await getProjects();
  return <AdminPageContent projects={projects} />;
}
