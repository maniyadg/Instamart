import axios from 'axios';
import { host } from '../host';
import { accessChatFail, accessChatRequest, accessChatSuccess, fetchChatFail, fetchChatRequest, fetchChatSuccess } from '../slices/chatSlice';

export const accessChat = (token , userId) => async (dispatch) => {

    try {  
        dispatch(accessChatRequest()) 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.post(`/api/chat`, { userId }, config);        
        dispatch(accessChatSuccess(data))
    } catch (error) {
        //handle error
        dispatch(accessChatFail(error.response.data.message))
    }
    
}

export const fetchChat = (token , chats) => async (dispatch) => {

    try {  
        dispatch(fetchChatRequest()) 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.post(`/api/chat`, config);   
          chats(data)     
        dispatch(fetchChatSuccess(data))
    } catch (error) {
        //handle error
        dispatch(fetchChatFail(error.response.data.message))
    }
    
}
