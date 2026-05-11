import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getHeroesByPageAction } from './get-heroes-by-page.action';

const BASE_URL = import.meta.env.VITE_API_URL;

const responseMock = {
  total: 25,
  pages: 5,
  heroes: [
    {
      id: '3',
      name: 'Bruce Wayne',
      slug: 'bruce-wayne',
      alias: 'Batman',
      powers: [
        'Artes marciales',
        'Habilidades de detective',
        'Tecnología avanzada',
        'Sigilo',
        'Genio táctico',
      ],
      description:
        'El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.',
      strength: 6,
      intelligence: 10,
      speed: 6,
      durability: 7,
      team: 'Liga de la Justicia',
      image: `${BASE_URL}/images/3.jpeg`,
      firstAppearance: '1939',
      status: 'Active',
      category: 'Hero',
      universe: 'DC',
    },
  ],
};

describe('getHeroesByPageAction', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // con mock
    vi.mock('./get-heroes-by-page.action', () => ({
      getHeroesByPageAction: vi.fn(),
    }));
  });

  test('should throw an error if the API call fails', async () => {
    // Simula un error en la llamada a la API
    vi.mock('./get-heroes-by-page.action', () => ({
      getHeroesByPageAction: vi.fn().mockRejectedValue(new Error('API Error')),
    }));
  });

  test('should return defaultValues', async () => {
    vi.mocked(getHeroesByPageAction).mockReturnValue(
      new Promise((resolve) => {
        resolve(responseMock);
      }),
    );

    const summaryData = await getHeroesByPageAction(1);

    expect(summaryData).toMatchObject({
      total: expect.any(Number),
      pages: expect.any(Number),
      heroes: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          slug: expect.any(String),
          alias: expect.any(String),
          powers: expect.arrayContaining([expect.any(String)]),
          description: expect.any(String),
          strength: expect.any(Number),
          intelligence: expect.any(Number),
          speed: expect.any(Number),
          durability: expect.any(Number),
          team: expect.any(String),
          image: expect.any(String),
          firstAppearance: expect.any(String),
          status: expect.any(String),
          category: expect.any(String),
          universe: expect.any(String),
        }),
      ]),
    });
  });

  test('should return values sending page, limit and category params', async () => {
    vi.mocked(getHeroesByPageAction).mockReturnValue(
      new Promise((resolve) => {
        resolve({ ...responseMock, total: 25, pages: 3 });
      }),
    );

    const summaryData = await getHeroesByPageAction(1, 10, 'Hero');

    // segun el mock, total es 25 y pages es 3
    expect(summaryData).toMatchObject({
      total: 25,
      pages: 3,
    });
  });
});
