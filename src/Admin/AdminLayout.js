// // import { Outlet, Link } from "react-router-dom";
// // import { useState } from "react";
// // import img from "./download (1).jfif";
// // import "./Dashboard.css";

// // function AdminLayout() {
// //   const [open, setOpen] = useState(false);

// //   return (
// //     <div className="app">
// //       {/* SIDEBAR */}
// //       <aside className="sidebar">
// //         <div className="logo">
// //           <span>Go</span>
// //           <span>Style</span>
// //         </div>

// //         <ul className="menu">
// //           <li>
// //             <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
// //               <i className="fa fa-dashboard"></i> Dashboard
// //             </Link>
// //           </li>

// //           <li>
// //             <Link to="/admin/product" style={{ textDecoration: "none", color: "inherit" }}>
// //               <i className="fa-solid fa-cart-shopping"></i> Products
// //             </Link>
// //           </li>

// //           <li onClick={() => setOpen(!open)}>
// //             <i className="fa-solid fa-layer-group"></i> Category
// //           </li>

// //           {open && (
// //             <ul className="menu">
// //               <li>SubCategory</li>
// //             </ul>
// //           )}

// //           <li>Orders</li>
// //           <li>Users</li>
// //           <li>Settings</li>
// //           <li>Logout</li>
// //         </ul>
// //       </aside>

// //       {/* MAIN */}
// //       <div className="main">
// //         {/* HEADER */}
// //         <header className="header">
// //           <h2>Admin Panel</h2>
// //           <input className="search" placeholder="Search your product" />
// //           <div className="profile">
// //             <img src={img} alt="" />
// //             <span style={{
// //               background: "#16a34a",
// //               color: "white",
// //               padding: "5px 10px",
// //               borderRadius: "6px"
// //             }}>
// //               Admin
// //             </span>
// //           </div>
// //         </header>

// //         {/* 🔥 CONTENT CHANGES HERE */}
// //         <div className="content">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminLayout;
// import "./Dashboard.css";
// import img from './download (1).jfif';

// import { useState } from "react";
// import { Link } from "react-router-dom";

// function AdminLayout(){
//   const [open, setOpen] = useState(false);
//     return(
//         <>
        
    
//       <div className="app">
//         {/* SIDEBAR */}
//         <aside className="sidebar">
//           <div className="logo">
//             <span>Go</span>
//             <span>Style</span>
//           </div>
        
//           <ul className="menu">
//             <li className="active"><i class="fa fa-dashboard" style={{fontSize:"24px",margin:"5px"}}></i>Dashboard</li>
//             <li><Link to="/admin/product" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
//             <li onClick={() => setOpen(!open)}><i class="fa-solid fa-layer-group"></i> Category</li>
//              {open && (
//         <ul className="menu">
//           <li><i class="fa-solid fa-angle-right"></i> SubCategory</li>
        
//         </ul>
//       )}
//             <li><i class="fa-solid fa-receipt"></i>  Orders</li>
//             <li><i class="fa-solid fa-users"></i>  Users</li>
//             <li><i class="fa-solid fa-gear"></i> Settings</li>
//             <li><i class="fa-solid fa-right-from-bracket"></i> Lagout</li>
//           </ul>
//         </aside>

//         {/* MAIN */}
//         <div className="main">
//           <header className="header">
//             <h2>Dashboard</h2>
//             <input className="search"  placeholder="Search your product"/>
//             <div className="profile">
//               <img src={img} alt="" />
//               <span style={{backgroundColor:"#16a34a",width:"60px",height:"30px",borderRadius:"5px",padding:"4px",color:"white"}}>Admin</span>
//             </div>
//           </header>

       

//           </div>
//         </div>
    


//         </>
//     )
// }
// export default AdminLayout;