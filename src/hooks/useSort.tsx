import { useState, useMemo } from 'react'
import type { Recipe } from "../types"

interface UseSortReturn {
    sortedRecipes: Recipe[]
    setSortOrder: (sort: string) => void
}

export const useSort = (recipes: Recipe[]): UseSortReturn => {
    const [sortOrder, setSortOrder] = useState<string>('default')
    
    const sortedRecipes = useMemo(() => {
        const totalTime = (recipe: Recipe) => recipe.prepTimeMinutes + recipe.cookTimeMinutes
        const data = [...recipes]
        
        if (sortOrder === 'ascending') {
            return data.sort((a, b) => totalTime(a) - totalTime(b))
        } else if (sortOrder === 'descending') {
            return data.sort((a, b) => totalTime(b) - totalTime(a))
        }
        
        return data
    }, [recipes, sortOrder])

    return { sortedRecipes, setSortOrder }
}