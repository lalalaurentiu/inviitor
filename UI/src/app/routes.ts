import { createBrowserRouter } from 'react-router';
import Root from './Root';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
  },
  {
    path: '/cautare',
    Component: Root,
  },
  {
    path: '/job/:id',
    Component: Root,
  },
]);