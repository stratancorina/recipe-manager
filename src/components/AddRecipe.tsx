import { useState } from "react";
import type { Recipe } from "../types";
import Button from "./Button";

interface AddRecipeProps {
    onAddRecipe: (recipe: Recipe) => void;
    error?: string | null;
}

function AddRecipe({ onAddRecipe, error }: AddRecipeProps) {
    const [name, setName] = useState("");
    const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
    const [cookTimeMinutes, setCookTimeMinutes] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setFormErrors({});

        const errors: Record<string, string> = {};

        if (!name.trim()) {
            errors.name = "Recipe name is required";
        }

        if (!ingredients.trim()) {
            errors.ingredients = "At least one ingredient is required";
        }
        if (!prepTimeMinutes.trim()) {
            errors.prepTime = "Prep time is required";
        }

        if (!cookTimeMinutes.trim()) {
            errors.cookTime = "Cook time is required";
        }


        const prepTime = Number(prepTimeMinutes);
        const cookTime = Number(cookTimeMinutes);

        if (prepTime < 0) {
            errors.prepTime = "Prep time cannot be negative";
        }

        if (cookTime < 0) {
            errors.cookTime = "Cook time cannot be negative";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const ingredientsList: string[] = ingredients
            .split(",")
            .map((ing: string) => ing.trim())
            .filter((ing: string) => ing.length > 0);

        const newRecipe: Recipe = {
            id: -Date.now(),
            name: name.trim(),
            prepTimeMinutes: prepTime,
            cookTimeMinutes: cookTime,
            ingredients: ingredientsList,
            isUserAdded: true,
        };

        onAddRecipe(newRecipe);

        setName("");
        setPrepTimeMinutes("");
        setCookTimeMinutes("");
        setIngredients("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-yellow-200 rounded-lg w-full">
            <h2 className="text-xl font-bold">Add New Recipe</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="name">Recipe Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`px-3 py-2 border rounded bg-white ${formErrors.name ? 'border-red-500' : ''
                            }`}
                    />
                    {formErrors.name && (
                        <span className="text-red-500 text-sm">{formErrors.name}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="ingredients">Ingredients (comma-separated)</label>
                    <input
                        id="ingredients"
                        type="text"
                        placeholder="flour,sugar,eggs,butter"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className={`px-3 py-2 border rounded bg-white ${formErrors.ingredients ? 'border-red-500' : ''
                            }`}
                    />
                    {formErrors.ingredients && (
                        <span className="text-red-500 text-sm">{formErrors.ingredients}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="prepTimeMinutes">Prep Time (minutes)</label>
                    <input
                        id="prepTimeMinutes"
                        type="number"
                        placeholder="10"
                        value={prepTimeMinutes}
                        onChange={(e) => setPrepTimeMinutes(e.target.value)}
                        min="0"
                        step="1"
                        className={`px-3 py-2 border rounded bg-white ${formErrors.prepTime ? 'border-red-500' : ''
                            }`}
                    />
                    {formErrors.prepTime && (
                        <span className="text-red-500 text-sm">{formErrors.prepTime}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="cookTimeMinutes">Cook Time (minutes)</label>
                    <input
                        id="cookTimeMinutes"
                        type="number"
                        placeholder="20"
                        value={cookTimeMinutes}
                        onChange={(e) => setCookTimeMinutes(e.target.value)}
                        min="0"
                        step="1"
                        className={`px-3 py-2 border rounded bg-white ${formErrors.cookTime ? 'border-red-500' : ''
                            }`}
                    />
                    {formErrors.cookTime && (
                        <span className="text-red-500 text-sm">{formErrors.cookTime}</span>
                    )}
                </div>
            </div>

            <Button type="submit">
                Add Recipe
            </Button>
        </form>
    );
}

export default AddRecipe;
