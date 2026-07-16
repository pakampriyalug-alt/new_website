import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Buynow.css";
import "./Header.css";
import img from "./wwww.png";
import Header from "./Header";

function Addressform() {
  const navigate = useNavigate();

const{id}=useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
const handleCancel = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
     if (formData.mobile.length !== 10) {
  alert("Enter valid 10 digit mobile number");
  return;
}
 if (formData.pincode.length !== 6) {
  alert("Enter valid 6 pincode number");
  return;
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(formData.email)) {
  alert("Invalid email format");
  return;
}
    const user = JSON.parse(localStorage.getItem("user"));
 
    try {
       const res = await axios.post("http://localhost:4000/api/order/cart", {
  userId: user._id,
  shippingAddress: formData,
});

      console.log("ORDER RESPONSE:", res.data);  // 👈 ADD THIS

localStorage.setItem("orderId", res.data.orderId);

      
      navigate("/paymentpage");

    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };
// try {

//   const response = await axios.post("http://localhost:4000/api/order/cart", {
//     userId: user._id,
//     shippingAddress: formData,
//   });


//   const orderId = response.data.id; 
//   console.log("Created Order ID:", orderId);
//  navigate("/paymentpage");
// } catch (error) {
//   console.error("Error creating order:", error);
// }

  return (
    <>
    <Header/>
    <div className="shipping-container">

        {/* LEFT IMAGE */}
        <div className="left-side">
          <img src={img} alt="Location" />
        </div>

        {/* RIGHT FORM */}
        <div className="right-side">
          <form className="shipping-form" onSubmit={handleSubmit}>

            <h2>Shipping Details</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />

            <div className="button-row">

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-btn"
              >
                Continue
              </button>

            </div>

          </form>
        </div>

      </div>
      </>
  );
}

export default Addressform;