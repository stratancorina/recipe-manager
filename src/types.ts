export interface Recipe {
  id: number;
  name: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: string[];
  image?: string;
  difficulty?: string;
  rating?: number;
  isUserAdded?: boolean;
}