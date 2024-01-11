import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Component/User/SignUp';
import SignIn from './Component/User/SignIn';
import ForgetPassword from './Component/User/ForgetPassword';
import Verify from './Component/User/Verify';
import Category from './Component/Category/CategoryEntryPage/Category';
import Cart from './Component/Cart/Cart';
import Chat from './Component/Chat/Chat';
import Orders from './Component/Orders/OrdersHomePage/Orders';
import Profile from './Component/Profile/Profile';
import 'react-toastify/dist/ReactToastify.css';
import CategoryType from './Component/Category/CategoryType/CategoryType';
import Create from './Component/Create/CreateForm/Create';
import CreateItems from './Component/Create/CreateItems/CreateItems';
import Home from './Component/Home/Home';
import OrderLocate from './Component/Orders/OrderLocatePage/OrderLocate';
import Product from './Component/Product/Product';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/userActions';
import ProductSearch from './Component/Product/ProductSearch';
import AddAddress from './Component/Address/AddressForms/AddAddress';
import EditAddress from './Component/Address/AddressForms/EditAddress';
import { Address } from './Component/Address/Address';
import MobileMenu from './Component/MobileMenu/MobileMenu';
import PostEdit from './Component/Profile/PostEdit/PostEdit';
import About from './Component/About/About';
import NoPage from './Component/NoPage/NoPage';

function App() {
  useEffect(() => {
    store.dispatch(loadUser)
  },[]) 
  return (
    <Router>
    <div className="App">
    <ToastContainer theme='dark' />

     <Routes>
     <Route exact path='/' element={<SignIn/>}/>

     <Route path='/signup' element={<SignUp/>}/>
      
     <Route path='/forget' element={<ForgetPassword/>}/>
    
     <Route path='/reset-password/:id' element={<Verify/>}/>
    
     <Route path='/home' element={<Home/>}/>
     
     <Route path='/category' element={<Category/>}/>
    
     <Route path='/cart' element={<Cart/>}/>
     
     <Route path='/chat' element={<Chat/>}/>
     
     <Route path='/orders' element={<Orders/>}/>
     
     <Route path='/profile' element={<Profile/>}/>
      
     <Route path='/category/:name' element={<CategoryType/>}/>
       
     <Route path='/create' element={<Create/>}/>
             
     <Route path='/create-items' element={<CreateItems/>}/>
            
     <Route path='/locate-order' element={<OrderLocate/>}/>
          
     <Route path='/product/:id' element={<Product/>}/>
          
     <Route  path='/address/:name' element={<Address/>}/>


     <Route  path='/search/:keyword' element={<ProductSearch />}/>

     <Route  path='/add/address' element={<AddAddress />}/>

     <Route  path='/editaddress/' element={<EditAddress />}/>

     <Route  path='/menupage' element={<MobileMenu />}/>

     <Route  path='/postedit' element={<PostEdit />}/>

     <Route  path='/about' element={<About />}/>

     <Route  path='/*' element={<NoPage />}/>


     </Routes>
    </div>
    </Router>
    
  );
}

export default App;
