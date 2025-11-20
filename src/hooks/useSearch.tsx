import { useMemo, useState } from "react"
import type { Recipe } from "../types"

export const useSearch = (recipes: Recipe[]) => {
    const [searchTerm, setSearchTerm] = useState('')
    
    const filteredRecipes = useMemo(() => {
      if (!searchTerm) return recipes
      
      return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm)
        )
      )
    }, [recipes, searchTerm])
    
    return { filteredRecipes, searchTerm, setSearchTerm }
  }