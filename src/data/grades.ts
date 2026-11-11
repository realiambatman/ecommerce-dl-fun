import { Product } from '../types/product';

// Cosmetic grades: one letter, one meter level and one plain sentence per condition
export type Condition = Product['condition'];

export const GRADES: Record<Condition, { letter: string; level: number; summary: string }> = {
  Excellent: { letter: 'A', level: 3, summary: 'Like new. No visible marks at arm’s length.' },
  Good: { letter: 'B', level: 2, summary: 'Light signs of use. Faint marks on the frame or back.' },
  Fair: { letter: 'C', level: 1, summary: 'Visible wear. Fully working, priced lowest.' },
};
