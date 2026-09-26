import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Userprofile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sellerprofile() {


  const [sOpen, setSOpen] = useState(false);

  const [data, setData] = useState({
    products: 0,
   
    orders: 0,
    totalSales: 0,
  });

  const toggleseller = () => {
    setSOpen(!sOpen);
  };
  const sellerData = localStorage.getItem("seller");

  const loginseller =
    sellerData && sellerData !== "undefined"
      ? JSON.parse(sellerData)
      : null;
  const sellerId = loginseller?._id;

  useEffect(() => {
    const fetchDashboard = async () => {
      const sellerData = JSON.parse(localStorage.getItem("seller") || "{}");
      const sellerId = sellerData._id;
      console.log(sellerId);
      if (!sellerId) return;

      try {
        const res = await axios.get(`http://localhost:4000/getsellerdashboard/${sellerId}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDashboard();
  }, []);
  const seller = JSON.parse(localStorage.getItem("seller"));


  
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
const navigate=useNavigate();
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get("http://localhost:4000/sellerprofile", {
       headers: {
  Authorization: `Bearer ${token}`,
},
      });

      setUser(res.data);

    } catch (err) {
      console.log(err);
     
    }
  };

  fetchProfile();
}, [navigate]);

// ✅ Prevent crash
if (!user) {
  return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
}

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
const handeledit=()=>{
   navigate("/sellerprofileedit")
}
  return (
    <>
      {/* <Header/> */}
       <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <span>Go</span>
          <span>Style</span>
        </div>

        <ul className="menu">
          <li className="active">
            <Link to="/sellerdashboard" className="link">
              <i className="fa fa-dashboard icon-md"></i> Dashboard
            </Link>
          </li>
          {/* 
          <li>
            <Link to="/sellercategory" className="link">
              <i className="fa-solid fa-layer-group"></i> Category
            </Link>
          </li> */}

          <li>
            <Link to="/sellerproduct" className="link">
              <i className="fa-solid fa-cart-shopping"></i> Products
            </Link>
          </li>

          <li>
            <Link to={`/sellerorder/${seller._id}`} className="link">
              <i className="fa-solid fa-receipt"></i> Orders
            </Link>
          </li>



          <li>
            <i className="fa-solid fa-gear"></i> Settings
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("admin");
              alert("Seller Logout Successfully");
              navigate("/quicklogin");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </li>
        </ul>
      </aside>
       <div className="main">
       <header className="header">
          <h2>Profile</h2>

          <div className="search-box">
            <i className="fa fa-search search-icon"></i>
            <input
              className="search"
              placeholder="Search your product"
            />
          </div>
          {/* 
          <div className="profile">
            <img src={img} alt="admin" />
            <span>{seller?.name}</span>
          </div> */}
          {
            loginseller ? (
              <div className="profile">





                <i class="fa-solid fa-circle-user usericon" onClick={toggleseller}></i>
                <span className="username"> {loginseller.name}</span>



                {sOpen && (
                  <div className="profile-dropdown">
                    <Link to={`/sellerprofile/${sellerId}`} className="dropdown-item">
                      Profile
                    </Link>

                    {/* <Link to="/sellerdashboard" className="dropdown-item">
                    Dashboard
                  </Link> */}

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
        </header>
        
        
{/*      
      <div className="profile-container">
        <div className="profile-card">

          <div className="profile-top">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              className="profile-img"
            />
            <h2>{user.name}</h2>
          </div>

          <div className="profile-info">
            <p><span>Email:</span> {user.email}</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div> */}
      <div className="content">
 <div className="profile-container">
  <div className="profile-card">

    <div className="profile-header">
     <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              ></img>
      <h2>{user.name}</h2>
      <p>Seller</p>
    </div>

    <div className="profile-body">
      <h3>Information</h3>

      <div className="info-grid">
        <div>
          <span><i class="fa-solid fa-envelope"></i>Email</span>
          <p>{user.email}</p>
        </div>

        <div>
          <span><i class="fa-solid fa-phone"></i>Phone</span>
          <p>{user.mobile}</p>
        </div>

        <div>
          <span><i class="fa-solid fa-address-book"></i>Shop Name</span>
          <p>{user.shopname}</p>
        </div>
         <div>
          <span><i class="fa-solid fa-address-book"></i>Shop Address</span>
          <p>{user.shopaddress}</p>
        </div>
      
      </div>

      <button className="infobutton" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</button>
      <button className="infobutton2" onClick={handeledit}><i class="fa-solid fa-pen-to-square"></i>Edit</button>
    </div>

  </div>
</div>
</div>
</div>
</div>
    </>
  );
}

export default Sellerprofile;