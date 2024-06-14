import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import './matchMedia'

test('renders user list', () => {
  render(<App />);
  expect(screen.getByText((_, element) => element.textContent === 'Elon Musk')).toBeInTheDocument();
});
test('renders user icon', () => {
  render(<App />);
  expect(screen.getByText((_, element) => element.textContent === '🚀')).toBeInTheDocument();
});