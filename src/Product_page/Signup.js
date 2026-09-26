import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "./photo1.avif";
function Signup() {
  const divstyle1 = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "700px",
  };
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile:"",
    address:"", 
    gender:"",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {
      if (user.mobile.length !== 10) {
  alert("Enter valid 10 digit mobile number");
  return;
}
    // Required
    if (!user.name || !user.email || !user.password ||!user.mobile 
      || !user.address  ||!user.gender
    ) {
      alert("All fields required");
      return;
    }

    // Email Check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      alert("Invalid Email");
      return;
    }

    // Password Check
    if (user.password.length < 8) {
      alert("Password must be 8 characters");
      return;
    }

    const res = await axios.post(
      "http://localhost:4000/register",
      user
    );

    alert(res.data.message);
  };



  return (
    <>
    <div className="auth-container" style={divstyle1}>
      <form className="auth-card" onSubmit={(e) => {
        e.preventDefault();
        register();
      }}>
       <div className="para">
        <Link to="">User</Link>
        <Link to="./quicksignup">Seller</Link>
        </div>
        <h2> User Signup</h2>

        <input
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          name="mobile"
          placeholder="mobile"
          type="tel"
          value={user.mobile}
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="address"
          value={user.address}
          onChange={handleChange}
        />
      

            <label>Gender</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              <span>male</span>
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              <span>female</span>
            </label>

          
            
        <button type="submit" >Signup</button>

        <p>
          Already have account?
          <Link to="/login" > Login</Link>
        </p>

      </form>

    </div>
    
    </>
  );

}
export default Signup;

