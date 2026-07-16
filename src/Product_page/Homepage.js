import "./Homepage.css";
import Header from "./Header";
import { useState,useEffect } from "react";
import banner2 from "./banner2.webp";
import { useNavigate } from "react-router-dom";
import bannerimg from "./sareebanner.avif";
import bannerimg2 from "./imgbanner7.jpg";
import bannerimg3 from "./img4.avif";
import Categorybar from "./Categorybar";
import axios from "axios";



import img from "./girl.jfif";
import "./Header.css";
import img9 from "./6c3c5fe2-c236-4fa2-8d97-595e1e01da01.webp";
import { Link } from "react-router-dom";
function Homepage(){
  const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [sOpen,setSopen]=useState(false);

    const toggleseller =()=>{
      setSopen(!sOpen);
    };
     const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userData = localStorage.getItem("user");

const loginuser =
  userData && userData !== "undefined"
    ? JSON.parse(userData)
    : null;

     const sellerData = localStorage.getItem("seller");

const loginseller =
  sellerData && sellerData !== "undefined"
    ? JSON.parse(sellerData)
    : null;
    
   const [count, setCount] = useState(0);

  const getcount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

  
    if (!user) {
      setCount(0);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:4000/cartcount/${user._id}`
      );

      setCount(res.data.count); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getcount();
  }, []);
  const [wishlistcount, setWishlistcount] = useState(0);

const getwishlistcount = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    setWishlistcount(0);
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:4000/wishcount/${user._id}`
    );

    setWishlistcount(res.data.count);
  } catch (err) {
    console.log(err);
  }
};


useEffect(() => {
  getwishlistcount();
}, []);
  const [data, setData] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/viewuser")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.Category]) {
      acc[item.Category] = {
        image: item.image,
        subs: [],
      };
    }
    acc[item.Category].subs.push(item.Subcategory);
    return acc;
  }, {});
const id = loginuser?._id;

const sellerId = loginseller?._id;

     const [open, setOpen] = useState(null);

  const toggle = (name) => {
    setOpen(open === name ? null : name);
  };
   const images = [
    bannerimg,
    bannerimg2,
    bannerimg3,
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(auto);
  }, [images.length]);
  const[Categories,setCategories]=useState([]);
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/viewuser");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
     
         <header className="headerbox">
              {/* LOGO */}
              <div className="logo">
                <span className="logo-circle">Go</span>
                <span className="logo-text">Style</span>
              </div>
      
            
              {/* NAVBAR */}
              <ul className="boxlist" >
                <li className="boxullist">
                  <a href="/">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="boxullist">
                  <a href="/aboutus">
                    <i className="fas fa-info-circle"></i> About Us
                  </a>
                </li>
                <li className="boxullist">
                  <a href="/allproduct">
                    <i className="fas fa-box-open"></i> Products
                  </a>
                </li>
                <li className="boxullist">
                  <a href="/contactus">
                    <i className="fas fa-phone"></i> Contact Us
                  </a>
                </li>
               {/* <li>
                  {
          loginseller ? (
            <div className="profile">
               
                
                
              
            
                <i class="fa-solid fa-circle-user usericon"onClick={toggleseller}></i>
               <span className="username"> {loginseller.name}</span>
                
              
      
              {sOpen && (
                <div className="profile-dropdown">
                  <Link to={`/sellerprofile/${sellerId}`} className="dropdown-item">
                    Profile
                  </Link>
      
                  <Link to="/sellerdashboard" className="dropdown-item">
                    Dashboard
                  </Link>

                  <div
                    className="dropdown-item logout"
                    onClick={() => {
                      localStorage.removeItem("seller");
                      alert("Seller Logout Successfully");
                      navigate("/");
                    }}
                  >
                    <i className="fa fa-sign-out"></i> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/quicklogin">
              <button className="quickseller">Quick Seller</button>
            </Link>
          )
        }
               </li> */}
              </ul>
      
          <div className="actions">
      
        <span className="wishlist" >
          <Link to="/wishlist">
            <i className="fa-solid fa-heart"></i>
          </Link>
           {wishlistcount > 0 && <span className="cart-badge2">{wishlistcount}</span>}
        </span>
      
        {/* 🛒 CART */}
        <span className="cart">
          <Link to="/addtocart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          {count > 0 && <span className="cart-badge">{count}</span>}
        </span>
      
        {/* 👤 PROFILE */}
        {
          loginuser ? (
            <div className="profile">
              <button 
                onClick={toggleMenu} 
                className="dropdown-button"
              >
                <img src={img} alt="profile" />
                {loginuser.name}
              </button>
      
              {isOpen && (
                <div className="profile-dropdown">
                  <Link to="/userprofile" className="dropdown-item">
                    Profile
                  </Link>
      
                  <Link to="/orders" className="dropdown-item">
                    My Orders
                  </Link>
       <Link to="/wishlist" className="dropdown-item">
                    My Wishlist
                  </Link>
                  <div
                    className="dropdown-item logout"
                    onClick={() => {
                      localStorage.removeItem("user");
                      alert("User Logout Successfully");
                      navigate("/");
                    }}
                  >
                    <i className="fa fa-sign-out"></i> Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
      
        <button onClick={toggleseller} 
          className="dropdown-button">Login</button>
      
      {sOpen && (
          <div className="profile-dropdown">
            <Link to="/login" className="dropdown-item">
            User Login
            </Link>
             <Link to="/quicklogin" className="dropdown-item">
            Seller Login
            </Link>
            </div>
      )}
       </>
          )
        }
      
      </div>
            </header>
    <Categorybar/>
      <div className="banner">
        
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="banner"
            className={i === index ? "active" : ""}
          />
        ))}
       
        <button className="nav prev" onClick={prevSlide}>
          &#10094;
        </button>

        <button className="nav next" onClick={nextSlide}>
          &#10095;
        </button>

        <div className="banner-text">
          <h1>New Fashion Arrivals</h1>
          <p>Discover the latest trends</p>
          <button>Shop Now</button>
        </div>
      </div>
      
      {/* <div className="category-box">
        
        <div className="category-box-banner"></div>
        <div className="category-boxes"></div>
         <div className="category-boxes"></div>
          <div className="category-boxes"></div>
           <div className="category-boxes"></div>
            <div className="category-boxes"></div>
      </div> */}
       <section className="shop-category">
  <h1>Trending Deals for Women </h1>

 
<div className="arrow">
<i class="fa-solid fa-arrow-right"></i>
</div>
{/* <div className="scroll-container">
  <div className="scroll-content">
    <div className="item">Item 1</div>
    <div className="item">Item 2</div>
    <div className="item">Item 3</div>
    <div className="item">Item 4</div>
  </div>
</div> */}

  <div className="scroll-container">
  <div className="scroll-content">
      {Categories
             .filter(p => p.Category === "Women")
           
             .map(p => (
                <div className="category-card" key={p._id}>
                <Link to="/category/women">
              <img src={`http://localhost:4000/uploads/${p.image}`} /></Link>

              

             

            </div>
               ))}
                {Categories
             .filter(p => p.Category === "kids")
             .slice(0, 4)
             .map(p => (
                <div className="category-card" key={p._id}>
                 <Link to="/category/kids">
              <img src={`http://localhost:4000/uploads/${p.image}`}  /></Link>
              
              

             

            </div>
               ))}
               {Categories
             .filter(p => p.Subcategory === "Shoes")
            
             .map(p => (
                <div className="category-card" key={p._id}>
                 <Link to="/category/shoes">
              <img src={`http://localhost:4000/uploads/${p.image}`}/></Link>
               
              

             

            </div>
               ))}
            
                {/* <img src={banner2} alt="banner2" style={{width:"220px",height:"300px",marginBottom:"40px"}}></img> */}
              
     </div>

  </div>
</section>
      <section className="shop-category">
  <h1>Trending Deals  </h1>
<div className="arrow">
<i class="fa-solid fa-arrow-right"></i>
</div>
  <div className="category-container">

      {Categories
             .filter(p => p.Category === "Men")
           
             .map(p => (
                <div className="category-card" key={p._id} >
                <Link to="/category/men">
              <img src={`http://localhost:4000/uploads/${p.image}`} /></Link>

              

             

            </div>
               ))}
                {Categories
             .filter(p => p.Category === "Accessories")
        
             .map(p => (
                <div className="category-card" key={p._id} >
                 
              <img src={`http://localhost:4000/uploads/${p.image}`}  />
              
              

             

            </div>
               ))}
             
            
                {/* <img src={banner2} alt="banner2" style={{width:"220px",height:"300px",marginBottom:"40px"}}></img> */}
              
     
  </div>
</section>
      

 <div className="cardbox">
  <div className="title"></div>
 <div className="con">
 
  <div className="parent">
     {Categories
             
             .filter(p => p.Category === "Accessories")
             .slice(0, 4)
             .map(p => (
                <div className="boxcon" key={p._id}>
               
              <img src={`http://localhost:4000/uploads/${p.image}`}  />
               <h6 style={{textAlign:"center"}}></h6>
              

             

            </div>
               ))}
    {/* <div className="boxcon"></div>
     <div className="boxcon"></div>
     <div className="boxcon"></div>
     <div className="boxcon"></div> */}
     </div>
     <div className="parent">
     {Categories
             
             .filter(p => p.Category === "Footware")
             .slice(0, 4)
             .map(p => (
                <div className="boxcon" key={p._id}>
                
              <img src={`http://localhost:4000/uploads/${p.image}`} />
               
              

             

            </div>
               ))}

    
     </div>
  
      <div className="parent">
      {Categories
             
             .filter(p => p.Category === "Men")
             .slice(0, 4)
             .map(p => (
                <div className="boxcon" key={p._id}>
                
              <img src={`http://localhost:4000/uploads/${p.image}`} />
               
              

             

            </div>
               ))}
     </div>
     </div>
     </div>
     
     


<div className="footer">
  <div className="footer-section">
    {/* <img src={logo} className="logo" /> */}
    <div className="logo">
          <span className="logo-circle">Go</span>
          <span className="logo-text footer-logo-text">Style</span>
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
   )
  
    
}
export default Homepage;