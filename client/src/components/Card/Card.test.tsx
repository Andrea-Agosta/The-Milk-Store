import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

afterEach(cleanup);

describe('Card component', () => {
  it('renders the card with the correct information', () => {
    const milk = {
      "name": "Joan's full pea milk",
      "type": "Pea milk",
      "storage": 67,
      "id": "2702fab9-db1c-44bf-a43f-9107cf21e499"
    }

    render(
      <MemoryRouter>
        <Card milk={milk} />
      </MemoryRouter>
    );

    // check if the link to the milk detail page is correct
    const link = screen.getByTestId('linkCard');
    expect(link).toHaveAttribute('href', `/milk/${milk.id}`);

    // check if the milk image is displayed
    const image = screen.getByRole('img', { name: 'milk' });
    expect(image).toBeInTheDocument();

    // check if the milk name is displayed
    const milkName = screen.getByText(milk.name);
    expect(milkName).toBeInTheDocument();

    // check if the milk type is displayed
    const milkType = screen.getByText(milk.type);
    expect(milkType).toBeInTheDocument();

    // check if the milk storage is displayed
    const milkStorage = screen.getByText(`${milk.storage} liter`);
    expect(milkStorage).toBeInTheDocument();
    expect(milkStorage).toHaveClass('text-green-500');
  });

  it('renders the card with the red text of amount of liter', () => {
    const milk = {
      "name": "Joan's full pea milk",
      "type": "Pea milk",
      "storage": 4,
      "id": "2702fab9-db1c-44bf-a43f-9107cf21e499"
    }

    render(
      <MemoryRouter>
        <Card milk={milk} />
      </MemoryRouter>
    );

    const milkStorage = screen.getByText(`${milk.storage} liter`);
    expect(milkStorage).toBeInTheDocument();
    expect(milkStorage).toHaveClass('text-red-500');
  });

});
