import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const page = {
    current: 2,
    last: 5
  }

  const changePage = jest.fn();

  it('renders the pagination with the correct information', () => {
    render(<Pagination page={page} changePage={changePage} />);

    // check if the prev button is displayed
    const prevButton = screen.getByRole('button', { name: '<' });
    expect(prevButton).toBeInTheDocument();

    // check if the current page is displayed
    const currentPage = screen.getByText(`${page.current}`);
    expect(currentPage).toBeInTheDocument();

    // check if the last page is displayed
    const lastPage = screen.getByText(`${page.last}`);
    expect(lastPage).toBeInTheDocument();

    // check if the next button is displayed
    const nextButton = screen.getByRole('button', { name: '>' });
    expect(nextButton).toBeInTheDocument();
  });

  it('check if the changePage function is called when the prev button is clicked', () => {
    render(<Pagination page={page} changePage={changePage} />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));
    expect(changePage).toHaveBeenCalled();
  });

  it('check if the changePage function is called when the next button is clicked', () => {
    render(<Pagination page={page} changePage={changePage} />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));
    expect(changePage).toHaveBeenCalled();
  });

  it('check if the changePage function is called when the last page is clicked', () => {
    render(<Pagination page={page} changePage={changePage} />);

    fireEvent.click(screen.getByText(`${page.last}`));
    expect(changePage).toHaveBeenCalled();
  });
});
