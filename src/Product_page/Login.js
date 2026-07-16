import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import img from "./photo1.avif";

import Header from "./Header";
function Login() {

  const divstyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    width: "350px",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "400px",

  };
  const divstyle1 = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    width: "100%",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "500px",

  };
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: ""
  // });

  // // const handleChange = (e) => {

  // //   setFormData({
  // //     ...formData,
  // //     [e.target.name]: e.target.value
  // //   });
  // // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (email.trim() === "") {

  //     return;
  //   }
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };


  // try {

  //   const res = await axios.post(
  //     "http://localhost:4000/api/auth/login",
  //     formData
  //   );

  //   localStorage.setItem("userId", res.data.user._id);

  //   alert("Login Success");

  //   navigate("/");

  // } catch (error) {
  //   alert("Login Failed");
  // }
  const loginUser = async (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      alert("Enter Email & Password");
      return;
    }


    try {
      const res = await axios.post(
        "http://localhost:4000/userlogin", // ✅ FIXED
        login
      );

      // ✅ CHECK BEFORE STORING
      // if (res.data.user) {
      //   localStorage.setItem("user", JSON.stringify(res.data.user));
      //   localStorage.setItem("userprofileId", res.data.user._id);

      //   navigate("/");
      // } 
      if (res.data.user) {
          localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userprofileId", res.data.user._id);
        localStorage.setItem("role","user");
        navigate("/");
      } else {
        alert(res.data.message);
      }


    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container" style={divstyle1}>

        <form className="auth-card" onSubmit={loginUser} >
          <h2>Login</h2>

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

          <p>
            Don't have account?
            <Link to="/signup" > Signup</Link>
          </p>

        </form>

      </div>

    </>
  );
}
export default Login;
// import React, { useState } from "react";
// import axios from "axios";

// function Login() {

//   const [login, setLogin] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setLogin({
//       ...login,
//       [e.target.name]: e.target.value
//     });
//   };

//   const loginUser = async () => {

//     if (!login.email || !login.password) {
//       alert("Enter Email & Password");
//       return;
//     }

//     const res = await axios.post(
//       "http://localhost:4000/userlogin",
//       login
//     );

//     alert(res.data.message);
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//       /><br/><br/>

//       <input
//         name="password"
//         placeholder="Password"
//         type="password"
//         onChange={handleChange}
//       /><br/><br/>

//       <button onClick={loginUser}>Login</button>
//     </div>
//   );
// }

// export default Login;
