// import "./Dashboard.css";
// import img from './download (1).jfif';
// import img2 from "./images.jfif";
// import img3 from "./images (1).png";

// import { Link, useNavigate } from "react-router-dom";


// function Dashboard(){
// const navigate=useNavigate();
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
//             <li className="active"><Link to="/admin/dashboard" style={{textDecoration:"none",color:"black"}}><i class="fa fa-dashboard" style={{fontSize:"20px"}}></i>Dashboard</Link></li>
//                 <li><Link to="/admin/category" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-layer-group"></i> Category</Link></li>
             
//             <li><Link to="/admin/product" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
        
//             <li><Link to="/admin/order" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
//             <li><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-users"></i>  Users</Link></li>
//                          <li><Link to="/admin/contact" style={{textDecoration:"none",color:"black"}}><i class="fa fa-address-book" aria-hidden="true"></i>  Contact</Link></li>
//             <li><i class="fa-solid fa-gear"></i> Settings</li>
//             <li onClick={()=>{
//             localStorage.removeItem("admin");
//             alert("admin Logout Succesfully.")
//             navigate("/admin");
//           }}><i class="fa-solid fa-right-from-bracket"></i> Lagout</li>
//           </ul>
//         </aside>

//         {/* MAIN */}
//         <div className="main">
//           <header className="header">
//             <h2>Dashboard</h2>
//            <div className="search-box">
//   <i className="fa fa-search search-icon"></i>
//   <input
//     className="search"
//     placeholder="Search your product"
//   />
// </div>
//             <div className="profile">
//               <img src={img} alt="" />
//             <span >Admin</span>
//             </div>
//           </header>

//           <div className="content">
//             {/* STATS CARDS */}
//             <div className="cards">
//               <div className="card purple">
//                 <h4>Total Sales</h4>
//                 <h2>$100.4K</h2>
//                 <i class="fa-solid fa-chart-line" style={{marginLeft:"150px",fontSize:"30px",color:"#cbadedff"}}></i>   
//               </div>
//               <div className="card blue">
//                 <h4>Total Customers</h4>
//                 <h2>20.4K</h2>
//                  <i class="fa-solid fa-users" style={{marginLeft:"150px",fontSize:"30px",color:"#6f9ec1ff"}}></i>
//               </div>
//               <div className="card orange">
//                 <h4>Total Products</h4>
//                 <h2>2.4K</h2>
//                 <i class="fa-solid fa-boxes-stacked"style={{marginLeft:"150px",fontSize:"30px",color:"#e7c49cff"}}></i>
//               </div>
//               <div className="card green">
//                 <h4>Total Orders</h4>
//                 <h2>1.6K</h2>
//                 <i class="fa-solid fa-clipboard-list"style={{marginLeft:"150px",fontSize:"30px",color:"#d7a3d7ff"}}></i> 
                
//               </div>
//             </div>

//             {/* CHART + STATUS */}
//             <div className="grid">
//               <div className="box">
//                 <h3>Sales Statistic</h3>
//                 <div className="chart"><img src={img3} alt="img3" style={{width:"400px"}}/></div>
//               </div>

//               <div className="box">
//                 <h3>Shipment Status</h3>
//                 <div className="chart"><img src={img2} alt="img2"/></div>
//               </div>
//             </div>

//             {/* TABLE */}
//             <div className="box">
//               <h3>Recent Orders</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Order ID</th>
//                     <th>Customer</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Denim Jacket</td>
//                     <td>#127381</td>
//                     <td>Alex Almond</td>
//                     <td><span className="status pending">Pending</span></td>
//                   </tr>
//                   <tr>
//                     <td>White Shirt</td>
//                     <td>#127382</td>
//                     <td>Anita Sen</td>
//                     <td><span className="status pending">Pending</span></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>
//       </div>


//         </>
//     )
// }
// export default Dashboard;
import "./Dashboard.css";
import img from "./download (1).jfif";
import img2 from "./images.jfif";
import img3 from "./images (1).png";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
 
  Legend
} from "recharts";


function Dashboard() {
   const COLORS = [
  "#f59e0b", // orange
  "#10b981", // green
  "#3b82f6", // blue
  "#ef4444", // red
  "#8b5cf6", // purple
];
  
    const [chartData, setChartData] = useState([]);

  const [data, setData] = useState({
    users: 0,
    orders: 0,
    products: 0,
    totalsale: 0,
  });

  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/order/sale/product-consales") // ✅ your API
      .then((res) => {
        console.log("API DATA ", res.data);
        console.log("hi");
        setChartData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, []);

const productKeys =
  chartData.length > 0
    ? Object.keys(chartData[0]).filter((key) => key !== "date")
    : [];

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getdashboard");
      setData(res.data);
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
          <li className="active">
            <Link to="/admin/dashboard" className="link">
              <i className="fa fa-dashboard icon-md"></i> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/category" className="link">
              <i className="fa-solid fa-layer-group"></i> Category
            </Link>
          </li>

          <li>
            <Link to="/admin/product" className="link">
              <i className="fa-solid fa-cart-shopping"></i> Products
            </Link>
          </li>

          <li>
            <Link to="/admin/order" className="link">
              <i className="fa-solid fa-receipt"></i> Orders
            </Link>
          </li>
           <li>
            <Link to="/sellerdetails" className="link">
             <i className="fa-solid fa-users"></i> Seller Details
            </Link>
          </li>
          <li>
            <Link to="/admin/user" className="link">
              <i className="fa-solid fa-user"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/contact" className="link">
              <i className="fa fa-address-book"></i> Contact
            </Link>
          </li>

          <li>
            <i className="fa-solid fa-gear"></i> Settings
          </li>

          <li
            onClick={() => {
              localStorage.removeItem("admin");
              alert("Admin Logout Successfully");
              navigate("/admin");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* HEADER */}
        <header className="header">
          <h2>Dashboard</h2>
       
          <div className="search-box">
            <i className="fa fa-search search-icon"></i>
            <input
              className="search"
              placeholder="Search your product"
            />
          </div>

          <div className="profile">
            <img src={img} alt="admin" />
            <span>Admin</span>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          {/* CARDS */}
         <div className="cardsadmin">

  <div className="cardadmin purple">
    <h4>Total Sales</h4>
    <h2>₹{data.totalsale}</h2>
    <i className="fa-solid fa-chart-line" style={{marginLeft:"150px",fontSize:"30px",color:"#cbadedff"}}></i> 
  </div>

  <div className="cardadmin blue">
    <h4>Total Customers</h4>
    <h2>{data.users}</h2>
     <i className="fa-solid fa-users" style={{marginLeft:"150px",fontSize:"30px",color:"#6f9ec1ff"}}></i>
  </div>

  <div className="cardadmin orange">
    <h4>Total Products</h4>
    <h2>{data.products}</h2>
  <i className="fa-solid fa-boxes-stacked" style={{marginLeft:"150px",fontSize:"30px",color:"#e7c49cff"}}></i>
  </div>

  <div className="cardadmin green">
    <h4>Total Orders</h4>
    <h2>{data.orders}</h2>
   <i className="fa-solid fa-clipboard-list" style={{marginLeft:"150px",fontSize:"30px",color:"#d7a3d7ff"}}></i> 
  </div>

</div>
          {/* GRID */}
          <div className="grid">
            <div className="box">
              
               
                 <div className="chart-box">
      <h3>Income Overview</h3>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
  <AreaChart data={chartData}>

    {/* 🔥 Orange Gradient */}
    <defs>
      <linearGradient id="orangeWave" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#27ca96" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#27ca96" stopOpacity={0}/>
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" vertical={false} />

    <XAxis dataKey="month" />
    <YAxis />

    <Tooltip />

    <Area
      type="natural"
      dataKey="sales"
      stroke="#27ca96"
      fill="url(#orangeWave)"
      strokeWidth={3}
    />

  </AreaChart>
</ResponsiveContainer>
      ) : (
        <h4>No Data Found</h4>
      )}
    </div>

 
                   
              {/* <div className="chart">
                <img src={img3} alt="chart" className="chart-img" />
              </div> */}
            </div>

            <div className="box">
              
              
                <div className="chart-box">
  <div className="chart-header">
    <h3>Sales Distribution</h3>
    <span>Monthly</span>
  </div>

  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={chartData}
        dataKey="sales"
        nameKey="month"
        cx="50%"
        cy="50%"
        innerRadius={70}   // 🔥 donut style
        outerRadius={110}
        paddingAngle={3}
      >
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
           
</div> 
              {/* <h3>Shipment Status</h3>
              <div className="chart">
                <img src={img2} alt="chart" className="chart-img" />
              </div> */}
            
          </div>

          {/* TABLE */}
          <div className="box">
            <h3>Recent Orders</h3>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Denim Jacket</td>
                    <td>#127381</td>
                    <td>Alex Almond</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>

                  <tr>
                    <td>White Shirt</td>
                    <td>#127382</td>
                    <td>Anita Sen</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;