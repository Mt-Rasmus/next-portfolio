import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/app/types/project";

// Mock SmartImage component
jest.mock("../SmartImage/SmartImage", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="smart-image" />
  ),
}));

describe("ProjectCard Component", () => {
  const mockProject: Project = {
    id: "1",
    title: "Test Project",
    description: "Test Description",
    imageUrl: "https://example.com/image.jpg",
  };

  describe("Public Mode", () => {
    it("should render project card in public mode", () => {
      render(<ProjectCard project={mockProject} mode="public" />);

      expect(screen.getByText("Test Project")).toBeInTheDocument();
      expect(screen.getByAltText("Test Project")).toBeInTheDocument();
    });

    it("should not show edit and delete buttons in public mode", () => {
      render(<ProjectCard project={mockProject} mode="public" />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should render SmartImage with correct props", () => {
      render(<ProjectCard project={mockProject} mode="public" />);

      const image = screen.getByTestId("smart-image");
      expect(image).toHaveAttribute("src", mockProject.imageUrl);
      expect(image).toHaveAttribute("alt", mockProject.title);
    });

    it("should not render image when imageUrl is empty", () => {
      const projectWithoutImage = { ...mockProject, imageUrl: "" };
      render(<ProjectCard project={projectWithoutImage} mode="public" />);

      expect(screen.queryByTestId("smart-image")).not.toBeInTheDocument();
    });
  });

  describe("Admin Mode", () => {
    it("should render project card in admin mode", () => {
      render(<ProjectCard project={mockProject} mode="admin" />);

      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("should show edit and delete buttons in admin mode", () => {
      render(<ProjectCard project={mockProject} mode="admin" />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    it("should call onEdit when edit button is clicked", () => {
      const onEdit = jest.fn();
      render(
        <ProjectCard
          project={mockProject}
          mode="admin"
          onEdit={onEdit}
          onDelete={() => {}}
        />,
      );

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[0]); // First button is edit

      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it("should call onDelete when delete button is clicked", () => {
      const onDelete = jest.fn();
      render(
        <ProjectCard
          project={mockProject}
          mode="admin"
          onEdit={() => {}}
          onDelete={onDelete}
        />,
      );

      const buttons = screen.getAllByRole("button");
      fireEvent.click(buttons[1]); // Second button is delete

      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it("should toggle overlay visibility on card click in admin mode", () => {
      const { container } = render(
        <ProjectCard project={mockProject} mode="admin" />,
      );

      const card = container.firstChild as HTMLElement;
      const overlay = container.querySelector(".project-overlay");

      // Initially overlay should not have opacity: 1
      expect(overlay).not.toHaveStyle({ opacity: 1 });

      // Click to show overlay
      fireEvent.click(card);
      expect(overlay).toHaveStyle({ opacity: 1 });

      // Click again to hide overlay
      fireEvent.click(card);
      expect(overlay).not.toHaveStyle({ opacity: 1 });
    });

    it("should not toggle overlay on card click in public mode", () => {
      const { container } = render(
        <ProjectCard project={mockProject} mode="public" />,
      );

      const card = container.firstChild as HTMLElement;

      // Click should not affect anything in public mode
      fireEvent.click(card);

      // Verify no overlay exists
      expect(
        container.querySelector(".project-overlay"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Default Props", () => {
    it("should work with default onEdit and onDelete functions", () => {
      render(<ProjectCard project={mockProject} mode="admin" />);

      const buttons = screen.getAllByRole("button");

      // Should not throw error when clicking with default handlers
      expect(() => {
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
      }).not.toThrow();
    });
  });

  describe("Accessibility", () => {
    it("should have accessible image alt text", () => {
      render(<ProjectCard project={mockProject} mode="public" />);

      expect(screen.getByAltText("Test Project")).toBeInTheDocument();
    });

    it("should render heading with project title", () => {
      render(<ProjectCard project={mockProject} mode="public" />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Test Project");
    });
  });
});
