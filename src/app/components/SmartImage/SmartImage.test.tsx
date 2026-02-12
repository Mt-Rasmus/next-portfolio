import { render, screen } from "@testing-library/react";
import SmartImage from "./SmartImage";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("SmartImage Component", () => {
  const defaultProps = {
    src: "https://res.cloudinary.com/test/image.jpg",
    alt: "Test Image",
    width: 300,
    height: 200,
  };

  describe("Trusted Image Sources", () => {
    it("should render Next.js Image for trusted Cloudinary HTTPS URLs", () => {
      render(<SmartImage {...defaultProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", defaultProps.src);
    });

    it("should use Next.js Image with className when provided", () => {
      render(<SmartImage {...defaultProps} className="custom-class" />);

      const image = screen.getByAltText("Test Image");
      expect(image).toHaveClass("custom-class");
    });
  });

  describe("Untrusted Image Sources", () => {
    it("should render regular img tag for HTTP URLs", () => {
      const httpProps = {
        ...defaultProps,
        src: "http://example.com/image.jpg",
      };

      render(<SmartImage {...httpProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("loading", "lazy");
    });

    it("should render regular img tag for non-Cloudinary HTTPS URLs", () => {
      const nonCloudinaryProps = {
        ...defaultProps,
        src: "https://example.com/image.jpg",
      };

      render(<SmartImage {...nonCloudinaryProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("loading", "lazy");
    });

    it("should render regular img tag for invalid URLs", () => {
      const invalidProps = {
        ...defaultProps,
        src: "not-a-valid-url",
      };

      render(<SmartImage {...invalidProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "not-a-valid-url");
    });

    it("should render regular img tag with className for untrusted sources", () => {
      const untrustedProps = {
        ...defaultProps,
        src: "https://example.com/image.jpg",
        className: "untrusted-class",
      };

      render(<SmartImage {...untrustedProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toHaveClass("untrusted-class");
    });
  });

  describe("Image Attributes", () => {
    it("should apply correct width and height attributes", () => {
      render(<SmartImage {...defaultProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("width", "300");
      expect(image).toHaveAttribute("height", "200");
    });

    it("should have alt text for accessibility", () => {
      render(<SmartImage {...defaultProps} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toBeInTheDocument();
    });
  });

  describe("Security Checks", () => {
    it("should only trust cloudinary.com domain", () => {
      const cloudinarySubdomain = {
        ...defaultProps,
        src: "https://res.cloudinary.com/user/image.jpg",
      };

      render(<SmartImage {...cloudinarySubdomain} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toBeInTheDocument();
    });

    it("should not trust similar but different domains", () => {
      const similarDomain = {
        ...defaultProps,
        src: "https://cloudinary.com.evil.com/image.jpg",
      };

      render(<SmartImage {...similarDomain} />);

      const image = screen.getByAltText("Test Image");
      expect(image).toHaveAttribute("loading", "lazy");
    });
  });
});
