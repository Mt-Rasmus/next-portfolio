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
