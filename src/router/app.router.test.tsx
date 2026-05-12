import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { router } from './app.router';

// se procede a mockear el componente HomePage para evitar errores relacionados
// con la falta de un proveedor de React Router en el entorno de pruebas,
// ya que AppRouter utiliza HomePage, que a su vez utiliza useNavigate y otras dependencias.
vi.mock('@/heroes/pages/home/HomePage', () => ({
  HomePage: () => (
    <div data-testid='homepage'>
      <Outlet />
    </div>
  ),
}));

// mock del componente Hero
vi.mock('@/heroes/pages/hero/HeroPage', () => ({
  HeroPage: () => {
    const { id = '' } = useParams();

    return <div data-testid='heropage'>{`HeroPage - id: ${id}`}</div>;
  },
}));

// mock del componente Search que tiene lazy loading en routes
vi.mock('@/heroes/pages/search/SearchPage', () => ({
  default: () => <div data-testid='searchpage'></div>,
}));

describe('AppRouter', () => {
  it('should render the AppRouter component', () => {
    // crear un router en memoria
    const appRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={appRouter} />);

    screen.debug();
    expect(screen.getByTestId('homepage')).toBeDefined();
  });

  it('should render hero page at /heroes/:id path', () => {
    const appRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/heroes/superman'],
    });

    render(<RouterProvider router={appRouter} />);
    screen.debug();
    expect(screen.getByTestId('heropage')).toBeDefined();
    expect(screen.getByText('HeroPage - id: superman')).toBeDefined();
  });

  // test de lazy loading search
  it('should render search page at /search path', async () => {
    const appRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/search'],
    });
    render(<RouterProvider router={appRouter} />);

    expect(await screen.findByTestId('searchpage')).toBeDefined();
    expect(screen.getByTestId('searchpage')).toBeDefined();
    screen.debug();
  });

  // test con cualquier ruta desconocida, debe mostrar el mensaje de 404
  it('should redirect to home for unknown routes', () => {
    const appRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/unknown'],
    });
    render(<RouterProvider router={appRouter} />);

    expect(screen.getByText('404')).toBeDefined();
    screen.debug();
  });
});
