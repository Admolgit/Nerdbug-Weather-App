import { render, screen } from '@testing-library/react';
import App from './App';
import WeatherApiPage from '../src/pages/WeatherApiPage';
import axios from "axios";

jest.mock("axios");

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders weather api page link', () => {
  render(<WeatherApiPage />);
  const linkElement = screen.getByText(/Available Cities/i);
  expect(linkElement).toBeInTheDocument();
});
