import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectForm from "./ProjectForm";
import { Project } from "@/app/types/project";
import * as api from "@/app/services/api";
import { useRouter } from "next/navigation";

// Mock the API services
jest.mock("@/app/services/api", () => ({
  createProject: jest.fn(),
  updateProject: jest.fn(),
}));

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Chakra UI components
jest.mock("@chakra-ui/react", () => ({
  Input: ({ onChange, value, ...props }: any) => (
    <input onChange={onChange} value={value} {...props} />
  ),
  Textarea: ({ onChange, value, ...props }: any) => (
    <textarea onChange={onChange} value={value} {...props} />
  ),
}));

// Mock StyledButton
jest.mock("../StyledButton/StyledButton", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

describe("ProjectForm Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  describe("New Project Mode", () => {
    it("should render form in new mode with empty fields", () => {
      render(<ProjectForm mode="new" />);

      expect(screen.getByPlaceholderText("Title")).toHaveValue("");
      expect(screen.getByPlaceholderText("Description")).toHaveValue("");
      expect(screen.getByPlaceholderText("Image URL (optional)")).toHaveValue(
        "",
      );
      expect(screen.getByText("Create Project")).toBeInTheDocument();
    });

    it("should enable submit button when all required fields are filled", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const titleInput = screen.getByPlaceholderText("Title");
      const descriptionInput = screen.getByPlaceholderText("Description");
      const submitButton = screen.getByText("Create Project");

      // Initially disabled
      expect(submitButton).toBeDisabled();

      // Fill in required fields
      await user.type(titleInput, "New Project");
      await user.type(descriptionInput, "New Description");

      // Should be enabled now
      expect(submitButton).not.toBeDisabled();
    });

    it("should call createProject and navigate on submit", async () => {
      const user = userEvent.setup();
      (api.createProject as jest.Mock).mockResolvedValue({});

      render(<ProjectForm mode="new" />);

      await user.type(screen.getByPlaceholderText("Title"), "New Project");
      await user.type(
        screen.getByPlaceholderText("Description"),
        "New Description",
      );

      const submitButton = screen.getByText("Create Project");
      await user.click(submitButton);

      await waitFor(() => {
        expect(api.createProject).toHaveBeenCalledWith({
          id: "",
          title: "New Project",
          description: "New Description",
          imageUrl: "",
        });
        expect(mockPush).toHaveBeenCalledWith("/admin");
      });
    });
  });

  describe("Edit Project Mode", () => {
    const existingProject: Project = {
      id: "123",
      title: "Existing Project",
      description: "Existing Description",
      imageUrl: "https://example.com/image.jpg",
    };

    it("should render form in edit mode with pre-filled fields", () => {
      render(<ProjectForm mode="edit" project={existingProject} />);

      expect(screen.getByPlaceholderText("Title")).toHaveValue(
        "Existing Project",
      );
      expect(screen.getByPlaceholderText("Description")).toHaveValue(
        "Existing Description",
      );
      expect(screen.getByPlaceholderText("Image URL (optional)")).toHaveValue(
        "https://example.com/image.jpg",
      );
      expect(screen.getByText("Update Project")).toBeInTheDocument();
    });

    it("should call updateProject and navigate on submit", async () => {
      const user = userEvent.setup();
      (api.updateProject as jest.Mock).mockResolvedValue({});

      render(<ProjectForm mode="edit" project={existingProject} />);

      const titleInput = screen.getByPlaceholderText("Title");
      await user.clear(titleInput);
      await user.type(titleInput, "Updated Project");

      const submitButton = screen.getByText("Update Project");
      await user.click(submitButton);

      await waitFor(() => {
        expect(api.updateProject).toHaveBeenCalledWith({
          id: "123",
          title: "Updated Project",
          description: "Existing Description",
          imageUrl: "https://example.com/image.jpg",
        });
        expect(mockPush).toHaveBeenCalledWith("/admin");
      });
    });
  });

  describe("Validation", () => {
    it("should show error when title exceeds 50 characters", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const titleInput = screen.getByPlaceholderText("Title");
      const longTitle = "a".repeat(51);

      await user.type(titleInput, longTitle);

      expect(
        screen.getByText("Title must be less than 50 characters"),
      ).toBeInTheDocument();
    });

    it("should clear title error when valid title is entered", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const titleInput = screen.getByPlaceholderText("Title");

      // Enter long title
      await user.type(titleInput, "a".repeat(51));
      expect(
        screen.getByText("Title must be less than 50 characters"),
      ).toBeInTheDocument();

      // Clear and enter valid title
      await user.clear(titleInput);
      await user.type(titleInput, "Valid Title");

      expect(
        screen.queryByText("Title must be less than 50 characters"),
      ).not.toBeInTheDocument();
    });

    it("should show error for invalid URL", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const urlInput = screen.getByPlaceholderText("Image URL (optional)");

      await user.type(urlInput, "invalid-url");

      expect(screen.getByText("Please enter a valid URL")).toBeInTheDocument();
    });

    it("should accept valid HTTPS URLs", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const urlInput = screen.getByPlaceholderText("Image URL (optional)");

      await user.type(urlInput, "https://example.com/image.jpg");

      expect(
        screen.queryByText("Please enter a valid URL"),
      ).not.toBeInTheDocument();
    });

    it("should not show error for empty URL field", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const urlInput = screen.getByPlaceholderText("Image URL (optional)");

      // Type and then clear
      await user.type(urlInput, "test");
      await user.clear(urlInput);

      expect(
        screen.queryByText("Please enter a valid URL"),
      ).not.toBeInTheDocument();
    });

    it("should disable submit button when validation errors exist", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const titleInput = screen.getByPlaceholderText("Title");
      const descriptionInput = screen.getByPlaceholderText("Description");
      const urlInput = screen.getByPlaceholderText("Image URL (optional)");

      await user.type(titleInput, "a".repeat(51));
      await user.type(descriptionInput, "Description");
      await user.type(urlInput, "invalid-url");

      const submitButton = screen.getByText("Create Project");
      expect(submitButton).toBeDisabled();
    });

    it("should not submit when validation errors exist", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      const titleInput = screen.getByPlaceholderText("Title");
      const descriptionInput = screen.getByPlaceholderText("Description");

      await user.type(titleInput, "a".repeat(51));
      await user.type(descriptionInput, "Description");

      const submitButton = screen.getByText("Create Project");

      // Try to click (though it should be disabled)
      fireEvent.click(submitButton);

      expect(api.createProject).not.toHaveBeenCalled();
    });
  });

  describe("Required Fields", () => {
    it("should disable submit when title is empty", () => {
      render(<ProjectForm mode="new" />);

      const submitButton = screen.getByText("Create Project");
      expect(submitButton).toBeDisabled();
    });

    it("should disable submit when description is empty", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      await user.type(screen.getByPlaceholderText("Title"), "Title");

      const submitButton = screen.getByText("Create Project");
      expect(submitButton).toBeDisabled();
    });

    it("should allow submission without imageUrl", async () => {
      const user = userEvent.setup();
      render(<ProjectForm mode="new" />);

      await user.type(screen.getByPlaceholderText("Title"), "Title");
      await user.type(
        screen.getByPlaceholderText("Description"),
        "Description",
      );

      const submitButton = screen.getByText("Create Project");
      expect(submitButton).not.toBeDisabled();
    });
  });
});
