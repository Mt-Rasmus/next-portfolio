import { render, screen } from "@testing-library/react";
import ProjectPageContent from "./ProjectPageContent";
import { Project } from "../../types/project";

// Mock SmartImage component
jest.mock("../SmartImage/SmartImage", () => {
  return function MockSmartImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} data-testid="smart-image" />;
  };
});

describe("ProjectPageContent Component", () => {
  const mockProject: Project = {
    id: "1",
    title: "Test Project",
    description: "This is a test project description",
    imageUrl: "https://example.com/image.jpg",
  };

  it("should render project title", () => {
    render(<ProjectPageContent project={mockProject} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("should render project description", () => {
    render(<ProjectPageContent project={mockProject} />);

    expect(
      screen.getByText("This is a test project description"),
    ).toBeInTheDocument();
  });

  it("should render project image", () => {
    render(<ProjectPageContent project={mockProject} />);

    const image = screen.getByTestId("smart-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProject.imageUrl);
    expect(image).toHaveAttribute("alt", mockProject.title);
  });

  it("should display 'Project not found' when project is null", () => {
    render(<ProjectPageContent project={null as any} />);

    expect(screen.getByText("Project not found")).toBeInTheDocument();
  });

  it("should render all project details correctly", () => {
    render(<ProjectPageContent project={mockProject} />);

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByTestId("smart-image")).toBeInTheDocument();
  });
});
