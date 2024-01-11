import React from 'react'
import './NoPage.css'
import images from '../../images/no-page-img.jpeg'
import { Link } from 'react-router-dom'

export default function NoPage() {
  return (
    <div className='no-page-container'>
    <div className='no-page-img'>
    <img src={images} alt='img'/>
    </div>
    <div className='no-page-btn'>
    <Link className='no-page-link' to='/home'>Back to Home Page</Link>
    </div>
    </div>
  )
}
