import React, { useState } from 'react'
import './Topbar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productsActions'

const Search = () => {

    const navigate = useNavigate()
  

    const [keyword , setKeyword] = useState()

  
    const handleClick = async(e) =>{
        e.preventDefault()
        navigate(`/search/${keyword}`)
    }

  return (
    
    <>    
    <div className='chat-user-search' id='topbar-src'>
    <input type='search'
      onChange={(e) => setKeyword(e.target.value)}
      value={keyword}
      placeholder='Search' />
    <button onClick={handleClick} id='topbar-btn'><i class='bx bx-search-alt' style={{color:"whitesmoke"}}></i></button>
    </div>
     
    </>
  )
}

export default Search
