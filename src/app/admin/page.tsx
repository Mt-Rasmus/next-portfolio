import { getProjects } from "@/app/services/api";
import AdminPageContent from "@/app/components/AdminPageContent/AdminPageContent";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

/**
 * RENDERING STRATEGY: Server-Side Rendering (SSR) with dynamic rendering
 * - Requires authentication check on every request (though not implemented)
 * - Always fetches fresh data (no caching)
 * - Export dynamic = 'force-dynamic' ensures no static optimization
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Portfolio Management",
  description: "Manage portfolio projects and content.",
};

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
