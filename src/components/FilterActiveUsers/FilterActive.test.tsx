import { render, screen, fireEvent } from "@testing-library/react";
import FilterActive from "./FilterActive";
import "@testing-library/jest-dom";

describe("FilterActive Component", () => {
  it("renders with the correct button label when showActiveOnly is false", () => {
    render(<FilterActive showActiveOnly={false} onFilterChange={() => {}} />);
    const buttonElement = screen.getByRole("button", { name: /Display Active Users/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with the correct button label when showActiveOnly is true", () => {
    render(<FilterActive showActiveOnly={true} onFilterChange={() => {}} />);
    const buttonElement = screen.getByRole("button", { name: /Display All Users/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onFilterChange with the correct value when the button is clicked", () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterActive showActiveOnly={false} onFilterChange={mockOnFilterChange} />);

    const buttonElement = screen.getByRole("button", { name: /Display Active Users/i });
    fireEvent.click(buttonElement);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith(true); 
  });

  it("toggles to the correct state when clicked", () => {
    const mockOnFilterChange = jest.fn();
    render(<FilterActive showActiveOnly={true} onFilterChange={mockOnFilterChange} />);

    const buttonElement = screen.getByRole("button", { name: /Display All Users/i });
    fireEvent.click(buttonElement);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith(false);
  });
});
