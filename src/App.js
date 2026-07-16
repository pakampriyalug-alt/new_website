// import logo from './logo.svg';
import './App.css';
import Dashboard from './Admin/Dashboard';
import Product from './Admin/Product';
import Category from './Admin/Category';
import Order from './Admin/Order';
import User from './Admin/Users';
import Homepage from './Product_page/Homepage';
import Saree from './Product_page/Saree';

import Accessories from "./Product_page/Accessories";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Allproduct from './Product_page/Allproduct';

import Short_tops from './Product_page/Short_tops';
import Women from './Product_page/women';
import Men from "./Product_page/men";
import Kurti from "./Product_page/Kurti";
import Belt from './Product_page/Belt';
import Beg from './Product_page/Beg';
import Watch from './Product_page/Watch';
import Footware from './Product_page/Footware';
import Shoes from "./Product_page/Shoes";
import Sandals from './Product_page/Sandals';
import Slippers from './Product_page/Slippers';
import Kids from './Product_page/Kids';
import Shorts from './Product_page/Shorts';
import Frock from './Product_page/Frock';
import Frock1 from './Product_page/Frock1';
import Shirt from './Product_page/Shirt';
import Shirt1 from './Product_page/Shirt1';
import Tshirt from './Product_page/Tshirt';
import Tshirt1 from './Product_page/Tshirt1';
import Jeans from './Product_page/Jeans';
import Jeans1 from './Product_page/Jeans1';
import Women1 from './Product_page/Women1';
import Addtocart from "./Product_page/Addtocart";
import Shopnow from "./Product_page/Shopnow";
import Aboutus from './Product_page/Aboutus';
import ShippingForm from './Product_page/ShippingForm';
import Buynow from './Product_page/Buynow';
import Paymentpage from './Product_page/Paymentpage';
import OrderSuccess from './Product_page/OrderSuccess';
import Orders from './Product_page/Orders';
import Login from './Product_page/Login';
import Signup from './Product_page/Signup';
import ContactUs from './Product_page/ContactUs';

import Userprofile from './Product_page/Userprofile';
import Contact from './Admin/Contact';
import AdminLogin from './Admin/Adminlogin';
import Addressform from './Product_page/Addressform';

import Wishlist from "./Product_page/Wishlist";
import Categorybar from './Product_page/Categorybar';
import Profileedit from './Product_page/Profileedit';
import Quicklogin from "./Seller/Quicklogin";
import Quicksignup from './Seller/Quicksignup';
import Sellerdashboard from './Seller/Sellerdashboard';
import Sellercategory from './Seller/Sellercategory';
import Sellerproducts from './Seller/Sellerproducts';
import Sellerorder from './Seller/Sellerorder';
import Sellerprofile from './Seller/Sellerprofile';
import Sellerprofileedit from './Seller/Sellerprofileedit';

import Sellerdetails from './Admin/Sellerdetails';

function App() {
  return (
    <>
   
    <BrowserRouter>
    <Routes>
      <Route  path="/sellerdetails" element={<Sellerdetails/>}/>

      <Route path="/category/men/Tshirt" element={<Tshirt/>}/>
      <Route path="/category/men/Jeans" element={<Jeans/>}/>
      <Route path="/category/men/Jeans1/:id" element={<Jeans1/>}/>
      <Route path="/category/men/Tshirt1/:id"element={<Tshirt1/>}/>
      <Route path="/category/men/Shirt" element={<Shirt/>}/>
      <Route path="/category/men/Shirt1/:id" element={<Shirt1/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
      <Route path="/admin/product" element={<Product/>}/>
      <Route path="/admin/category" element={<Category/>}/>
      <Route path="/admin/order" element={<Order/>}/>
      <Route path="/admin/user" element={<User/>}/>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/category/Women/saree"element={<Saree/>}/>
      <Route path="/Allproduct"element={<Allproduct/>}/>
      <Route path="/category/Accessories/Belt" element={<Belt/>}/>
        <Route path="/category/Accessories/beg" element={<Beg/>}/>
        <Route path="/category/Accessories/Watch" element={<Watch/>}/>
        <Route path="/category/Women/Tops" element={<Short_tops/>}/>
        <Route path="/category/Women"element={<Women/>}/>
        <Route path="/category/Women1/:id" element={<Women1/>}/>
        <Route path="category/men" element={<Men/>}/>
        <Route path="/category/Women/Kurti" element={<Kurti/>}/>
       <Route path="/category/Accessories"element={<Accessories/>}/>
       <Route path="/category/Footware"element={<Footware/>}/>
       <Route path="/category/Footware/Shoes" element={<Shoes/>}/>
       <Route path="/category/Footware/Sandals" element={<Sandals/>}/>
       <Route path="/category/Footware/Slippers"element={<Slippers/>}/>
       <Route path="/category/Kids"element={<Kids/>}/>
       <Route path="/category/Kids/Shorts"element={<Shorts/>}/>
       <Route path="/category/kids/frock"element={<Frock/>}/>
         <Route path="/category/kids/frock1/:id"element={<Frock1/>}/>
         <Route path="/addtocart" element={<Addtocart/>}/>
         <Route path="/allproduct" element={<Allproduct/>}/>
         <Route path="/shopnow/:id" element={<Shopnow/>}/>
         <Route path="/aboutus" element={<Aboutus/>}/>
         <Route path="/shippingform/:id" element={<ShippingForm/>}/>
         <Route path="/buynow/:id"element={<Buynow/>}/>
         <Route path="/paymentpage" element={<Paymentpage/>}/>
         <Route path="/ordersuccess"element={<OrderSuccess/>}/>
         <Route path="/orders" element={<Orders/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/userprofile" element={<Userprofile/>}/>
      <Route path="/sellerprofile" element={<Sellerprofile/>}/>
      {/* <Route path="/admin/login" element={<AdminLogin/>}/> */}
      <Route path="/admin/contact" element={<Contact/>}/>
        <Route path="/addressform" element={<Addressform/>}/>
  
        <Route path="/wishlist" element={<Wishlist/>}/>
        {/* <Route path="/categorybar" element={<Categorybar/>}/> */}
        <Route path="/profileedit" element={<Profileedit/>}/>
        <Route path="/sellerprofileedit" element={<Sellerprofileedit/>}/>
       <Route path="/quicklogin" element={<Quicklogin/>}/>
       <Route path="/signup/quicksignup" element={<Quicksignup/>}/>
       <Route path="/sellerdashboard" element={<Sellerdashboard/>}/>
       <Route path="/sellercategory" element={<Sellercategory/>}/>
       <Route path="/sellerproduct" element={<Sellerproducts/>}/>
       <Route path="/sellerorder/:id" element={<Sellerorder />} />
      
      
    </Routes>
    </BrowserRouter>
    </>
  
  );
}

export default App;
