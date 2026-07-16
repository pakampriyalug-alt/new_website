import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";

import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Categorybar from "./Categorybar";

function Short_tops() {
  const [products, setProducts] = useState([]);
       const getProducts = async () => {
    try {

      const adminProducts = await axios.get("http://localhost:4000/viewproduct");
      const sellerProducts = await axios.get("http://localhost:4000/sellerallproduct");

      const mergedProducts = [...adminProducts.data, ...sellerProducts.data];
        console.log("adminproduct",adminProducts.data);
      setProducts(mergedProducts);
      

    } catch (err) {
      console.log("Product fetch error", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Header />
       <Categorybar/>
      <div className="home-container">
        <section className="products">
         <div className="page-header">
  <h1 className="page-title">Tops for Women</h1>
  <p className="page-subtitle">Trending collections with free delivery</p>
</div>
               <div className="product-grid">
             {products
             .filter(p => p.Subcategory === "Tops")
             .map(p => (
                <div className="product-card" key={p._id}>
              {/* <img src={image5} alt="Silk Saree" /> */}
               <Link to={`/category/Women1/${p._id}`}>
              <img src={`http://localhost:4000/uploads/${p.image}`} width="40" /></Link>

              <h4 className="product-name">
               {p.Product}
              </h4>

              <p className="price">₹{p.Price}</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">{p.Rating} ★</span>
                <span className="reviews">{p.Review} Reviews</span>
              </div>

              {/* <button>Add to Cart</button> */}
            </div>
               ))}

          {/* <div className="product-grid">

            <div className="product-card">
              <img src={img1} alt="Silk Saree" />

              <h4 className="product-name">
                Stylish Banarasi Silk Saree with Rich Pallu
              </h4>

              <p className="price">₹2500</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.3 ★</span>
                <span className="reviews">12,345 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div>

            <div className="product-card">
              <img src={img2} alt="Cotton Saree" />

              <h4 className="product-name">
                Soft Cotton Daily Wear Saree for Women
              </h4>

              <p className="price">₹1200</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.0 ★</span>
                <span className="reviews">9,120 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div>

            <div className="product-card">
              <img src={img3} alt="Net Saree" />

              <h4 className="product-name">
                Party Wear Net Saree with Designer Border
              </h4>

              <p className="price">₹1500</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.5 ★</span>
                <span className="reviews">18,450 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div>
            <div className="product-card">
              <img src={img4} alt="Net Saree" />

              <h4 className="product-name">
                Party Wear Net Saree with Designer Border
              </h4>

              <p className="price">₹1500</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.5 ★</span>
                <span className="reviews">18,450 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div>
             <div className="product-card">
              <img src={img4} alt="Net Saree" />

              <h4 className="product-name">
                Party Wear Net Saree with Designer Border
              </h4>

              <p className="price">₹1500</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.5 ★</span>
                <span className="reviews">18,450 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div>
             <div className="product-card">
              <img src={img4} alt="Net Saree" />

              <h4 className="product-name">
                Party Wear Net Saree with Designer Border
              </h4>

              <p className="price">₹1500</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.5 ★</span>
                <span className="reviews">18,450 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div>
             <div className="product-card">
              <img src={img4} alt="Net Saree" />

              <h4 className="product-name">
                Party Wear Net Saree with Designer Border
              </h4>

              <p className="price">₹1500</p>

              <span className="delivery">Free Delivery</span>

              <div className="rating">
                <span className="star">4.5 ★</span>
                <span className="reviews">18,450 Reviews</span>
              </div>

              <button>Add to Cart</button>
            </div> */}

          </div>
        </section>
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
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="#">Contact</a></li>
      <li><a href="#">Login</a></li>
    </ul>
  </div>

  <div className="footer-section">
    <h3>Customer Service</h3>
    <ul>
      <li><a href="#">Help & Support</a></li>
      <li><a href="#">Shipping Info</a></li>
      <li><a href="#">Return Policy</a></li>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms & Conditions</a></li>
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

export default Short_tops;
