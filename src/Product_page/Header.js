
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "./girl.jfif";
import { Link } from "react-router-dom";
import "./Header.css";
import SearchBar from "./SearchBar";




function Header() {



  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleItem = () => {
    setOpen(!open);
  };
     const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const userData = localStorage.getItem("user");

// const loginuser =
//   userData && userData !== "undefined"
//     ? JSON.parse(userData)
//     : null;
   const [count, setCount] = useState(0);

   const getUserFromStorage = () => {
  const data = localStorage.getItem("user");

  if (!data || data === "undefined") return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

 const getcount = async () => {
  // const userData = localStorage.getItem("user");

  // const user =
  //   userData && userData !== "undefined"
  //     ? JSON.parse(userData)
  //     : null;
 const user = getUserFromStorage();
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
  // const userData = localStorage.getItem("user");

  // const user =
  //   userData && userData !== "undefined"
  //     ? JSON.parse(userData)
  //     : null;
   const user = getUserFromStorage();

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

const loginuser = getUserFromStorage();
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
         
        {/* <div className="searchbox">
          <i className="search-icon fas fa-search"></i>
          <input type="text" placeholder="Search your product" />
        </div> */}

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
            <Link to={`/userprofile`} className="dropdown-item">
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
                localStorage.removeItem("token");
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
      
        <button onClick={toggleItem} 
          className="dropdown-button">Login</button>
      
      {open && (
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





      
   
    </>
  );
}

export default Header;
