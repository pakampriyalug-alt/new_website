import React from "react";
import "./OrderSuccess.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      <div className="success-container">
        <div className="success-card">

          <div className="success-icon">
            ✔
          </div>

          <h2>Order Placed Successfully!</h2>

          <p>
            Thank you for shopping with us.  
            Your order has been confirmed.
          </p>

          <div className="success-buttons">
            <button
              className="home-btn"
              onClick={() => navigate("/")}
            >
              Go To Home
            </button>

            <button
              className="orders-btn"
              onClick={() => navigate("/orders")}
            >
              View Orders
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default OrderSuccess;
