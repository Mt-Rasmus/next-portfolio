import { getProjects } from "@/app/services/api";
import AdminSection from "@/app/components/AdminSection";

export default async function AdminPage() {
  const projects = await getProjects();
  return <AdminSection projects={projects} />;
}
