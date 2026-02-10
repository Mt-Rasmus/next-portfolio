import { getProjects } from "@/app/services/api";
import Link from "next/link";
import AdminProjects from "./AdminProjects";

export default async function AdminPage() {
  const projects = await getProjects();
  return (
    <div>
      <Link href="/admin/projects/new">Create New Project</Link>
      <AdminProjects projects={projects} />
    </div>
  );
}
