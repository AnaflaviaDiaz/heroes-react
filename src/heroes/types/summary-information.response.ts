import type { Hero } from "./hero.interface";

export interface SummaryInformationResponse {
  totalCharacters: number;
  strongestHero: Hero;
  smartestHero: Hero;
  heroCount: number;
  villainCount: number;
}
