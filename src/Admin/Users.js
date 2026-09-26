import "./Dashboard.css";
import img from './download (1).jfif';

import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Users(){
       const [registers, setRegisters] = useState([]);
         
       
         useEffect(() => {
           const getRegisters = async () => {
             try {
               const res = await axios.get("http://localhost:4000/viewallregister");
               setRegisters(res.data);
               console.log(res.data);
             } catch (err) {
               console.log(err);
             }
           };
           getRegisters();
         }, []);
           const deleteRegister = async (id) => {
             if (window.confirm("Are you sure?")) {
               await axios.delete(`http://localhost:4000/deleteregister/${id}`);
               const res = await axios.get("http://localhost:4000/viewallregister");
               setRegisters(res.data);
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
            <li className="active"><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-user"></i>  Users</Link></li>
                         <li><Link to="/admin/contact" style={{textDecoration:"none",color:"black"}}><i class="fa fa-address-book" aria-hidden="true"></i>  Contact</Link></li>
            <li><i class="fa-solid fa-gear"></i> Settings</li>
            <li><i class="fa-solid fa-right-from-bracket"></i> Lpgout</li>
          </ul>
        </aside>

        {/* MAIN */}
        <div className="main">
          <header className="header">
            <h2>Products</h2>
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

          <div className="content">
            <div className="box">
              
              <h3>List of all User Details</h3>
              <table>
                <thead>
                  <tr>
                  
                    <th>User ID</th>
                    <th>User Name</th>
                      <th>Email</th>
                  
                   
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
                                       {/* <td>{item.Stock}</td> */}
                                       <td>
                                        
                                         <button
                                           className="actionbtn green"
                                           onClick={() => deleteRegister(item._id)}
                                         >
                                           <i class="fas fa-trash"></i>
                                         </button>
                                       </td>
                                     </tr>
                                   ))}
                                 </tbody>
              </table>
            </div>
          </div>
          </div>
          </div>
        </>
    )
}
export default Users;