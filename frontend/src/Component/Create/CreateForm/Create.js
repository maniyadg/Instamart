import React, { useEffect, useState } from 'react'
import Base from '../../../Base/Base'
import './Create.css'
import {  useNavigate } from 'react-router-dom';

import useCategory from '../../Hooks/useCategory';
import { createNewProduct } from '../../../actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { clearError, clearProductCreated } from '../../../slices/productsSlice';

export default function Create() {

  const { loading, isProductCreated, error } = useSelector((state) => (state.productsState))


  const categories = useCategory()
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, file])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('seller', seller);
    formData.append('category', category);
    images.forEach(image => {
      formData.append('images', image)
    })
    dispatch(createNewProduct(formData))
  }

  useEffect(() => {
    if (isProductCreated) {
      toast('Product Created Succesfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearProductCreated())
      })
      navigate('/home')
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        onOpen: () => { dispatch(clearError()) }
      })
      return
    }
  }, [isProductCreated, error, dispatch])


  return (
    <Base>
      <div className="row">
        <div className="col-12 col-md-2">
        </div>
        <div className="col-12 col-md-10 create-container">
        <div className="back-btn">
        <button  onClick={()=>navigate(-1)}>BACK</button>

        </div>
          <div className="wrapper my-5">
            <form onSubmit={submitHandler} className="shadow-lg create-box" encType='multipart/form-data'>
              <h1 className="mb-4 create-head">New Product</h1>

              <div className="form-group create-form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  placeholder='Enter product name...'
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group create-form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  placeholder='Enter product price...'
                  onChange={e => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group create-form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={e => setDescription(e.target.value)}
                  placeholder='Enter product description...'
                  value={description}
                ></textarea>
              </div>

              <div className="form-group create-form-group">
                <label htmlFor="category_field">Category</label>
                <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field"
                
                >
                  <option value="" >Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group create-form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  placeholder='Enter product Availability...'
                  onChange={e => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div className="form-group create-form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  placeholder='Enter product seller name...'
                  onChange={e => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div className='form-group create-form-group'>
                <label>Images</label>

                <div className='custom-file'>
                
                  <input 
                    type='file'
                    name='product_images'
                    className='custom-file-input'
                    id='customFile'
                    multiple
                    onChange={onImagesChange}

                  />

                  <label className='custom-file-label' htmlFor='customFile'>
                    <h3>Choose Images</h3>
                  </label>
                </div>
                <div className='create-img'>
                {imagesPreview.map(image => (
                  <img
                    className="mt-3 mr-2 creating-images"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    
                  />
                ))}
                </div>
               
              </div>


              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className=" create-btn"
              >
                CREATE
              </button>

            </form>
          </div>

        </div>
      </div>
    </Base>

  )
}