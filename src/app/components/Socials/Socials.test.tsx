import { render, screen } from "@testing-library/react";
import Socials from "./Socials";

describe("Socials Component", () => {
  it("should render all social links", () => {
    render(<Socials />);

    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("should have correct href attributes", () => {
    render(<Socials />);

    expect(screen.getByLabelText("GitHub")).toHaveAttribute(
      "href",
      "https://github.com/Mt-Rasmus",
    );
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/rasmus-ståhl",
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "href",
      "mailto:rasmus.stahl.47@gmail.com",
    );
  });

  it("should render with normal size by default", () => {
    const { container } = render(<Socials />);

    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveStyle({ fontSize: "1.25rem" });
    });
  });

  it("should render with large size when specified", () => {
    const { container } = render(<Socials size="large" />);

    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveStyle({ fontSize: "2rem" });
    });
  });

  it("should have security attributes on external links", () => {
    render(<Socials />);

    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
