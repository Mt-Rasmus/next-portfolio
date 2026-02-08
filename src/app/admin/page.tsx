import { getProjects } from "@/app/services/api";
import Link from "next/link";

export default async function AdminPage() {
  const projects = await getProjects();
  console.log(projects);
  return (
    <div>
      <Link href="/admin/projects/new">Create New Project</Link>
      {projects.map((project) => (
        <Link key={project.id} href={`/admin/projects/${project.id}/edit`}>
          <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            {/* <img src={project.src} alt={project.title} /> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
