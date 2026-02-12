import { getProjects } from "@/app/services/api";
import AdminPageContent from "@/app/components/AdminPageContent";
import { redirect } from "next/navigation";

// Placeholder for authentication logic
const isUserAuthenticated = () => {
  return true;
};

const AdminPage = async () => {
  if (!isUserAuthenticated()) {
    redirect("/");
  }
  const projects = await getProjects();
  return <AdminPageContent projects={projects} />;
};

export default AdminPage;
