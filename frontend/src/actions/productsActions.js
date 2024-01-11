import axios from 'axios';
import { host } from '../host';
import { productsFail, productsSuccess, productsRequest, newProductRequest, newProductFail, newProductSuccess} from '../slices/productsSlice';

export const getProducts = (keyword) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `${host}/api/get-products`
        console.log(keyword)
        if(keyword){
            link += `/${keyword}`
        }
        console.log(link)
        const {data} = await axios.get(link);
        console.log(data)
        
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}

export const createNewProduct  =  (productData) => async (dispatch) => {

    try {  
        dispatch(newProductRequest()) 
        const { data }  =  await axios.post(`${host}/api/create-product`, productData);
        dispatch(newProductSuccess(data))

    } catch (error) {
        dispatch(newProductFail(error.response))
    }
    
}


