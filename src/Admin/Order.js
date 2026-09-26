import "./Dashboard.css";
import img from "./download (1).jfif";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";       

function Order() {

  const [orders, setOrders] = useState([]);
  const [Status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/order/admin/all"
        );
        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  const clearForm = () => {
    setStatus("");
    setSelectedOrderId(null);
  };

  const handleCancel = () => {
    clearForm();
    setShowForm(false);
  };

 const handleEditClick = (orderId, productId, currentStatus) => {
  setSelectedOrderId(orderId);
  setSelectedProductId(productId);  
  setStatus(currentStatus || "Pending");
  setShowForm(true);
};

const handleUpdateStatus = async () => {
  console.log("DATA:", selectedOrderId, selectedProductId, Status);

  try {
    await axios.put(
      "http://localhost:4000/api/order/admin/update-delivery",
      {
        orderId: selectedOrderId,
        productId: selectedProductId,
        deliveryStatus: Status
      }
    );

    const res = await axios.get(
      "http://localhost:4000/api/order/admin/all"
    );
    setOrders(res.data.orders);
    handleCancel();

  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="app">

      {/* SIDEBAR */}
     <aside className="sidebar">
          <div className="logo">
            <span>Go</span>
            <span>Style</span>
          </div>
        
          <ul className="menu">
            <li><Link to="/admin/dashboard" style={{textDecoration:"none",color:"black"}}><i class="fa fa-dashboard" style={{fontSize:"20px"}}></i>Dashboard</Link></li>
                <li><Link to="/admin/category" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-layer-group"></i> Category</Link></li>
             
            <li><Link to="/admin/product" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
        
            <li  className="active"><Link to="/admin/order" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
            <li>
            <Link to="/sellerdetails" className="link">
             <i class="fa-solid fa-users"></i> Seller Details
            </Link>
          </li>
            <li><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}> <i class="fa-solid fa-user"></i> Users</Link></li>
            <li><Link to="/admin/contact" style={{textDecoration:"none",color:"black"}}><i class="fa fa-address-book" aria-hidden="true"></i> Contact</Link></li>
            <li><i class="fa-solid fa-gear"></i> Settings</li>
            <li><i class="fa-solid fa-right-from-bracket"></i> Lagout</li>
          </ul>
        </aside>

      {/* MAIN */}
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
          <div className="profile">
            <img src={img} alt="" />
            <span>Admin</span>
          </div>
        </header>

    
        {showForm ? (
          <div>
            <h3>Update Delivery Status</h3>

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

              <div className="btn-group">
                <button className="add-btn" onClick={() => {
            console.log("CLICKED");   // ✅ debug
                handleUpdateStatus();
                    }}>
                   Update
               </button>

                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
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

              {orders.map(order =>
            order.products
             .filter(item => !item.Sellerid)
            .map((item, index) => (
             <tr key={index}>

      <td>{order._id.slice(-6)}</td>
      <td>{order.userId.slice(-6)}</td>
      <td>{order.shippingAddress?.fullName}</td>

      <td>{item.productName}</td>

      <td>₹ {item.price * item.quantity}</td>

      <td>{order.paymentMethod}</td>

      {/* ✅ PRODUCT LEVEL STATUS */}
      <td>{item.deliveryStatus}</td>

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

export default Order;
