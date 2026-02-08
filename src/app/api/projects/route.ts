import { type Project } from "@/app/types/project";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const DATA_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "data",
  "projects.json",
);

export async function getStoredProjects(): Promise<Project[]> {
  const jsonData = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(jsonData);
}

export async function GET() {
  try {
    const projects: Project[] = await getStoredProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const newProject: Project = await request.json();
    const projects: Project[] = await getStoredProjects();

    projects.push({
      ...newProject,
      id: crypto.randomUUID(), // Generate a unique ID for the new project
    });
    await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2));
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProject: Project = await request.json();
    const projects: Project[] = await getStoredProjects();
    const projectIndex = projects.findIndex(
      (project) => project.id === updatedProject.id,
    );
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    projects[projectIndex] = updatedProject;
    await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2));
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 },
      );
    }
    const projects: Project[] = await getStoredProjects();
    const projectIndex = projects.findIndex((project) => project.id === id);
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    projects.splice(projectIndex, 1);
    await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2));
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
