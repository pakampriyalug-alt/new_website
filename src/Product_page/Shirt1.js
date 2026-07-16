import Header from "./Header";
import "./Homepage.css";
import "./frock.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Saree.css";
import { useParams } from "react-router-dom";
import Categorybar from "./Categorybar";

function Shirt1() {
const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewproduct")
      .then((res) => {
        const found = res.data.find((p) => p._id === id);
        setProduct(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
 
    if (!size) {
      alert("Please select size");
      return;
      
    }

    try {
     const res= await axios.post("http://localhost:4000/addcart", {
        productId: product._id,
        productName: product.Product,
        image: product.image,
        price: product.Price,
        size: size,
        quantity: quantity,
      });

      if(res.data.alreadyExists){
        alert("product is already in the cart")
      }
      else{
      alert("Product added to cart ");
      window.location.reload();
      }

    } catch (err) {
      console.log(err);
      alert("Failed to add to cart ");
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <>
      <Header />
      <Categorybar/>
      <div className="product-page">
        <div className="product-container">
          <div className="product-left">
            <img
              src={`http://localhost:4000/uploads/${product.image}`}
              alt="product"
              className="product-image"
            />
          </div>

          <div className="product-right">
            <div className="product-title">{product.Product}</div>
            <div className="product-rating">⭐ {product.Rating}</div>

            <div className="product-price">₹{product.Price}</div>
            <div className="product-old-price">₹400</div>

            <div className="product-description">
              Stylish women’s wear made from premium fabric.
            </div>

            <div className="product-field">
              <div className="product-label">Size</div>
              <select
                className="product-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Select Size</option>
                {product.Size?.split(",").map((s, i) => (
                  <option key={i} value={s.trim()}>
                    {s.trim()}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-field">
              <div className="product-label">Quantity</div>
              <input
                type="number"
                className="product-quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="product-buttons">
              <button className="btn-cart" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="btn-cart" style={{ background: "green" }}>
                Buy Now
              </button>
            </div>
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

export default Shirt1;
