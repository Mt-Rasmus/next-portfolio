import { getProjects } from "@/app/services/api";
import AdminPageContent from "@/app/components/AdminPageContent";
import { redirect } from "next/navigation";

// Placeholder for authentication logic
const isUserAuthenticated = () => {
  return true;
};

export default async function AdminPage() {
  if (!isUserAuthenticated()) {
    redirect("/");
  }
  const projects = await getProjects();
  return <AdminPageContent projects={projects} />;
}
