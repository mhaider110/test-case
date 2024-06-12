import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders user list', () => {
  render(<App />);
  expect(screen.getByText('🚀 Elon Musk')).toBeInTheDocument();
});