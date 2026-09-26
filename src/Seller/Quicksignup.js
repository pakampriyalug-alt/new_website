import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link } from "react-router-dom";

import img from "./photo1.avif";

import Header from "./Header";
function Quicksignup() {


const divstyle1 = {
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          width: "100%",
        
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height:"700px",
  
      };
 
 
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: ""
  // });

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.tar get.name]: e.target.value
  //   });
  // };

  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   try {

  //     await axios.post(
  //       "http://localhost:4000/api/auth/signup",
  //       formData
  //     );

  //     alert("Signup Success");

  //     navigate("/login");

  //   } catch (error) {
  //     alert("Signup Failed");
  //   }
 
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile:"",
    shopname:"",
    shopaddress:"", 
    
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
  try {

    if (user.mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    if (!user.name || !user.email || !user.password || !user.mobile || !user.shopname || !user.shopaddress) {
      alert("All fields required");
      return;
    }

    const res = await axios.post(
      "http://localhost:4000/sellerregadded",
      user
    );

    console.log(res.data);
    alert(res.data.message);

  } catch (error) {
    console.log("Error:", error.response);
    alert(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <>
    <Header/>
    <div className="auth-container" style={divstyle1} >

      <form className="auth-card" onSubmit={(e)=>{
  e.preventDefault();
  register()}}>
        <h2> Seller Signup</h2>

         <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
      />
      <input
        name="mobile"
        placeholder="mobile"
        type="text"
        maxLength={10}
        onChange={handleChange}
      />
       <input
        name="shopname"
        placeholder="shopname"
      
        onChange={handleChange}
      />
      <textarea
        name="shopaddress"
        placeholder="shopaddress"
        type="address"
        onChange={handleChange}
      />
      

            
        <button type="submit" >Signup</button>

        <p>
          Already have account?
          <Link to="/quicklogin" > Login</Link>
        </p>

      </form>

    </div>
    
    </>
  );

}
export default Quicksignup;

