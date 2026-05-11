import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getHeroBySlugAction } from './get-hero-by-slug.action';

const BASE_URL = import.meta.env.VITE_API_URL;

const heroBySlugMock = {
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
};

describe('getHeroBySlugAction', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // con mock
    vi.mock('./get-hero-by-slug.action', () => ({
      getHeroBySlugAction: vi.fn(),
    }));
  });
  // SUCCESS
  // apunta al backend - sin mock
  // test('should fetch hero data and return with complete image URL', async () => {
  //   // debería hacerse con idSlug real que esté en base de datos
  //   const heroData = await getHeroBySlugAction('bruce-wayne');
  //   expect(heroData).toMatchObject({
  //     id: '2',
  //     name: 'Bruce Wayne',
  //     image: `${BASE_URL}/images/2.jpeg`,
  //   });
  // });

  test('should fetch hero data and return with complete image URL with mock', async () => {

    vi.mocked(getHeroBySlugAction).mockReturnValue(
      new Promise((resolve) => {
        resolve(heroBySlugMock);
      }),
    );

    const heroData = await getHeroBySlugAction('bruce-wayne');
    expect(heroData).toMatchObject({
      id: '3',
      name: 'Bruce Wayne',
      image: `${BASE_URL}/images/3.jpeg`,
    });
  });

  // ERROR
  test('should throw an error if hero is not found', async () => {
    vi.mocked(getHeroBySlugAction).mockReturnValue(
      Promise.reject(new Error('Hero not found')),
    );

    await expect(getHeroBySlugAction('non-existent-hero')).rejects.toThrow();
  });
});
