import React from 'react'
import Base from '../../../Base/Base'
import { useNavigate } from 'react-router-dom'
import useCategory from '../../Hooks/useCategory'
import './CreateItems.css'

export default function CreateItems() {
    const navigate = useNavigate()

    const categories = useCategory()

    const handleclick = (categories) => {
      navigate(`/create/${categories.name}` , { state: { categories } })
    }
  
    return (
    <Base>  
    {
      categories.map((categories) => (
        <div  className='category-container1'  key={categories._id} >
        <div className='c-container1' style={{cursor:"pointer"}} onClick={() => handleclick(categories)}>
        <img className='img' src={categories.photo} alt='Electronics'/>
        <h4>{categories.name}</h4>
        </div>
        </div>
  ))}</Base>
  )
}
