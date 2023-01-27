import { render, screen } from '@testing-library/react';
import Header from './Header';


describe('Header component', () => {
  it('should render correctly', () => {
    render(<Header />);
    const container = screen.getByText(/the milk store/i)
    expect(container).toMatchSnapshot();
  });
});