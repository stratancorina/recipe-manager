import Button from './components/Button'
import { useFetchRecipes } from './hooks/useFetchRecipes'
import { SearchInput } from './components/SearchInput'
import { useSearch } from './hooks/useSearch'
import { useSort } from './hooks/useSort'
import { Sort } from './components/Sort'
import AddRecipe from './components/AddRecipe'
import { useState } from 'react'
import RecipeCard from './components/RecipeCard'

function App() {
  const { recipes, loading, error, loadMore, addRecipe, deleteRecipe } = useFetchRecipes()
  const { filteredRecipes, setSearchTerm } = useSearch(recipes)
  const { sortedRecipes, setSortOrder } = useSort(filteredRecipes)

  const [showAddRecipe, setShowAddRecipe] = useState(false)
  return (
    <>
      <div className='max-w-6xl mx-auto bg-white min-h-96 w-full my-4 rounded-lg p-4 flex flex-col space-y-4 items-center'>
        <div className='bg-yellow-200 rounded-lg p-4 w-full'>
          <h1 className='text-2xl font-bold text-center'>Recipe Manager</h1>

        </div>
        {showAddRecipe && <AddRecipe onAddRecipe={addRecipe} error={error} />}


        <div className='flex flex-col md:flex-row items-center gap-2 mb-4 mx-auto border-y border-gray-300 py-4 w-full justify-between'>
          <Sort onSort={setSortOrder as (sort: string) => void} />
          <SearchInput onSearch={setSearchTerm} />

          <Button className='order-0' onClick={() => setShowAddRecipe(!showAddRecipe)}>
            {showAddRecipe ? 'Close' : ' Add Recipe'}
          </Button>

        </div>

        {loading && sortedRecipes.length === 0 ? (
          <p >Loading recipes...</p>
        ) : (
          <div className='space-y-2 grid grid-cols-1 md:grid-cols-2 w-full justify-items-center items-center'>
            {sortedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
        <Button onClick={loadMore} disabled={loading}>{error ? 'Try Again' : 'Load More'}</Button>
      </div>
    </>
  );
}

export default App;
