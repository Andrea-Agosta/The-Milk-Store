import { fireEvent, render, screen, within } from "@testing-library/react";
import DropDown from "./Dropdown";

describe("Dropdown", () => {

  const mockMilkCategory: string[] = ['test', 'testMilk', 'testNewMilk'];

  it("should render dropdown", async () => {
    render(<DropDown milkCategory={mockMilkCategory} />);
    const buttonElement = screen.getByTestId('dropdown');
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render element when the button is clicked", async () => {
    render(<DropDown milkCategory={mockMilkCategory} />);
    const buttonElement = screen.getByTestId('dropdown');
    expect(screen.queryByText('test')).toBeNull();
    expect(screen.queryByTestId('checkbox0')).toBeNull();
    expect(screen.queryByText('testMilk')).toBeNull();
    expect(screen.queryByTestId('checkbox1')).toBeNull();
    expect(screen.queryByText('testNewMilk')).toBeNull();
    expect(screen.queryByTestId('checkbox2')).toBeNull();
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('checkbox0')).toBeVisible();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('testMilk')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox1')).toBeVisible();
    expect(screen.getByText('testNewMilk')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox2')).toBeVisible();
  });

  it('should hide menu items when button is clicked again', () => {
    render(<DropDown milkCategory={mockMilkCategory} />);
    const buttonElement = screen.getByTestId('dropdown');
    expect(screen.queryByText('test')).toBeNull();
    expect(screen.queryByTestId('checkbox0')).toBeNull();
    expect(screen.queryByText('testMilk')).toBeNull();
    expect(screen.queryByTestId('checkbox1')).toBeNull();
    expect(screen.queryByText('testNewMilk')).toBeNull();
    expect(screen.queryByTestId('checkbox2')).toBeNull();
    fireEvent.click(buttonElement);
    expect(screen.getByTestId('checkbox0')).toBeVisible();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('testMilk')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox1')).toBeVisible();
    expect(screen.getByText('testNewMilk')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox2')).toBeVisible();
    fireEvent.click(buttonElement);
    expect(screen.queryByText('test')).toBeNull();
    expect(screen.queryByTestId('checkbox0')).toBeNull();
    expect(screen.queryByText('testMilk')).toBeNull();
    expect(screen.queryByTestId('checkbox1')).toBeNull();
    expect(screen.queryByText('testNewMilk')).toBeNull();
    expect(screen.queryByTestId('checkbox2')).toBeNull();
  });

  it('should checkbox is clickable', () => {
    render(<DropDown milkCategory={mockMilkCategory} />);
    fireEvent.click(screen.getByTestId('dropdown'));
    const checkbox = screen.getByTestId(`checkbox0`) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  // add test on functionality when are implemented

});