// import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Footer } from './Footer';

// describe('Footer component', () => {
//   it('should render correctly', () => {
//     const { container } = render(<Footer />);
//     expect(container).toMatchSnapshot();
//   });

//   it('should render two icons', () => {
//     const { getByTestId } = render(<Footer />);
//     expect(getByTestId('github-icon')).toBeInTheDocument();
//     expect(getByTestId('linkedin-icon')).toBeInTheDocument();
//   });

//   it('should have a link to the Github profile', () => {
//     const { getByTestId } = render(<Footer />);
//     const githubLink = getByTestId('github-link');
//     expect(githubLink).toHaveAttribute('href', 'https://github.com/Andrea-Agosta');
//   });

//   it('should have a link to the LinkedIn profile', () => {
//     const { getByTestId } = render(<Footer />);
//     const linkedinLink = getByTestId('linkedin-link');
//     expect(linkedinLink).toHaveAttribute('href', 'https://uk.linkedin.com/in/andrea-agosta-276ab866');
//   });
// });