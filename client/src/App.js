import './index.css'

import { useContext, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import { UserContext } from './context/userContext';

import Auth from './pages/Auth';
import LayoutUser from './components/LayoutUser'
import LayoutAdmin from './components/LayoutAdmin'
import Product from './pages/Product'
import Profile from './pages/Profile'
import DetailProduct from './pages/DetailProduct'
import ListCategory from './pages/ListCategory'
import ListProduct from './pages/ListProduct'
import EditCategory from './pages/EditCategory'
import EditProduct from './pages/EditProduct'
import EditProfile from './pages/EditProfile'
import AddCategoryAdmin from './pages/AddCategoryAdmin';
import AddProductAdmin from './pages/AddProductAdmin';
import AuthRegister from './pages/AuthRegister';

import { API, setAuthToken } from './config/api';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'Admin') {
        navigate('/admin');
      } else if (state.user.status === 'Customer') {
        navigate('/user');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/user" element={<LayoutUser />}>
            {/* <Route index element={<Product />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/user/product/detail/:id" element={<DetailProduct />}></Route>
            <Route path="/user/profile/edit" element={<EditProfile />}></Route> */}
          </Route>
          {/* <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<ListCategory />}></Route>
            <Route path="/admin/product" element={<ListProduct />}></Route>
            <Route path="/admin/add-category" element={<AddCategoryAdmin />}></Route>
            <Route path="/admin/edit-category/:id" element={<EditCategory />}></Route>
            <Route path="/admin/add-product" element={<AddProductAdmin />}></Route>
            <Route path="/admin/edit-product/:id" element={<EditProduct />}></Route>
          </Route> */}
        </Routes>
  );
}

export default App;

