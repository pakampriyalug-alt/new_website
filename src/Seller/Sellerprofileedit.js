import React, { useState,useEffect } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";





function Sellerprofileedit(){
    const [sOpen, setSopen] = useState(false);

  const [data, setData] = useState({
    products: 0,
   
    orders: 0,
    totalSales: 0,
  });

  const toggleseller = () => {
    setSopen(!sOpen);
  };
  const sellerData = localStorage.getItem("seller");

  const loginseller =
    sellerData && sellerData !== "undefined"
      ? JSON.parse(sellerData)
      : null;
  const sellerId = loginseller?._id;

  useEffect(() => {
    const sellerData = JSON.parse(localStorage.getItem("seller") || "{}");
    const sellerId = sellerData._id;
    console.log(sellerId);
    if (!sellerId) return;

    axios
      .get(`http://localhost:4000/getsellerdashboard/${sellerId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const seller = JSON.parse(localStorage.getItem("seller"));

    const { id } = useParams();
    const navigate=useNavigate();
const handleCancel = () => {
    navigate(-1);
  };
const [user,setUser] = useState({
name:"",
email:"",
mobile:"",
shopname:"",
shopaddress:""
});
useEffect(() => {
  const stored = localStorage.getItem("seller");

  if (stored) {
    const data = JSON.parse(stored);
    setUser(data);
  }
}, []);

const handleChange = (e)=>{
setUser({
...user,
[e.target.name]:e.target.value
});

};

const updateProfile = async(e)=>{
e.preventDefault();

const res = await axios.put(
  `http://localhost:4000/sellerupdate/${seller._id}`,
  user
);

alert(res.data.message);
 navigate(-1);

/* update localStorage */
localStorage.setItem(
  "seller",
  JSON.stringify(res.data.seller || res.data.user)
);

};

return(
<>
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

      {/* MAIN */}
      <div className="main">
        {/* HEADER */}
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
        <div className="content">
    <div className="auth-container">

<form className="auth-card"onSubmit={updateProfile}>
<h2>Edit Seller Profile</h2>
<input
name="name"
value={user.name}
onChange={handleChange}
/>

<input
name="email"
value={user.email}
onChange={handleChange}
/>

<input
name="mobile"
value={user.mobile}
onChange={handleChange}
/>

<textarea
name="shopname"
value={user.shopname}
onChange={handleChange}
/>

<textarea
name="shopaddress"
value={user.shopaddress}
onChange={handleChange}
/>
<button type="submit">Save</button>
<button type="button"onClick={handleCancel}>cancel</button>

</form>
</div>
</div>
</div>
</div>
</>
);

}

export default Sellerprofileedit;