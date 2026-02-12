import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("should render current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(`© ${currentYear}`)).toBeInTheDocument();
  });

  it("should render GitHub link", () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/Mt-Rasmus");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("should render LinkedIn link", () => {
    render(<Footer />);

    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/rasmus-ståhl",
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("should render Email link", () => {
    render(<Footer />);

    const emailLink = screen.getByLabelText("Email");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:rasmus.stahl.47@gmail.com",
    );
  });

  it("should have proper security attributes on external links", () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
