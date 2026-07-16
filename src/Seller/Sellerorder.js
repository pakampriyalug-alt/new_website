import "./Dashboard.css";

import axios from "axios";
import img from "./download (1).jfif";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SellerOrder() {
  const [sOpen, setSopen] = useState(false);
  const toggleseller = () => {
    setSopen(!sOpen);
  };
  const sellerData = localStorage.getItem("seller");

  const loginseller =
    sellerData && sellerData !== "undefined"
      ? JSON.parse(sellerData)
      : null;
  const sellerId = loginseller?._id;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [Status, setStatus] = useState("Pending");
  const [showForm, setShowForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const seller = JSON.parse(localStorage.getItem("seller"));

  useEffect(() => {
    if (seller?._id) {
      fetchOrders();
    }
  }, [seller?._id]);

  // ✅ FETCH ORDERS
  const fetchOrders = async () => {
    try {
      console.log("Seller ID:", seller._id);

      const res = await axios.get(
        `http://localhost:4000/api/order/seller/${seller._id}`
      );

      console.log("Orders:", res.data.orders);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  // ✅ OPEN UPDATE FORM
  const handleEditClick = (orderId, productId, currentStatus) => {
    console.log(orderId, productId, currentStatus);

    setSelectedOrderId(orderId);
    setSelectedProductId(productId);
    setStatus(currentStatus || "Pending");
    setShowForm(true);
  };

  // ✅ UPDATE STATUS
  const handleUpdateStatus = async () => {
    try {
      console.log("Updating:", {
        orderId: selectedOrderId,
        productId: selectedProductId,
        deliveryStatus: Status
      });

      await axios.put(
        "http://localhost:4000/api/order/seller/update-delivery",
        {
          orderId: selectedOrderId,
          productId: selectedProductId,
          deliveryStatus: Status
        }
      );

      alert("Status Updated ");

      fetchOrders();
      setShowForm(false);

    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  // ❌ NO SELLER
  if (!seller) {
    return <h3>Please login as seller</h3>;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span>Go</span>
          <span>Style</span>
        </div>

        <ul className="menu">
          <li>
            <Link to="/sellerdashboard" className="link">
              <i className="fa fa-dashboard icon-md"></i> Dashboard
            </Link>
          </li>

          {/* <li>
            <Link to="/sellercategory" className="link">
              <i className="fa-solid fa-layer-group"></i> Category
            </Link>
          </li> */}

          <li>
            <Link to="/sellerproduct" className="link">
              <i className="fa-solid fa-cart-shopping"></i> Products
            </Link>
          </li>

          <li className="active">
            <Link to={`/sellerorder/${seller._id}`} className="link">
              <i className="fa-solid fa-receipt"></i> Orders
            </Link>
          </li>



          <li>
            <i className="fa-solid fa-gear"></i> Settings
          </li>

          <li
            onClick={() => {
              localStorage.removeItem("admin");
              alert("Seller Logout Successfully");
              navigate("/quicklogin");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </li>
        </ul>
      </aside>
      <div className="main">

        <header className="header">
          <h2>Orders</h2>
          <div className="search-box">
            <i className="fa fa-search search-icon"></i>
            <input
              className="search"
              placeholder="Search your product"
            />
          </div>
          {/* <div className="profile">
                <img src={img} alt="" />
                <span>{seller?.name}</span>
              </div> */}
          {
            loginseller ? (
              <div className="profile">





                <i class="fa-solid fa-circle-user usericon" onClick={toggleseller}></i>
                <span className="username"> {loginseller.name}</span>



                {sOpen && (
                  <div className="profile-dropdown">
                    <Link to="/sellerprofile" className="dropdown-item">
                      Profile
                    </Link>

                    {/* <Link to="/sellerdashboard" className="dropdown-item">
                                  Dashboard
                                </Link> */}

                    <div
                      className="dropdown-item logout"
                      onClick={() => {
                        localStorage.removeItem("seller");
                        alert("Seller Logout Successfully");
                        navigate("/");
                      }}
                    >
                      <i className="fa fa-sign-out"></i> Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/quicklogin">
                <button className="quickseller">Quick Seller</button>
              </Link>
            )
          }
        </header>



        {showForm ? (
          <div>
            <h3>Update Status</h3>
            <div className="addcategorybox">

              <label>Status</label>
              <select
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>

              <br /><br />

              <div className="btn-group">
                <button className="add-btn" onClick={() => {
                  console.log("CLICKED");   // ✅ debug
                  handleUpdateStatus();
                }}>
                  Update
                </button>
                <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          </div>

        ) : (
          <div className="content">
            <div className="box">

              <h3>List of all Orders</h3>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>User Name</th>

                    <th>Product</th>
                    <th>Total Price</th>
                    <th>Payment</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>


                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5">No Orders Found</td>
                    </tr>
                  ) : (

                    orders.map(order =>
                      order.products.map((item, index) => (
                        <tr key={index}>

                          <td>{order._id.slice(-6)}</td>
                          <td>{order.userId.slice(-6)}</td>
                          <td>{order.shippingAddress?.fullName}</td>
                          <td>{item.productName}</td>

                          <td>₹ {item.price * item.quantity}</td>
                          <td>{order.paymentMethod}</td>
                          <td>{item.deliveryStatus || "Pending"}</td>

                          <td>
                            <button
                              className="actionbtn red"
                              onClick={() =>
                                handleEditClick(
                                  order._id,
                                  item.productId,
                                  item.deliveryStatus
                                )
                              }
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          </td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )
                  )}

                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default SellerOrder;