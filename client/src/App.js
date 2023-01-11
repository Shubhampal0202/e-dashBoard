import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './components/signup/Signup'
import PrivateRoute from "./components/privateRoutes/PrivateRoute"
import Login from './components/login/Login';
import AddProduct from './components/addProduct/AddProduct';
import ProductList from './components/productList/ProductList';
import UpdateProduct from './components/updateProduct/UpdateProduct';
import Profile from './components/profile/Profile';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateRoute />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:_id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h2>logout component</h2>} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
