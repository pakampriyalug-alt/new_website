import React, { useState } from "react";
import "./Paymentpage.css";
import Header from "./Header";
import "./Saree.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Categorybar from "./Categorybar";
import Swal from "sweetalert2";
function Paymentpage() {

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
const handlePlaceOrder = async () => {

  if (!paymentMethod) {
    alert("Select Payment Method");
    return;
  }

  try {
    setLoading(true);

    const orderId = localStorage.getItem("orderId");

    if (!orderId) {
      Swal.fire({
  title: "Order not found",
  text: "That thing is still around?",
  icon: "question"
});
      return;
    }

    await axios.put(
      `http://localhost:4000/api/order/payment/${orderId}`,
      {
        paymentMethod: paymentMethod
      }
    );

    Swal.fire({
  title: "Order PLaced Successfully!",
  icon: "success",
  draggable: true
});

    localStorage.removeItem("orderId");

    navigate("/ordersuccess");

  } catch (error) {
    console.log(error);
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Payment Failed!",
});
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Header/>
      <Categorybar/>
      <div className="payment-container">

        <div className="payment-card">
          <h2>Payment Method</h2>

          <div className="radio-group">

            {/* UPI */}
            <label className="radio-box">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>UPI Payment</span>
            </label>

            {/* COD */}
            <label className="radio-box">
              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash On Delivery</span>
            </label>

          </div>

          <button
            className="continue-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing..." : "Place Order"}
          </button>

        </div>

      </div>
    </>
  );
}

export default Paymentpage;
