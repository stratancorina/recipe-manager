import type { Recipe } from '../types';
import Button from './Button';

interface RecipeCardProps {     
    recipe: Recipe;
    onDelete: (id: number) => void;
}

export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
    const totalTime = recipe.prepTimeMinutes+ recipe.cookTimeMinutes;
    
    return (
        <div className="relative w-96 h-40 rounded-lg bg-yellow-200 flex justify-between overflow-hidden">
            <div className="flex flex-col justify-between p-4 w-full" >
                <div>
                    <h3 className="font-bold">{recipe.name}</h3>
                    <div className="flex flex-row flex-wrap gap-2 text-sm max-h-15 overflow-hidden">
                        Ingredients: {recipe.ingredients.slice(0, 4).join(', ')}</div>
                </div>
                <div className="flex flex-row  gap-2 w-full justify-between">
                    <span>{totalTime} min</span>
                    {recipe.difficulty && <span>{recipe.difficulty}</span>}
                </div>
            </div>
            {recipe.rating && (
                <div className="absolute top-1 right-2 bg-white rounded-full p-2 text-sm border border-yellow-300 min-w-10 text-center">
                    <span>{recipe.rating}</span>
                </div>
            )}
                <div className="absolute bottom-1 right-2">
                    <Button 
                        className='bg-red-500 hover:bg-red-600 text-sm text-white' 
                        onClick={() => onDelete(recipe.id)}
                    >
                        Delete
                    </Button>
                </div>
            {recipe.image && <img src={recipe.image} alt={recipe.name} />}
        </div>
    );
}