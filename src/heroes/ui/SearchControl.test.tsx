import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { SearchControl } from './SearchControl';

// mock de button
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...rest }: { children: React.ReactNode }) => {
    return (
      <button {...rest} data-testid='button'>
        {children}
      </button>
    );
  },
}));

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControl />
    </MemoryRouter>,
  );
};

describe('SearchControl', () => {
  it('should render with default values', () => {
    const { container } = renderWithRouter();
    expect(container).toMatchSnapshot();
  });

  it('should set input value when search param name is set', () => {
    renderWithRouter(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...',
    );
    expect(input.getAttribute('value')).toBe('Batman');

    // evento para cambiar el texto del input
    fireEvent.change(input, { target: { value: 'Superman' } });
    // presiona enter para realizar la búsqueda
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(input.getAttribute('value')).toBe('Superman');
    screen.debug(input);
  });

  // it('should change params strength when slider is changed', () => {
  //   renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);
  //   const slider = screen.getByRole('slider');
  //   expect(slider.getAttribute('aria-valuenow')).toBe('0');

  //   fireEvent.keyDown(slider, { key: 'ArrowRight' });

  //   expect(slider.getAttribute('aria-valuenow')).toBe('1');
  // });

  // it('should accordion be open when active-accordion param is set', () => {
  //   const {container} = renderWithRouter(['?name=Batman&active-accordion=advance-filters']);
    
  //   const accordionItem = container.querySelector('[data-slot="accordion-item"]');

  //   expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  // });

  it('should accordion be open when active-accordion param is not set', () => {
    const {container} = renderWithRouter(['?name=Batman']);

    const accordionItem = container.querySelector('[data-slot="accordion-item"]');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});
