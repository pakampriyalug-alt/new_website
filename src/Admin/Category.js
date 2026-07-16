import "./Dashboard.css";
import img from "./download (1).jfif";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Category() {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);


  const [Category, setCategory] = useState("");
  const [Subcategory, setSubcategory] = useState("");
  // const [Stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);


  const subCategoryOptions = { Women: ["Saree", "Kurti", "Tops"], Men: ["Shirt", "Tshirt", "Jeans"], kids: ["Frock", "Shorts"], Accessories: ["Watch", "Belt", "Bag"], Footware: ["Shoes", "Sandals", "Slippers"] };

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/viewuser");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async () => {
    if ( !Category || !Subcategory) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    
    formData.append("Category", Category);
    formData.append("Subcategory", Subcategory);
    // formData.append("Stock", Stock);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:4000/adduser", formData);
      alert("Category Added");
      clearForm();
      setShowForm(false);
      getCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    
    setCategory(item.Category);
    setSubcategory(item.Subcategory);
    // setStock(item.Stock);
    setEditId(item._id);
    setIsEdit(true);
    setShowForm(true);
  };

  const updateCategory = async () => {
    const formData = new FormData();
    
    formData.append("Category", Category);
    formData.append("Subcategory", Subcategory);
    // formData.append("Stock", Stock);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `http://localhost:4000/updateuser/${editId}`,
        formData
      );
      alert("Category Updated");
      clearForm();
      setShowForm(false);
      setIsEdit(false);
      getCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:4000/deleteuser/${id}`);
      getCategories();
    }
  };

  const clearForm = () => {
  
    setCategory("");
    setSubcategory("");
    // setStock("");
    setImage(null);
    setEditId(null);
  };

  const handleCancel = () => {
    clearForm();
    setShowForm(false);
    setIsEdit(false);
  };

  return (
    <>
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <span>Go</span>
          <span>Style</span>
        </div>

        <ul className="menu">
            <li><Link to="/admin/dashboard" style={{textDecoration:"none",color:"black"}}><i class="fa fa-dashboard" style={{fontSize:"20px"}}></i>Dashboard</Link></li>
                <li className="active"><Link to="/admin/category" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-layer-group"></i> Category</Link></li>
             
            <li><Link to="/admin/product" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-cart-shopping"></i> Products</Link></li>
        
            <li><Link to="/admin/order" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-receipt"></i>  Orders</Link></li>
              <li>
            <Link to="/sellerdetails" className="link">
             <i class="fa-solid fa-users"></i> Seller Details
            </Link>
          </li>
            <li><Link to="/admin/user" style={{textDecoration:"none",color:"black"}}><i class="fa-solid fa-user"></i>  Users</Link></li>
                         <li><Link to="/admin/contact" style={{textDecoration:"none",color:"black"}}><i class="fa fa-address-book" aria-hidden="true"></i> Contact</Link></li>
            <li><i class="fa-solid fa-gear"></i> Settings</li>
            <li><i class="fa-solid fa-right-from-bracket"></i> Logout</li>
          </ul>
      </aside>

      <div className="main">
        <header className="header">
          <h2>Category</h2>

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
              + Add Category
            </button>

            {showForm ? (
              <div>
                <h3>{isEdit ? "Edit Category" : "Add Category"}</h3>

                <div className="addcategorybox">
                 

                  <label>Category</label>
                 <select value={Category} onChange={(e) => { setCategory(e.target.value); setSubcategory(""); }} >
                    <option value="">Select Category</option>
                    <option>Women</option>
                    <option>Men</option>
                    <option>kids</option>
                    <option>Accessories</option>
                    <option>Footware</option>
                  </select>

                  <label>Product Type</label>
                  <select value={Subcategory} onChange={(e) => setSubcategory(e.target.value)} > <option value="">Select Product Type</option> {subCategoryOptions[Category]?.map((sub, index) => ( <option key={index} value={sub}> {sub} </option> ))} </select>

                  {/* <label>Stock</label>
                  <input
                    type="number"
                    value={Stock}
                    onChange={(e) => setStock(e.target.value)}
                  /> */}

                  <label>Category Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  <div className="btn-group">
                    <button
                      className="add-btn"
                      onClick={isEdit ? updateCategory : addCategory}
                    >
                      {isEdit ? "Update" : "Add"}
                    </button>

                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3>List of all Categories</h3>

                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Category ID</th>
                      <th>Category</th>
                      <th>Subcategory</th>
                      {/* <th>Stock</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.image && (
                           <img
  src={`http://localhost:4000/uploads/${item.image}`}
  alt="category"
  width="40"
/>

                          )}
                        </td>
                        
                        <td>{item._id.slice(-6)}</td>
                        <td>{item.Category}</td>
                        <td>{item.Subcategory}</td>
                        {/* <td>{item.Stock}</td> */}
                        <td>
                          <button
                            className="actionbtn red"
                            onClick={() => handleEdit(item)}
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            className="actionbtn green"
                            onClick={() => deleteCategory(item._id)}
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default Category;
