import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product from '../Product';

describe('Product', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    expect(screen.getByText('< Back')).toBeInTheDocument();
    expect(screen.getByAltText('milk')).toBeInTheDocument();
    // expect(screen.getByText(`${milk.name}`)).toBeInTheDocument();
    // expect(screen.getByText(`${milk.type}`)).toBeInTheDocument();
    // expect(screen.getByText(`${milk.storage} liter`)).toBeInTheDocument();
    expect(screen.getByTestId('rangeSelect')).toBeInTheDocument();
    expect(screen.getByTestId('quantityOrder')).toBeInTheDocument();
    expect(screen.getByText('Order')).toBeInTheDocument();
  });

  it('should change range value', () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );
    const rangeInput = screen.getByTestId('rangeSelect') as HTMLInputElement;;
    fireEvent.change(rangeInput, { target: { value: 3 } });
    expect(rangeInput.value).toBe('3');
  });
});
