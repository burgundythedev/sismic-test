import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar"; 
import "@testing-library/jest-dom";

describe("SearchBar Component", () => {
  it("renders input field with placeholder", () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search by name or email...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onSearch with the correct value when typing", () => {
    const mockOnSearch = jest.fn(); 
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(inputElement, { target: { value: "John" } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("John");
  });

  it("updates the input value when typing", () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search by name or email...");

    fireEvent.change(inputElement, { target: { value: "Jane" } });
    expect(inputElement).toHaveValue("Jane");
  });
});
