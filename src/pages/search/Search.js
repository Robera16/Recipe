import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
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

  // const url = ' http://localhost:3000/recipes?q=' + query
  // const {error, isPending, data}  = useFetch(url)

  // console.log(data)

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').where('title', '==', `${query}`).onSnapshot((snapshot) => {
      if(snapshot.empty){
        setError('No recipes to load')
        setIsPending(false)
        setData(null)
      } else {
        let results = []
        // array of all the documents in that collection
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data()})
        })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })
    // fires when we navigate to other page
    return () => unsub()
  }, [query])
  
  return (
    <div>
      <h2 className='page-title'>Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}
