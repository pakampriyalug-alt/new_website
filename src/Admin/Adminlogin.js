import React, { useState } from "react";
import axios from "axios";
import img from "./photo1.avif";
function AdminLogin() {
      const divstyle1 = {
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              width: "100%",
            
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height:"100vh",
      
          };
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/adminlogin", form);

      alert(res.data.message);

      // Save admin data
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      // Redirect
      window.location.href = "/admin/dashboard";

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <>
        
        <div className="auth-container" style={divstyle1}>
    
          <form className="auth-card" onSubmit={handleLogin} >
            <h2>Admin Login</h2>
    
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
    
            <button type="submit">Login</button>
    
    
          </form>
    
        </div>
        
        </> 
    // <div style={{ textAlign: "center" }}>
    //   <h2>Admin Login</h2>

    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Enter email"
    //       onChange={handleChange}
    //     /><br /><br />

    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Enter password"
    //       onChange={handleChange}
    //     /><br /><br />

    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
}

export default AdminLogin;