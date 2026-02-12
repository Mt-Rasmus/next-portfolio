import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./api";
import { Project } from "@/app/types/project";

// Mock global fetch
global.fetch = jest.fn();

describe("API Service Functions", () => {
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "Project One",
      description: "First project description",
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      id: "2",
      title: "Project Two",
      description: "Second project description",
      imageUrl: "https://example.com/image2.jpg",
    },
  ];

  const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProjects", () => {
    it("should fetch and return all projects successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      });

      const result = await getProjects();

      expect(result).toEqual(mockProjects);
      expect(global.fetch).toHaveBeenCalledWith(BASE_URL, {
        cache: "no-store",
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("should throw error when fetch fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getProjects()).rejects.toThrow("Failed to fetch projects");
    });

    it("should throw error when network error occurs", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error"),
      );

      await expect(getProjects()).rejects.toThrow("Network error");
    });
  });

  describe("getProjectById", () => {
    it("should fetch and return a specific project by id", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      });

      const result = await getProjectById("1");

      expect(result).toEqual(mockProjects[0]);
      expect(global.fetch).toHaveBeenCalledWith(BASE_URL, {
        cache: "no-store",
      });
    });

    it("should return null when project with id is not found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      });

      const result = await getProjectById("999");

      expect(result).toBeNull();
    });

    it("should throw error when fetch fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getProjectById("1")).rejects.toThrow(
        "Failed to fetch projects",
      );
    });
  });

  describe("createProject", () => {
    it("should create a new project successfully", async () => {
      const newProject: Project = {
        id: "3",
        title: "New Project",
        description: "New project description",
        imageUrl: "https://example.com/new.jpg",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => newProject,
      });

      const result = await createProject(newProject);

      expect(result).toEqual(newProject);
      expect(global.fetch).toHaveBeenCalledWith(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
    });

    it("should handle creation errors gracefully", async () => {
      const newProject: Project = {
        id: "3",
        title: "New Project",
        description: "New project description",
        imageUrl: "https://example.com/new.jpg",
      };

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Server error"),
      );

      await expect(createProject(newProject)).rejects.toThrow("Server error");
    });
  });

  describe("updateProject", () => {
    it("should update an existing project successfully", async () => {
      const updatedProject: Project = {
        id: "1",
        title: "Updated Project",
        description: "Updated description",
        imageUrl: "https://example.com/updated.jpg",
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedProject,
      });

      const result = await updateProject(updatedProject);

      expect(result).toEqual(updatedProject);
      expect(global.fetch).toHaveBeenCalledWith(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
    });

    it("should handle update errors gracefully", async () => {
      const updatedProject: Project = {
        id: "1",
        title: "Updated Project",
        description: "Updated description",
        imageUrl: "https://example.com/updated.jpg",
      };

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Update failed"),
      );

      await expect(updateProject(updatedProject)).rejects.toThrow(
        "Update failed",
      );
    });
  });

  describe("deleteProject", () => {
    it("should delete a project successfully", async () => {
      const deleteResponse = { message: "Project deleted" };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => deleteResponse,
      });

      const result = await deleteProject("1");

      expect(result).toEqual(deleteResponse);
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}?id=1`, {
        method: "DELETE",
      });
    });

    it("should handle deletion errors gracefully", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Deletion failed"),
      );

      await expect(deleteProject("1")).rejects.toThrow("Deletion failed");
    });
  });
});
