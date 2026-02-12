import { render, screen, fireEvent } from "@testing-library/react";
import MobileMenu from "./MobileMenu";

jest.mock("../Socials/Socials", () => ({
  __esModule: true,
  default: () => <div data-testid="socials">Socials</div>,
}));

describe("MobileMenu Component", () => {
  const mockLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/admin", label: "Admin" },
  ];

  it("should render menu button", () => {
    render(<MobileMenu links={mockLinks} currentPath="/about" />);

    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("should open menu when button is clicked", () => {
    render(<MobileMenu links={mockLinks} currentPath="/about" />);

    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should close menu when close button is clicked", () => {
    render(<MobileMenu links={mockLinks} currentPath="/about" />);

    // Open menu
    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    // Close menu
    const closeButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeButton);

    // Menu links should not be visible
    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0);
  });

  it("should highlight active link", () => {
    render(<MobileMenu links={mockLinks} currentPath="/projects" />);

    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    const projectsLink = screen.getByText("Projects").closest("a");
    expect(projectsLink).toHaveStyle({ color: "var(--primary-dark)" });
  });

  it("should render social links in menu", () => {
    render(<MobileMenu links={mockLinks} currentPath="/about" />);

    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    expect(screen.getByTestId("socials")).toBeInTheDocument();
  });

  it("should close menu when link is clicked", () => {
    render(<MobileMenu links={mockLinks} currentPath="/about" />);

    // Open menu
    const menuButton = screen.getByLabelText("Open menu");
    fireEvent.click(menuButton);

    // Click a link
    const aboutLink = screen.getByText("About");
    fireEvent.click(aboutLink);

    // Menu should be closed
    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0);
  });
});
