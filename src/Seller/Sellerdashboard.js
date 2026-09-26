
import { useState, useEffect } from "react";
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



function Sellerdashboard() {
    const COLORS = [
  "#f59e0b", // orange
  "#10b981", // green
  "#3b82f6", // blue
  "#ef4444", // red
  "#8b5cf6", // purple
];
  
  const [chartData, setChartData] = useState([]);
 
 
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
useEffect(() => {
  if (!seller?._id) return;

  const fetchChartData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/order/sale/sellerproduct-consales/${seller._id}`);
      console.log("Graph Data:", res.data); 
      setChartData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchChartData();

}, [seller?._id]);
 
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




  const [sOpen, setSOpen] = useState(false);

  const [data, setData] = useState({
    products: 0,
   
    orders: 0,
    totalSales: 0,
  });

  const toggleseller = () => {
    setSOpen(!sOpen);
  };
  const sellerData = localStorage.getItem("seller");

  const loginseller =
    sellerData && sellerData !== "undefined"
      ? JSON.parse(sellerData)
      : null;
  const sellerId = loginseller?._id;

  useEffect(() => {
    const fetchDashboard = async () => {
      const sellerData = JSON.parse(localStorage.getItem("seller") || "{}");
      const sellerId = sellerData._id;
      console.log(sellerId);
      if (!sellerId) return;

      try {
        const res = await axios.get(`http://localhost:4000/getsellerdashboard/${sellerId}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDashboard();
  }, []);
 


  const navigate = useNavigate();

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
            <Link to="/sellerdashboard" className="link">
              <i className="fa fa-dashboard icon-md"></i> Dashboard
            </Link>
          </li>
          {/* 
          <li>
            <Link to="/sellercategory" className="link">
              <i className="fa-solid fa-layer-group"></i> Category
            </Link>
          </li> */}

          <li>
            <Link to="/sellerproduct" className="link">
              <i className="fa-solid fa-cart-shopping"></i> Products
            </Link>
          </li>

          <li>
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
          {/* 
          <div className="profile">
            <img src={img} alt="admin" />
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

        {/* CONTENT */}
        <div className="content">
          {/* CARDS */}
          <div className="cardsadmin">

            <div className="cardadmin purple">
              <h4>Total Sales</h4>
              <h2>₹{data.totalSales}</h2>
              <i class="fa-solid fa-chart-line" style={{ marginLeft: "150px", fontSize: "30px", color: "#cbadedff" }}></i>
            </div>

            <div className="cardadmin blue">
              <h4>Total Customers</h4>
              <h2>{data.orders}</h2>
              <i class="fa-solid fa-users" style={{ marginLeft: "150px", fontSize: "30px", color: "#6f9ec1ff" }}></i>
            </div>

            <div className="cardadmin orange">
              <h4>Total Products</h4>
              <h2>{data.products}</h2>
              <i class="fa-solid fa-boxes-stacked" style={{ marginLeft: "150px", fontSize: "30px", color: "#e7c49cff" }}></i>
            </div>

            <div className="cardadmin green">
              <h4>Total Orders</h4>
              <h2>{data.orders}</h2>
              <i class="fa-solid fa-clipboard-list" style={{ marginLeft: "150px", fontSize: "30px", color: "#d7a3d7ff" }}></i>
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
</div>  {/* <div className="chart">
                <img src={img2} alt="chart" className="chart-img" />
              </div> */}
            </div>
          </div>

          {/* TABLE */}
       

           <div className="content">
            <div className="box">

              <h3>Recent Orders</h3>
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
          </div>
        </div>
      </div>
    
  );
}

export default Sellerdashboard;