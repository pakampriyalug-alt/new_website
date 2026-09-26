
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css";
import img from "./girl.jfif";
function Header() {
  const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);

     const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const userData = localStorage.getItem("user");

const loginuser =
  userData && userData !== "undefined"
    ? JSON.parse(userData)
    : null;
   const [count, setCount] = useState(0);

  useEffect(() => {
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
    getcount();
  }, []);
  const [wishlistcount, setWishlistcount] = useState(0);

useEffect(() => {
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
  getwishlistcount();
}, []);
  const [data, setData] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/viewuser");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
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
  return (
    <>
     <header className="headerbox">
        {/* LOGO */}
        <div className="logo">
          <span className="logo-circle">Go</span>
          <span className="logo-text">Style</span>
        </div>

        {/* SEARCH */}
        <div className="searchbox">
          <i className="search-icon fas fa-search"></i>
          <input type="text" placeholder="Search your product" />
        </div>

        {/* NAVBAR */}
        <ul className="boxlist">
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
        </ul>

    <div className="actions">

  <span className="wishlist" >
    <Link to="/wishlist">
      <i className="fa-solid fa-heart"></i>
    </Link>
     {wishlistcount > 0 && <span className="cart-badge2" style={{backgroundColor:"#ef4444;"}}>{wishlistcount}</span>}
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
            <Link to={`/userprofile/${id}`} className="dropdown-item">
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
      <Link to="/login">
        <button>Login</button>
      </Link>
    )
  }

</div>
      </header>





      
   
    </>
  );
}

export default Header;
