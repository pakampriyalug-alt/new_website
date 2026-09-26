import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";
import img from "./beg5.avif";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Categorybar from "./Categorybar";



function Footware({getwishlistcount}) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchWishlist = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const res = await axios.get("http://localhost:4000/getwishlist", {
        params: { userId: user._id },
      });

      const ids = res.data.map((item) => item.productId._id.toString());
      setWishlistIds(ids);
    } catch (err) {
      console.log("Fetch wishlist error:", err);
    }
  }, []);

    const addTowish = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Login first");
    return;
  }

  try {
    await axios.post("http://localhost:4000/addwish", {
      userId: user._id,
      productId: product._id,
    });

    window.location.reload();
    getwishlistcount();

  } catch (err) {
    console.log(err);
  }
};
const toggleWishlist = async (product) => {
  if (wishlistIds.includes(product._id)) {
    await removeFromWish(product);
  } else {
    await addTowish(product);
  }

  fetchWishlist(); // 🔥 sync after action
};
const removeFromWish = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await axios.delete("http://localhost:4000/removewishlist", {
      data: {
        userId: user._id,
        productId: product._id,
      },
    });

    // 🔥 UPDATE COUNT
    window.location.reload();
    getwishlistcount();

  } catch (err) {
    console.log(err);
  }
};
  const getProducts = useCallback(async () => {
    try {
      const adminProducts = await axios.get("http://localhost:4000/viewproduct");
      const sellerProducts = await axios.get("http://localhost:4000/sellerallproduct");

      const mergedProducts = [...adminProducts.data, ...sellerProducts.data];
      setProducts(mergedProducts);
      setFilteredProducts(mergedProducts);
    } catch (err) {
      console.log("Product fetch error", err);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const filterByCategory = (cat) => {
    setSelectedCategory(cat);
  };
  return (
    <>
      <Header />
      <Categorybar/>
       <div className="conadmin">
                {/* <div className="adcon">
                    <h3 style={{marginBottom:"20px",padding:"10px"}}>Filter</h3>
                      <ul className="adul">
                        <li className="adlink"onClick={() => filterByCategory("All")}>All</li>
                        <hr></hr>
                           <li className="adlink"onClick={() => filterByCategory("Shoes")}>Shoes</li>
                           <hr></hr>
                              <li className="adlink"onClick={() => filterByCategory("Sandals")}>Sandals</li>
                              <hr></hr>
                                 <li className="adlink"onClick={() => filterByCategory("Slippers")}>Slippers</li>
                                 <hr></hr>
                        </ul>
                  
                </div> */}
                 <div className="filter-sidebar">

    <h3 className="filter-title">
      <i className="fa-solid fa-filter"></i> Filters
    </h3>

    <ul className="filter-list">
      <li onClick={() => filterByCategory("All")} className="filter-item active">
        <i className="fa-solid fa-border-all"></i>
        <span>All</span>
      </li>

      <li onClick={() => filterByCategory("Shoes")} className="filter-item">
      <i className="fa-solid fa-shoe-prints"></i>
        <span>Shoes</span>
      </li>

      <li onClick={() => filterByCategory("Sandals")} className="filter-item">
      <i className="fa-solid fa-shoe-prints"></i>
        <span>Sandals</span>
      </li>

      <li onClick={() => filterByCategory("Slippers")} className="filter-item">
       <i className="fa-solid fa-shoe-prints"></i>
        <span>Slippers</span>
      </li>

     
    </ul>

  </div>
                <div className="navright">
                     
      <div className="home-container">
        <section className="products">
         <div className="page-header">
  <h1 className="page-title">Shoes</h1>
  <p className="page-subtitle">Trending collections with free delivery</p>
</div>


          <div className="product-grid">
             {filteredProducts
              .filter(p =>
  p.Category === "Footware" && 
  (selectedCategory === "All" || p.Subcategory === selectedCategory)
)
    
             .map(p => (
                <div className="product-card" key={p._id}>
              {/* <img src={image5} alt="Silk Saree" /> */}
                  <i
      className="fa-solid fa-heart"
      style={{
        cursor: "pointer",
        fontSize: "20px",
        color: wishlistIds.includes(p._id) ? "red" : " #cdcdc2",
      }}
      onClick={() => toggleWishlist(p)}
    ></i>
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
      <li><a href="products">Products</a></li>
      <li><a href="contact">Contact</a></li>
      <li><a href="login">Login</a></li>
    </ul>
  </div>

  <div className="footer-section">
    <h3>Customer Service</h3>
    <ul>
      <li><a href="help">Help & Support</a></li>
      <li><a href="shipping">Shipping Info</a></li>
      <li><a href="returns">Return Policy</a></li>
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

export default Footware;
