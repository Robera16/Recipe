import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

// styles
import './Search.css'

// components
import RecipeList from '../../components/RecipeList'
 
export default function Search() {
  // get query string ?q=veggie
  const queryString = useLocation().search
  // change to javascript object
  const queryParams = new URLSearchParams(queryString)
  // the value of query parameter 'q'
  const query = queryParams.get('q')

  const url = ' http://localhost:3000/recipes?q=' + query
  const {error, isPending, data}  = useFetch(url)

  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}
