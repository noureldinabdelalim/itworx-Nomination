import { render, screen } from '@testing-library/react';
import App from './App';
// import Admin from './adminnnnnn'

test('renders learn react link', () => {
  render(<App />);
  // render(<Admin />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
