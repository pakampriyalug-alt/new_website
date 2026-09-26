// import { useState } from "react";
// import "./Dashboard.css";
// import img from './download (1).jfif';


// import { Link } from "react-router-dom";
// function Product(){
//      const[showForm,setShowForm]=useState(false);
//     return(
//         <>
//         <div className="app">
//         {/* SIDEBAR */}
//         <aside className="sidebar">
//           <div className="logo">
//             <span>Go</span>
//             <span>Style</span>
//           </div>
        
//           <ul className="menu">
//                         <li><Link to="/admin" style={{textDecoration:"none",color:"black"}}><i class="fa fa-dashboard" style={{fontSize:"20px"}}></i>Dashboard</Link></li>
//                 <li><Link to="/admin/category" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-layer-group"></i> Category</Link></li>
             
//             <li className="active"><Link to="/admin/product" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
        
//             <li><Link to="/admin/order" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
//             <li><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-users"></i>  Users</Link></li>
//             <li><i class="fa-solid fa-gear"></i> Settings</li>
//             <li><i class="fa-solid fa-right-from-bracket"></i> Lagout</li>
//           </ul>
//         </aside>

//         {/* MAIN */}
//         <div className="main">
//           <header className="header">
//             <h2>Products</h2>
//            <div className="search-box">
//   <i className="fa fa-search search-icon"></i>
//   <input
//     className="search"
//     placeholder="Search your product"
//   />
// </div>
//             <div className="profile">
//               <img src={img} alt="" />
//               <span style={{backgroundColor:"#16a34a",width:"60px",height:"30px",borderRadius:"5px",padding:"4px",color:"white"}}>Admin</span>
//             </div>
//           </header>

//           <div className="content">
//             <div className="box">
//                <button className="addbutton" onClick={()=>setShowForm(true)}> + Add Products</button>
//                {showForm ?(
//                 <div>
//                    <h3>Add Product</h3>
//                   <div className="addcategorybox">
//                     <label> Id:</label>
//                     <input type="text" />

//                     <label>Categories:</label>
//                     <select>
//                       <option value="">Select Category</option>
//                       <option>Electronics</option>
//                       <option>Fashion</option>
//                       <option>Home Appliances</option>
//                     </select>

//                     <label>Product Type:</label>
//                     <select>
//                       <option value="" style={{color:"gary"}}>Select Product Type</option>
//                       <option>Mobile</option>
//                       <option>Laptop</option>
//                       <option>TV</option>
//                     </select>

//                     <label>price:</label>
//                     <input type="number" />
//                       <label>Description:</label>
//                     <input type="text" />
//                     <div className="btn-group">
//                       <button className="add-btn">Add</button>
//                       <button className="cancel-btn">Cancel</button>
//                     </div>
//                   </div>
//                 </div>
//                ):(
//                 <div>
//               <h3>List of all Products</h3>
//               <table>
//                 <thead>
//                   <tr>
                  
//                     <th>ID</th>
//                     <th>Category</th>
//                     <th>Product type</th>
                    
//                       <th>Price</th>
                  
//                     <th>Color</th>
                   
                   
//                     <th>Description</th>
                    
//                     <th>Action</th>
                    
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>#320484</td>
//                     <td>Women</td>
//                     <td>Saree</td>
                  
//                     <td><i class="fas fa-inr"></i>550</td>
                   
//                     <td>red</td>
                    
                  
//                     <td></td>
//                     <td><button className="actionbtn red">Edit</button><button className="actionbtn green">Delete</button></td>
//                   </tr>
//                   <tr>
//                     <td>#234554</td>
//                     <td>Women</td>
//                     <td>Kurti Set</td>
//                     <td><i class="fas fa-inr"></i>550</td>
//                     <td>blue</td>
//                     <td></td>
//                     <td><button className="actionbtn red">Edit</button><button className="actionbtn green">Delete</button></td>
//                   </tr>
                  
//                 </tbody>
//               </table>
            
//             </div>
//                )}
        
//           </div>
//           </div>
            
//           </div>
//           </div>
//         </>
//     )
// }
// export default Product;
import "./Dashboard.css";
import img from "./download (1).jfif";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Product() {
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
  const subCategoryOptions = { Women: ["Saree", "Kurti", "Tops"], Men: ["Shirt", "Tshirt", "Jeans"], kids: ["Frock", "Shorts"], Accessories: ["Watch", "Belt", "Bag"], Footware: ["Shoes", "Sandals", "Slippers"] };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:4000/viewproduct");
      setProducts(res.data);
    };
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
    formData.append("image", image);

    await axios.post("http://localhost:4000/addproduct", formData);
    clearForm();
    setShowForm(false);
    const updatedRes = await axios.get("http://localhost:4000/viewproduct");
    setProducts(updatedRes.data);
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
      `http://localhost:4000/updateproduct/${editId}`,
      formData
    );

    clearForm();
    setShowForm(false);
    setIsEdit(false);
    const updatedRes = await axios.get("http://localhost:4000/viewproduct");
    setProducts(updatedRes.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4000/deleteproduct/${id}`);
    const updatedRes = await axios.get("http://localhost:4000/viewproduct");
    setProducts(updatedRes.data);
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
            <li><Link to="/admin/dashboard" style={{textDecoration:"none",color:"black"}}><i class="fa fa-dashboard" style={{fontSize:"20px"}}></i>Dashboard</Link></li>
                <li><Link to="/admin/category" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-layer-group"></i> Category</Link></li>
             
            <li className="active"><Link to="/admin/product" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
        
            <li><Link to="/admin/order" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
            <li>
            <Link to="/sellerdetails" className="link">
             <i class="fa-solid fa-users"></i> Seller Details
            </Link>
          </li>
            <li><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-user"></i>  Users</Link></li>
                         <li><Link to="/admin/contact" style={{textDecoration:"none",color:"black"}}><i class="fa fa-address-book" aria-hidden="true"></i>  Contact</Link></li>
            <li><i class="fa-solid fa-gear"></i> Settings</li>
            <li><i class="fa-solid fa-right-from-bracket"></i> Logout</li>
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
                              <div className="profile">
                                <img src={img} alt="" />
                                <span style={{backgroundColor:"#16a34a",width:"60px",height:"30px",borderRadius:"5px",padding:"4px",color:"white"}}>Admin</span>
                              </div>
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
           <label>Product Type</label>
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
                <th>Description</th>
                <th>Type</th>
                <th>Size</th>
                <th>Color</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Review</th>
                <th style={{width:"100px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><img src={`http://localhost:4000/uploads/${p.image}`} width="40"  alt="img"/></td>
                  <td>{p.Productid}</td>
                  <td className="productname">{p.Product}</td>
                  <td >{p.Category}</td>
                  <td  className="productname">{p.Description}</td>
                  <td>{p.Subcategory}</td>
                  <td className="productname">{p.Size}</td>
                  <td>{p.Color}</td>
                  <td>{p.Stock}</td>
                  <td>{p.Price}</td>
                  <td>{p.Rating}</td>
                  <td>{p.Review}</td>
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

export default Product;
