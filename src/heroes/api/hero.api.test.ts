import { describe, expect, it } from 'vitest';
import { heroApi } from './hero.api';

// Se creó el archivo .env.test en la raiz del proyecto
// con la variable VITE_API_URL apuntando al servidor de pruebas
// automaticamente en pruebas, apunta a .env.test

const BASE_URL = import.meta.env.VITE_API_URL;
describe('HeroApi', () => {
  it('should be configure pointing to the testing server', async () => {
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(BASE_URL).toContain('3001');
  });
});
