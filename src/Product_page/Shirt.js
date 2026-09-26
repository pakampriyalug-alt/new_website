import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Categorybar from "./Categorybar";


function Shirt() {
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const res = await axios.get("http://localhost:4000/viewproduct");
    setProducts(res.data);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <Header />
      <Categorybar/>
       <div className="conadmin">
             
                <div className="navright">
                     
      <div className="home-container">
        <section className="products">
        
            <div className="page-header">
  <h1 className="page-title">Shirt</h1>
  <p className="page-subtitle">Trending collections with free delivery</p>
</div>
          <div className="product-grid">
             {products
             .filter(p => p.Subcategory === "Shirt")
             .map(p => (
                <div className="product-card" key={p._id}>
              {/* <img src={image5} alt="Silk Saree" /> */}
             <Link to={`/category/men/Shirt1/${p._id}`}>


              <img src={`http://localhost:4000/uploads/${p.image}`} width="40"  alt="img"/></Link>
             
              <h4 className="product-name">
               {p.Product}
              </h4>
               
              <p className="price">₹{p.Price}</p>
             
              <span className="delivery" >Free Delivery</span>

              <div className="rating">
                <span className="star">{p.Rating} ★</span>
                <span className="reviews">{p.Review} Reviews</span>
                
              </div>
               
            </div>
               ))}
          </div>
      
        </section>
      </div>
      </div>
      </div>
 <div className="footer">
  <div className="footer-section">
    {/* <img src={logo} className="logo" /> */}
    <div className="logo">
          <span className="logo-circle">Go</span>
          <span className="logo-text" style={{color:"white"}}>Style</span>
        </div>
    <p>
      Your trusted online store for electronics, gadgets, and accessories.
      We offer high-quality tech products at affordable prices.
    </p>
  </div>

  <div className="footer-section">
    <h3>Quick Links</h3>
    <ul>
      <li><a href="home">Home</a></li>
      <li><a href="about">About</a></li>
      <li><a href="product">Products</a></li>
      <li><a href="contc">Contact</a></li>
      <li><a href="login">Login</a></li>
    </ul>
  </div>

  <div className="footer-section">
    <h3>Customer Service</h3>
    <ul>
      <li><a href="help">Help & Support</a></li>
      <li><a href="shipping">Shipping Info</a></li>
      <li><a href="reurn">Return Policy</a></li>
      <li><a href="privacy">Privacy Policy</a></li>
      <li><a href="terms">Terms & Conditions</a></li>
    </ul>
  </div>
  <div className="footer-section">
    <h3>Contact Us</h3>
    <p>Email: ElectroBazaar@electronics.com</p>
    <p>Phone: +91 1234567890</p>
    <p>Address: Chennai, India</p>
  </div>
</div>

<div className="footer-bottom">
  © 2025 ElectroBazaar. All rights reserved.
</div>
    </>
  );
}

export default Shirt;
