import "./Dashboard.css";
import img from "./download (1).jfif";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Sellerproducts() {
  
  const navigate=useNavigate();
    const [sOpen, setSopen] = useState(false);
  const subCategoryOptions = { Women: ["Saree", "Kurti", "Tops"], Men: ["Shirt", "Tshirt", "Jeans"], kids: ["Frock", "Shorts"], Accessories: ["Watch", "Belt", "Bag"], Footware: ["Shoes", "Sandals", "Slippers"] };
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [products, setProducts] = useState([]);

  const [Productid, setProductid] = useState("");
  const [Product, setProduct] = useState("");
  const [Category, setCategory] = useState("");
  const [Subcategory, setSubcategory] = useState("");
  const [Description,setDescription] =useState("");
  const [Stock, setStock] = useState("");
  const[Size,setSize]=useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Rating, setRating] = useState("");
  const [Review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const toggleseller = () => {
    setSopen(!sOpen);
  };
  const sellerData = localStorage.getItem("seller");

  const loginseller =
    sellerData && sellerData !== "undefined"
      ? JSON.parse(sellerData)
      : null;
  const sellerId = loginseller?._id;
  const getProducts = async () => {
     const seller = JSON.parse(localStorage.getItem("seller"));

  const res = await axios.get(
    `http://localhost:4000/viewsellerproduct?sellerId=${seller._id}`
  );
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const clearForm = () => {
    setProductid("");
    setProduct("");
    setCategory("");
    setSubcategory("");
    setStock("");
    setDescription("");
    setSize("");
    setColor("");
    setPrice("");
    setRating("");
    setReview("");
    setImage(null);
    setEditId(null);
  };
const seller = JSON.parse(localStorage.getItem("seller"));

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("Productid", Productid);
    formData.append("Product", Product);
    formData.append("Category", Category);
    formData.append("Subcategory", Subcategory);
    formData.append("Description",Description);
    formData.append("Stock", Stock);
    formData.append("Size",Size);
    formData.append("Color", Color);
    formData.append("Price", Price);
    formData.append("Rating", Rating);
    formData.append("Review", Review);
    formData.append("Sellerid",sellerId);
    formData.append("image", image);

    await axios.post("http://localhost:4000/addsellerproduct", formData);
    clearForm();
    setShowForm(false);
    getProducts();
  };

  const handleEdit = (item) => {
    setProductid(item.Productid);
    setProduct(item.Product);
    setCategory(item.Category);
    setSubcategory(item.Subcategory);
    setDescription(item.Description);
    setStock(item.Stock);
    setSize(item.Size);
    setColor(item.Color);
    setPrice(item.Price);
    setRating(item.Rating);
    setReview(item.Review);
    setEditId(item._id);
    setIsEdit(true);
    setShowForm(true);
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("Productid", Productid);
    formData.append("Product", Product);
    formData.append("Category", Category);
    formData.append("Subcategory", Subcategory);
    formData.append("Description",Description);
    formData.append("Stock", Stock);
    formData.append("Size",Size);
    formData.append("Color", Color);
    formData.append("Price", Price);
    formData.append("Rating", Rating);
    formData.append("Review", Review);
    if (image) formData.append("image", image);

    await axios.put(
      `http://localhost:4000/updatesellerproduct/${editId}`,
      formData
    );

    clearForm();
    setShowForm(false);
    setIsEdit(false);
    getProducts();
  };

  const deleteProduct = async (id) => {
      if (window.confirm("Are you sure?")) {
    await axios.delete(`http://localhost:4000/deletesellerproduct/${id}`);
    getProducts();
      }
  };
   const handleCancel = () => {
    clearForm();
    setShowForm(false);
    setIsEdit(false);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span>Go</span>
          <span>Style</span>
        </div>
       
      <ul className="menu">
            <li><Link to="/sellerdashboard" style={{textDecoration:"none",color:"black"}}><i class="fa fa-dashboard" style={{fontSize:"20px"}}></i>Dashboard</Link></li>
                {/* <li><Link to="/sellercategory" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-layer-group"></i> Category</Link></li> */}
             
            <li className="active"><Link to="/sellerproduct" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
        
            <li><Link to={`/sellerorder/${seller._id}`} style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
          
            <li><i class="fa-solid fa-gear"></i> Settings</li>
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
                       <h2>Products</h2>
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
                    <Link to={`/sellerprofile/${sellerId}`} className="dropdown-item">
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
          <div className="content">
          <div className="box">
          <button className="addbutton" onClick={() => setShowForm(true)}>
              + Add Product
            </button>

        {showForm ? (
          <div className="addcategorybox">
            <label>Product id:</label>
            <input placeholder="Product ID" value={Productid} onChange={e => setProductid(e.target.value)} />
             <label>Product Name:</label>
            <input placeholder="Product Name" value={Product} onChange={e => setProduct(e.target.value)} />
            <label>Category:</label>
            <select value={Category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option>Women</option>
              <option>Men</option>
              <option>Kids</option>
              <option>Accessories</option>
                    <option>Footware</option>
            </select>
             <label>Description:</label>
             <textarea placeholder="Description" value={Description} onChange={e => setDescription(e.target.value)} style={{borderRadius:"10px",borderColor:"rgb(0, 102, 0)",padding:"10px"}}/>
             <label>Subcategory:</label>
           
                  <select value={Subcategory} onChange={(e) => setSubcategory(e.target.value)} > <option value="">Select Product Type</option> {subCategoryOptions[Category]?.map((sub, index) => ( <option key={index} value={sub}> {sub} </option> ))} </select>
              <label>Stock:</label>
            <input type="number" placeholder="Stock" value={Stock} onChange={e => setStock(e.target.value)} />
                <label>Size:</label>
            <input placeholder="X,L,M" value={Size} onChange={e => setSize(e.target.value)} />
              <label>Color:</label>
            <input placeholder="Color" value={Color} onChange={e => setColor(e.target.value)} />
              <label>Price:</label>
            <input type="number" placeholder="Price" value={Price} onChange={e => setPrice(e.target.value)} />
              <label>Rating:</label>
            <input type="number" placeholder="Rating" value={Rating} onChange={e => setRating(e.target.value)} />
                <label>Review:</label>
            <input placeholder="Review" value={Review} onChange={e => setReview(e.target.value)} />
                <label>choose image:</label>
            <input type="file" onChange={e => setImage(e.target.files[0])} />

            {/* <button onClick={isEdit ? updateProduct : addProduct}>
              {isEdit ? "Update" : "Add"}
            </button> */}
             <div className="btn-group">
                    <button
                      className="add-btn"
                      onClick={isEdit ? updateProduct : addProduct}
                    >
                      {isEdit ? "Update" : "Add"}
                    </button>

                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
          </div>
        ) : (
          <div>
          <h3>List of all Products</h3>
          <div className="table-container">
          <table>
            
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
            
                <th>Type</th>
                <th>Size</th>
                <th>Color</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Review</th>
                <th>s.name</th>
                <th>s.address</th>
                 
                <th style={{width:"100px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><img src={`http://localhost:4000/uploads/${p.image}`} width="30" /></td>
                  <td>{p._id.slice(-4)}</td>
                  <td className="productname">{p.Product}</td>
                  <td >{p.Category}</td>
                
                  <td>{p.Subcategory}</td>
                  <td className="productname">{p.Size}</td>
                  <td>{p.Color}</td>
                  <td>{p.Stock}</td>
                  <td>{p.Price}</td>
                  <td>{p.Rating}</td>
                  <td>{p.Review}</td>
                  <td>{p.Sellerid?.shopname }</td>
                  <td className="productname">{p.Sellerid?.shopaddress}</td>
                  <td>
                    <button  className="actionbtn red" onClick={() => handleEdit(p)}><i class="fas fa-edit"></i></button>
                    <button  className="actionbtn green" onClick={() => deleteProduct(p._id)}><i class="fas fa-trash"></i></button>
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
    </div>
    </div>
  );
}

export default Sellerproducts;
