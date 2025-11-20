import { useState, useEffect } from 'react'
import type { Recipe } from '../types'

interface UseFetchRecipesReturn {
  recipes: Recipe[]
  loading: boolean
  error: string | null
  loadMore: () => void
  addRecipe: (recipe: Recipe) => void
  deleteRecipe: (id: number) => void
}

export const useFetchRecipes = (): UseFetchRecipesReturn => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [skip, setSkip] = useState<number>(0)

  const fetchRecipes = async (skipAmount: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://dummyjson.com/recipes?limit=10&skip=${skipAmount}`
      )

      if (!response.ok) {
        throw new Error('failed to load recipes')
      }

      const data = await response.json()
      const newRecipes: Recipe[] = data.recipes || []

      console.log(newRecipes)

      if (skipAmount === 0) {
        setRecipes(newRecipes)
      } else {
        setRecipes(prev => [...prev, ...newRecipes])
      }

    } catch (err) {
      setError('failed to load recipes')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes(0)
  }, [])

  const loadMore = () => {
    if (!loading) {
      const newSkip = skip + 10
      setSkip(newSkip)
      fetchRecipes(newSkip)
    }
  }

  const addRecipe = (recipe: Recipe) => {
    if (!recipe.name?.trim()) {
      setError('Recipe name is required')
      return
    }

    if (!recipe.ingredients?.length) {
      setError('At least one ingredient is required')
      return
    }

    if (recipe.prepTimeMinutes < 0 || recipe.cookTimeMinutes < 0) {
      setError('Time values cannot be negative')
      return
    }

    if (
      recipe.prepTimeMinutes == null ||
      recipe.cookTimeMinutes == null
    ) {
      setError('Prep time and cook time are required')
      return
    }

    setRecipes(prev => [recipe, ...prev])
    setError(null)
  }

  const deleteRecipe = (id: number) => {
    const recipe = recipes.find(r => r.id === id)
    const isUserAddedRecipe = recipe?.isUserAdded === true

    if (isUserAddedRecipe) {
      setRecipes(prev => prev.filter(recipe => recipe.id !== id))
      return
    }

    fetch(`https://dummyjson.com/recipes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete recipe')
        }
        setRecipes(prev => prev.filter(recipe => recipe.id !== id))
      })
      .catch(err => {
        console.error('Error deleting recipe:', err)
        alert('Failed to delete recipe. Please try again.')
      })
  }

  return { recipes, loading, error, loadMore, addRecipe, deleteRecipe }
}