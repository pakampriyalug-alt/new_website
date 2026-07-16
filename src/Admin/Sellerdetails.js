import "./Dashboard.css";
import img from './download (1).jfif';

import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Sellerdetails(){
    const [Status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
    const [selectedSellerId, setSelectedSellerId] = useState(null);
       const [registers, setRegisters] = useState([]);
         const getRegisters = async () => {
           try {
             const res = await axios.get("http://localhost:4000/viewallseller");
             setRegisters(res.data);
             console.log(res.data);
           } catch (err) {
             console.log(err);
           }
         };
       
         useEffect(() => {
           getRegisters();
         }, []);
          const clearForm = () => {
    setStatus("");
    setSelectedSellerId(null);
  };
          const handleCancel = () => {
    clearForm();
    setShowForm(false);
  };

         const handleEditClick = (sellerId, currentStatus) => {
  setSelectedSellerId(sellerId);
  // ✅ IMPORTANT
  setStatus(currentStatus || "Pending");
  setShowForm(true);
};

const handleUpdateStatus = async () => {
  try {
    await axios.put("http://localhost:4000/updatesellerstatus", {
      sellerId: selectedSellerId,
      status: Status
    });

    await getRegisters(); // ✅ refresh table
    handleCancel();

  } catch (error) {
    console.log(error);
  }
};
           const deleteRegister = async (id) => {
             if (window.confirm("Are you sure?")) {
               await axios.delete(`http://localhost:4000/deleteseller/${id}`);
               getRegisters();
             }
           };
    return(
        <>
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
        
            <li><Link to="/admin/order" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
              <li>
            <Link to="/sellerdetails" className="link">
             <i class="fa-solid fa-users"></i> Seller Details
            </Link>
          </li>
            <li ><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-user"></i>  Users</Link></li>
                         <li><Link to="/admin/contact" style={{textDecoration:"none",color:"black"}}><i class="fa fa-address-book" aria-hidden="true"></i>  Contact</Link></li>
            <li><i class="fa-solid fa-gear"></i> Settings</li>
            <li><i class="fa-solid fa-right-from-bracket"></i> Logout</li>
          </ul>
        </aside>

        {/* MAIN */}
        <div className="main">
          <header className="header">
            <h2>Seller Details</h2>
                <div className="search-box">
  <i className="fa fa-search search-icon"></i>
  <input
    className="search"
    placeholder="Search your product"
  />
</div>
            <div className="profile">
              <img src={img} alt="" />
              <span style={{backgroundColor:"#16a34a",width:"60px",height:"30px",borderRadius:"5px",padding:"4px",color:"white"}}>Admin</span>
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
                <option>Approved</option>
                <option>Rejected</option>
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
              
              <h3>List of all User Details</h3>
              <table>
                <thead>
                  <tr>
                  
                    <th>Seller ID</th>
                    <th>Seller Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Shop Name</th>
                      <th>Shop Address</th>
                      <th>status</th>
                   
                    <th>Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                                   {registers.map((item) => (
                                     <tr key={item._id}>
                                       {/* <td>
                                         {item.image && (
                                          <img
                 src={`http://localhost:4000/uploads/${item.image}`}
                 alt="category"
                 width="40"
               />
               
                                         )}
                                       </td> */}
                                       
                                       <td>{item._id.slice(-6)}</td>
                                       <td>{item.name}</td>
                                       <td>{item.email}</td>
                                       <td>{item.mobile}</td>
                                       <td>{item.shopname}</td>
                                       <td>{item.shopaddress}</td>
                                        <td>{item.status}</td>

      <td>
        <button
          className="actionbtn red"
          onClick={() =>
            handleEditClick(
              item._id,
            
              item.status
            )
          }
        >
          <i className="fas fa-edit"></i>
        </button>
      </td>
                                      
                                     </tr>
                                   ))}
                                 </tbody>
              </table>
            </div>
            
          </div>
        )}
          </div>
                                  
          </div>
        </>
    )
}
export default Sellerdetails;