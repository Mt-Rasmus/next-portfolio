import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminProjects from "./AdminProjects";
import { Project } from "../types/project";
import * as api from "../services/api";
import { useRouter } from "next/navigation";

jest.mock("../services/api");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../components/ProjectGrid/ProjectGrid", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="project-grid">{children}</div>
  ),
}));

jest.mock("../components/ProjectCard/ProjectCard", () => ({
  __esModule: true,
  default: ({
    project,
    onEdit,
    onDelete,
  }: {
    project: { id: string; title: string };
    onEdit: () => void;
    onDelete: () => void;
  }) => (
    <div data-testid={`project-${project.id}`}>
      <h3>{project.title}</h3>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

describe("AdminProjects Component", () => {
  const mockPush = jest.fn();
  const mockProjects: Project[] = [
    {
      id: "1",
      title: "Project 1",
      description: "Description 1",
      imageUrl: "https://example.com/1.jpg",
    },
    {
      id: "2",
      title: "Project 2",
      description: "Description 2",
      imageUrl: "https://example.com/2.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should render all projects", () => {
    render(<AdminProjects projects={mockProjects} />);

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });

  it("should navigate to edit page when edit button is clicked", () => {
    render(<AdminProjects projects={mockProjects} />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockPush).toHaveBeenCalledWith("/admin/projects/1/edit");
  });

  it("should delete project when delete button is clicked", async () => {
    (api.deleteProject as jest.Mock).mockResolvedValue({});

    render(<AdminProjects projects={mockProjects} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(api.deleteProject).toHaveBeenCalledWith("1");
      expect(screen.queryByText("Project 1")).not.toBeInTheDocument();
      expect(screen.getByText("Project 2")).toBeInTheDocument();
    });
  });

  it("should handle delete error gracefully", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation();
    (api.deleteProject as jest.Mock).mockRejectedValue(
      new Error("Delete failed"),
    );

    render(<AdminProjects projects={mockProjects} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
      expect(screen.getByText("Project 1")).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });

  it("should render empty grid when no projects", () => {
    render(<AdminProjects projects={[]} />);

    const grid = screen.getByTestId("project-grid");
    expect(grid).toBeInTheDocument();
    expect(grid.children).toHaveLength(0);
  });
});
