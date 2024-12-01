import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../Store/store";  
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar Component", () => {
  it("renders input field with placeholder", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Search by name or email...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls setSearchQuery with the correct value when typing", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    
    const inputElement = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(inputElement, { target: { value: "John" } });

  
    expect(inputElement).toHaveValue("John");
  });

  it("updates the input value when typing", () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    
    const inputElement = screen.getByPlaceholderText("Search by name or email...");
    fireEvent.change(inputElement, { target: { value: "Jane" } });
    expect(inputElement).toHaveValue("Jane");
  });
});
