import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CustomPagination } from './CustomPagination';
import { MemoryRouter } from 'react-router';
import type { ReactElement } from 'react';

// mockear el componente botón para que en su renderizado no tenga
// las clases, esto para reducir solo en el test el código y sólo probar
// funcionalidad
vi.mock('../ui/button', () => ({
  Button: ({ children, ...rest }: { children: React.ReactNode }) => {
    return (
      <button {...rest} data-testid='button'>
        {children}
      </button>
    );
  },
}));

// puede ser component o children
const renderWithRouter = (
  component: ReactElement,
  initialEntries?: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
  );
};

describe('CustomPagination', () => {
  it('should render correctly', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    screen.debug();
    // const paginationElement = screen.getByTestId('custom-pagination');
    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
  });

  // por defecto está en la primera página
  // por lo que el botón de Previous debe estar deshabilitado
  it('should disable Previous button on first page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    const previousButton = screen.getByText('Previous');
    expect(previousButton.getAttributeNames()).toContain('disabled');
  });

  // se envía el initialEntries con la página 5, por lo que el botón de Next debe estar deshabilitado
  it('should disable Next button on last page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);
    const nextButton = screen.getByText('Next');
    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  // la página 3 al estar activa, debe tener el variant default
  it('should have default variant for button 3 when we are on the page 3', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);
    const page2Button = screen.getByText('2');
    const page3Button = screen.getByText('3');
    expect(page3Button.getAttribute('variant')).toContain('default');
    expect(page2Button.getAttribute('variant')).toContain('outline');
  });

  it('should change page when click on number button', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);
    const page2Button = screen.getByText('2');
    const page3Button = screen.getByText('3');
    expect(page3Button.getAttribute('variant')).toContain('default');
    expect(page2Button.getAttribute('variant')).toContain('outline');

    // click a pagina 2
    fireEvent.click(page2Button);

    expect(page2Button.getAttribute('variant')).toContain('default');
    expect(page3Button.getAttribute('variant')).toContain('outline');
  });
});
