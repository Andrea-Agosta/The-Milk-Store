import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Search from './Search';

afterEach(cleanup);

describe('Search component', () => {
  const handleSearchInputChanges = jest.fn();
  const callSearchFunction = jest.fn();
  const mockSubmitWithEnterKey = jest.fn();

  test('it renders the form and input field', () => {
    render(<Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} submitWithEnterKey={mockSubmitWithEnterKey} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🔍/i })).toBeInTheDocument();
  });

  test('it calls the handleSearchInputChanges function when the input field is changed', () => {
    render(<Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} submitWithEnterKey={mockSubmitWithEnterKey} />);
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test' } });
    expect(handleSearchInputChanges).toHaveBeenCalled();
  });

  test('it calls the callSearchFunction function when the form is submitted by click on the icon', () => {
    render(<Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} submitWithEnterKey={mockSubmitWithEnterKey} />);
    fireEvent.submit(screen.getByRole('button', { name: /🔍/i }));
    expect(callSearchFunction).toHaveBeenCalled();
  });

  test('it calls the callSearchFunction function when the form is submitted by press enter', () => {
    render(<Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} submitWithEnterKey={mockSubmitWithEnterKey} />);
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test' } });
    fireEvent.submit(screen.getByPlaceholderText('Search'));
    expect(callSearchFunction).toHaveBeenCalled();
  });
});
