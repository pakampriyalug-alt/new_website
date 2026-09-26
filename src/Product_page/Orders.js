import React, { useEffect, useState } from "react";
import "./Orders.css";
import Header from "./Header";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        const res = await axios.get(
          `http://localhost:4000/api/order/user/${userId}`
        );

        setOrders(res.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Header />

      {/* <div className="ordercontainer">
        <div className="orderfirstcontainer">

          {orders.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            orders.map((order) => (
              <div className="order-card" key={order._id}>

                
                {order.products?.map((item, index) => (
                  <div className="order-details" key={index}>

                    <img
                      src={`http://localhost:4000/uploads/${item.image}`}
                      alt={item.productName}
                      className="order-img"
                    />

                    <div className="section product-section">
                      <p><b>{item.productName}</b></p>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <div className="section delivery-section">
                      <p>Status: {item.deliveryStatus || "Pending"}</p>
                      <p>
                        Ordered:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                  </div>
                ))}

                
                <div className="order-summary">

                  <div className="section payment-section">
                    <h5>Total Amount</h5>
                    <p>₹ {order.totalAmount}</p>
                  </div>

                  <div className="section payment-section">
                    <h5>Payment</h5>
                    <p>{order.paymentMethod || "Pending"}</p>
                  </div>

                  <div className="section delivery-section">
                    <h5>Order Status</h5>
                    <p>{order.deliveryStatus || "Processing"}</p>
                    <p>
                      Ordered:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </div>

              </div>
            ))
          )}

        </div>
      </div> */}
   <div className="orders-container">

  <h2>Your Orders</h2>

  {orders.map((order) => {

    // ✅ Calculate delivery date ONCE
    const orderDate = new Date(order.createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 7);

    return (
      <div className="order-card" key={order._id}>

        {/* TOP INFO BAR */}
        <div className="order-top">

          <div>
            <p className="label">Order ID</p>
            <p>#{order._id.slice(-6)}</p>
          </div>

          <div>
            <p className="label">Order Date</p>
            <p>{orderDate.toLocaleDateString()}</p>
          </div>

          {/* ✅ FIXED */}
          <div>
            <p className="label">Delivery Status</p>
            <p className="delivery-date">
              Expected by {deliveryDate.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="label">Payment</p>
            <p>{order.paymentMethod}</p>
          </div>

          <div>
            <p className="label">Total</p>
            <p>₹ {order.totalAmount}</p>
          </div>

        </div>

        {/* PRODUCTS */}
        {order.products.map((item, index) => (

          <div className="product-row" key={index}>

            <img
              src={`http://localhost:4000/uploads/${item.image}`}
              alt=""
            />

            <div className="product-info">
              <p className="name">{item.productName}</p>
              <p>Qty: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>

            {/* ✅ CLEAN PRICE */}
            <div className="product-price">
              ₹ {item.price}
            </div>

            {/* ✅ CLEAN STATUS */}
            <div className={`status ${item.deliveryStatus?.toLowerCase()}`}>
              {item.deliveryStatus || "Shipped"}
            </div>

          </div>

        ))}

      </div>
    );
  })}

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

export default Orders;
