import { useState } from "react";
import "./ContactUs.css";
import Header from "./Header";
import img from "./img6.webp";
import axios from "axios";
function ContactUs() {
const divstyle = {
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          width: "100%",
    
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
       
  
      };
      const[name,setName]=useState("");
      const[email,setEmail]=useState("");
      const[message,setMessage]=useState("");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   message: ""
  // });
  

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };
  const addProduct = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:4000/addcontact", {
      name,
      email,
      message
    });

    alert("Message sent successfully");
    clearForm();

  } catch (err) {
    console.log(err.response?.data);
  }
};
const clearForm=()=>{
  setName("");
  setEmail("");
  setMessage("");
}

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.name || !formData.email || !formData.message) {
  //     alert("All fields required");
  //     return;
  //   }

  //   const formData = new FormData();
   
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("message", message);
   

  //   try {
  //     await axios.post("http://localhost:4000/addcontact", formData);
  //     alert("Contact Added");
     
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <>
      <Header />
     
     <div  style={divstyle}></div>
      <div className="contact-page">

        <div className="contact-card">

          {/* LEFT CONTACT DETAILS */}
          <div className="contact-left">
            <h2>Get In Touch</h2>

            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <h4>Address</h4>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>support@gostyle.com</p>
              </div>
            </div>

            <div className="social">
              <span>●</span>
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-right">
            <h3>Send a Message</h3>

            <form onSubmit={addProduct}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                 onChange={e => setName(e.target.value)}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail address"
                value={email}
                 onChange={e => setEmail(e.target.value)}
                required
              />

              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={message}
                 onChange={e => setMessage(e.target.value)}
                required
              />

              <button type="submit">Submit</button>
            </form>
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
      <li><a href="product">Products</a></li>
      <li><a href="contc">Contact</a></li>
      <li><a href="login">Login</a></li>
    </ul>
  </div>

  <div className="footer-section">
    <h3>Customer Service</h3>
    <ul>
      <li><a href="help">Help & Support</a></li>
      <li><a href="shipping">Shipping Info</a></li>
      <li><a href="reurn">Return Policy</a></li>
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

export default ContactUs;
