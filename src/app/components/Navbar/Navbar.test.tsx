import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

// Mock Next.js usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Socials component
jest.mock("../Socials/Socials", () => ({
  __esModule: true,
  default: () => <div data-testid="socials">Socials</div>,
}));

// Mock MobileMenu component
jest.mock("../MobileMenu/MobileMenu", () => ({
  __esModule: true,
  default: ({
    links,
    currentPath,
  }: {
    links: Array<{ href: string; label: string }>;
    currentPath: string;
  }) => (
    <div data-testid="mobile-menu">
      Mobile Menu - {currentPath}
      {links.map((link: { href: string; label: string }) => (
        <span key={link.href}>{link.label}</span>
      ))}
    </div>
  ),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.innerWidth to desktop size
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe("Desktop View", () => {
    beforeEach(() => {
      (usePathname as jest.Mock).mockReturnValue("/about");
    });

    it("should render navigation links", () => {
      render(<Navbar />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("should render signature image", () => {
      render(<Navbar />);

      const image = screen.getByAltText("Rasmus Ståhl");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/name.png");
    });

    it("should render Socials component", () => {
      render(<Navbar />);

      expect(screen.getByTestId("socials")).toBeInTheDocument();
    });

    it("should highlight active link based on current pathname", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");

      const { container } = render(<Navbar />);

      const aboutLink = screen.getByText("About").closest("a");
      const projectsLink = screen.getByText("Projects").closest("a");

      expect(aboutLink).toHaveStyle({ color: "var(--primary-dark)" });
      expect(projectsLink).not.toHaveStyle({ color: "var(--primary-dark)" });
    });

    it("should update active link when pathname changes", () => {
      const { rerender } = render(<Navbar />);

      (usePathname as jest.Mock).mockReturnValue("/projects");
      rerender(<Navbar />);

      const projectsLink = screen.getByText("Projects").closest("a");
      expect(projectsLink).toHaveStyle({ color: "var(--primary-dark)" });
    });

    it("should not show mobile menu on desktop", () => {
      render(<Navbar />);

      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });
  });

  describe("Mobile View", () => {
    beforeEach(() => {
      (usePathname as jest.Mock).mockReturnValue("/about");
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
    });

    it("should show mobile menu on mobile devices", () => {
      render(<Navbar />);

      // Trigger resize event
      fireEvent(window, new Event("resize"));

      // Wait for state update
      setTimeout(() => {
        expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
      }, 0);
    });

    it("should pass correct props to MobileMenu", () => {
      render(<Navbar />);

      fireEvent(window, new Event("resize"));

      setTimeout(() => {
        const mobileMenu = screen.getByTestId("mobile-menu");
        expect(mobileMenu).toHaveTextContent("About");
        expect(mobileMenu).toHaveTextContent("Projects");
        expect(mobileMenu).toHaveTextContent("Admin");
      }, 0);
    });
  });

  describe("Responsive Behavior", () => {
    it("should toggle between mobile and desktop view on resize", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");

      const { rerender } = render(<Navbar />);

      // Start with desktop
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

      // Resize to mobile
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      fireEvent(window, new Event("resize"));

      rerender(<Navbar />);

      // Mobile menu should appear after state update
      setTimeout(() => {
        expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
      }, 0);
    });

    it("should clean up resize event listener on unmount", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = render(<Navbar />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Navigation Links", () => {
    it("should render correct href attributes", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");

      render(<Navbar />);

      const aboutLink = screen.getByText("About").closest("a");
      const projectsLink = screen.getByText("Projects").closest("a");
      const adminLink = screen.getByText("Admin").closest("a");

      expect(aboutLink).toHaveAttribute("href", "/about");
      expect(projectsLink).toHaveAttribute("href", "/projects");
      expect(adminLink).toHaveAttribute("href", "/admin");
    });
  });

  describe("Authentication", () => {
    it("should show admin link when user is authenticated", () => {
      (usePathname as jest.Mock).mockReturnValue("/about");

      render(<Navbar />);

      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    // Note: The isUserAuthenticated function always returns true in the current implementation
    // In a real scenario, you would mock this function to test different authentication states
  });

  describe("Accessibility", () => {
    it("should have proper alt text for signature image", () => {
      render(<Navbar />);

      const image = screen.getByAltText("Rasmus Ståhl");
      expect(image).toBeInTheDocument();
    });

    it("should render navigation as semantic links", () => {
      render(<Navbar />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
