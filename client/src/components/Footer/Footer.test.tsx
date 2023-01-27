import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';


describe('Footer component', () => {
  it('should render correctly', () => {
    render(<Footer />);
    const container = screen.getByTestId('footer');
    expect(container).toMatchSnapshot();
  });

  it('should render two icons', () => {
    render(<Footer />);
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  it('should have a link to the Github profile', () => {
    render(<Footer />);
    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Andrea-Agosta');
  });

  it('should have a link to the LinkedIn profile', () => {
    render(<Footer />);
    const linkedinLink = screen.getByTestId('linkedin-link');
    expect(linkedinLink).toHaveAttribute('href', 'https://uk.linkedin.com/in/andrea-agosta-276ab866');
  });
});