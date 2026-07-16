import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";
import "./Buynow.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import img from "./wwww.png";

function Buynow() {
 const{id}=useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  
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
    try {

      const orderId = localStorage.getItem("orderId");

      console.log("OrderId from LocalStorage:", orderId);

      if (!orderId) {
        alert("Order not found. Please try Buy Now again.");
        return;
      }

      await axios.put(
        `http://localhost:4000/api/order/shipping/${orderId}`,
        { shippingAddress: formData }
      );

      alert("Shipping Saved Successfully");

      navigate(`/paymentpage`);

    } catch (error) {
      console.log("Shipping Error:", error);
      alert("Shipping Save Failed");
    }
  };

  // Cancel Button
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />

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

export default Buynow;