import { render, screen, fireEvent } from "@testing-library/react";
import StyledButton from "./StyledButton";

jest.mock("@chakra-ui/react", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    type,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }) => (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  ),
}));

describe("StyledButton Component", () => {
  it("should render children", () => {
    render(<StyledButton>Click Me</StyledButton>);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<StyledButton onClick={handleClick}>Click Me</StyledButton>);

    fireEvent.click(screen.getByText("Click Me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<StyledButton disabled>Click Me</StyledButton>);

    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
  });

  it("should have button type by default", () => {
    render(<StyledButton>Click Me</StyledButton>);

    const button = screen.getByText("Click Me");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should accept custom type", () => {
    render(<StyledButton type="submit">Submit</StyledButton>);

    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });
});
