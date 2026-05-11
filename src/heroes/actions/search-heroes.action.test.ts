import { describe, expect, test } from 'vitest';
import { searchHeroesAction } from './search-heroes.action';
import { heroApi } from '../api/hero.api';
import AxiosMockAdapter from 'axios-mock-adapter';
import { beforeEach } from 'node:test';

const BASE_URL = import.meta.env.VITE_API_URL;

const heroesMock = [
  {
    id: 1,
    name: 'Superman',
    team: 'Justice League',
    category: 'Alien',
    universe: 'DC',
    status: 'Active',
    strength: 'Superhuman',
    image: 'superman.jpg',
  },
];

describe('searchHeroesAction', () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test('should return empty array when no heroes match the search criteria', async () => {
    heroesApiMock.onGet('/search').reply(200, heroesMock);

    const response = await searchHeroesAction({});
    expect(response).toEqual([]);
  });

  test('should return superman when searching for "Superman"', async () => {
    heroesApiMock.onGet('/search').reply(200, heroesMock);

    const response = await searchHeroesAction({ name: 'Superman' });
    expect(response).toEqual([
      {
        ...heroesMock[0],
        image: `${BASE_URL}/images/${heroesMock[0].image}`,
      },
    ]);
  });
});
