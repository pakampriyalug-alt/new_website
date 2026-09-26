import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";

import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Categorybar from "./Categorybar";
import SearchBar from "./SearchBar";
function Allproduct({ getwishlistcount }) {
   const{id}=useParams();
    
   const [wishlistIds, setWishlistIds] = useState([]);
    const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [subCategory, setSubCategory] = useState("");

  const fetchWishlist = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const res = await axios.get("http://localhost:4000/getwishlist", {
        params: { userId: user._id },
      });

      const ids = res.data.map((item) => item.productId._id.toString());
      setWishlistIds(ids);
    } catch (err) {
      console.log("Fetch wishlist error:", err);
    }
  }, []);

  const getProducts = useCallback(async () => {
    try {
      const adminProducts = await axios.get("http://localhost:4000/viewproduct");
      const sellerProducts = await axios.get("http://localhost:4000/sellerallproduct");

      const mergedProducts = [...adminProducts.data, ...sellerProducts.data];
      setProducts(mergedProducts);
      setFilteredProducts(mergedProducts);
    } catch (err) {
      console.log("Product fetch error", err);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const filterByCategory = (cat) => {
    setCategory(cat);
    setSubCategory("");

    if (cat === "All") {
      setFilteredProducts(products);
    } else {
      const result = products.filter(p => p.Category === cat);
      setFilteredProducts(result);
    }
  };

  const filterBySubCategory = (sub) => {
    setSubCategory(sub);
    const result = products.filter(
      p => p.Category === category && p.Subcategory === sub
    );
    setFilteredProducts(result);
  };
  // const addTowish = async () => {
  //    const user = JSON.parse(localStorage.getItem("user"));
  
    
  //   if (!user) {
  //     alert("Please login first");
  //     return;
  //   }
  
  
   
  
  //   try {
  //     const res = await axios.post("http://localhost:4000/addwish", {
  //       userId: user._id,
  //       productId: products._id,
  //       productName: products.Product,
  //       image: products.image,
  //       price: products.Price,
        
  //     });
  
  //     if (res.data.alreadyExists) {
  //       alert("Product is already in the cart");
  //     } else {
        
  //       alert("Product added to wishlist");
       
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     alert("Failed to wishlist");
  //   }
  // };
//   const removeFromWish = async (product) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const res = await axios.get(`http://localhost:4000/getwishlist/${user._id}`);
//   const item = res.data.find(i => i.productId === product._id);

//   if (item) {
//    await axios.delete(`http://localhost:4000/removewishlist/${user._Id}`);
//     setWishlistIds(prev => prev.filter(id => id !== product._id));
//   }
// };
const toggleWishlist = async (product) => {
  if (wishlistIds.includes(product._id)) {
    await removeFromWish(product);
  } else {
    await addTowish(product);
  }

  fetchWishlist(); // 🔥 sync after action
};
const removeFromWish = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await axios.delete("http://localhost:4000/removewishlist", {
      data: {
        userId: user._id,
        productId: product._id,
      },
    });

    // 🔥 UPDATE COUNT
    window.location.reload();
    getwishlistcount();

  } catch (err) {
    console.log(err);
  }
};
// const removeFromWish = async (product) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     alert("Login first");
//     return;
//   }

//   try {
//   await axios.delete("http://localhost:4000/removewishlist", {
//   data: {
//     userId: user._id,
//     productId: product._id,
//   },
// });
//     // update UI instantly
//     setWishlistIds(prev => prev.filter(id => id !== product._id));

//   } catch (err) {
//     console.log("Remove error:", err);
//   }
// };

// const addTowish = async (product) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     alert("Please login first");
//     return;
//   }

//   try {
//     const res = await axios.post("http://localhost:4000/addwish", {
//       userId: user._id,
//       productId: product._id,
//     });

//     alert(res.data.message);

//     setWishlistIds(prev => [...prev, product._id]);

//   } catch (err) {
//     console.log(err);
//   }
// };
const addTowish = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Login first");
    return;
  }

  try {
    await axios.post("http://localhost:4000/addwish", {
      userId: user._id,
      productId: product._id,
    });

    window.location.reload();
    getwishlistcount();

  } catch (err) {
    console.log(err);
  }
};
  return (
    <>
      <Header getwishlistcount={getwishlistcount} />
      <Categorybar/>
       <div className="conadmin">
             
  <div className="filter-sidebar">

    <h3 className="filter-title">
      <i className="fa-solid fa-filter"></i> Filters
    </h3>

    <ul className="filter-list">
      <li onClick={() => filterByCategory("All")} className="filter-item active">
        <i className="fa-solid fa-border-all"></i>
        <span>All</span>
      </li>

      <li onClick={() => filterByCategory("Women")} className="filter-item">
        <i className="fa-solid fa-person-dress"></i>
        <span>Women</span>
      </li>

      <li onClick={() => filterByCategory("Men")} className="filter-item">
        <i className="fa-solid fa-person"></i>
        <span>Men</span>
      </li>

      <li onClick={() => filterByCategory("Kids")} className="filter-item">
        <i className="fa-solid fa-child"></i>
        <span>Kids</span>
      </li>

      <li onClick={() => filterByCategory("Accessories")} className="filter-item">
        <i className="fa-solid fa-gem"></i>
        <span>Accessories</span>
      </li>

      <li onClick={() => filterByCategory("Footware")} className="filter-item">
        <i className="fa-solid fa-shoe-prints"></i>
        <span>Footwear</span>
      </li>
    </ul>

  </div>

              
                     
     <div className="navright">
      
          <section className="products">
             <div className="searchbar">
               <SearchBar/>

              </div>  

            <div className="page-header">
              
              
              <h1 className="page-title">All Product</h1>
              <p className="page-subtitle">Trending collections with free delivery</p> 
               
            </div>
            
        
            {category === "Women" && (
              <div style={{ marginBottom: "20px" }}>
                <button  className="subcategorybtn" onClick={() => filterBySubCategory("Kurti")}>
                  Kurti
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Saree")}>
                  Saree
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Tops")}>
                  Tops
                </button>
              </div>
            )}
              {category === "Men" && (
              <div style={{ marginBottom: "20px" }}>
                <button  className="subcategorybtn" onClick={() => filterBySubCategory("Shirt")}>
                  Shirt
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Tshirt")}>
                  Tshirt
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Jeans")}>
                  Jeans
                </button>
              </div>
            )}
              {category === "Kids" && (
              <div style={{ marginBottom: "20px" }}>
                <button  className="subcategorybtn" onClick={() => filterBySubCategory("Shorts")}>
                  Shorts
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("frock")}>
                  Frock
                </button>
              
              </div>
            )}
               {category === "Accessories" && (
              <div style={{ marginBottom: "20px" }}>
                <button  className="subcategorybtn" onClick={() => filterBySubCategory("Watch")}>
                  Watch
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("beg")}>
                  Beg
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Belt")}>
                  Belt
                </button>
              </div>
            )}
            {category === "Footware" && (
              <div style={{ marginBottom: "20px" }}>
                <button  className="subcategorybtn" onClick={() => filterBySubCategory("Shoes")}>
                  Shoes
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Sandals")}>
                  Sandals
                </button>
                <button className="subcategorybtn" onClick={() => filterBySubCategory("Slippers")}>
                  Slippers
                </button>
              </div>
            )}
              
              

          
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  {/* <i className={iswishlist?"heart active":"heart"} onClick={fillcolor}><i class="fas fa-heart"></i></i> */}
                  
        
       <i
      className="fa-solid fa-heart"
      style={{
        cursor: "pointer",
        fontSize: "20px",
        color: wishlistIds.includes(product._id) ? "red" : " #cdcdc2",
      }}
      onClick={() => toggleWishlist(product)}
    ></i>
  
                  <Link to={`/category/Women1/${product._id}`}>
                    <img
                      src={`http://localhost:4000/uploads/${product.image}`}
                      alt=
                {product.Product}
                    />
                  </Link>
                 
                    
              <h4 className="product-name">
               {product.Product}
              </h4>
               
              <p className="price">₹{product.Price}</p>
             
              <span className="delivery" >Free Delivery</span>
              {/* <span
  className="delivery"
  style={{
    marginLeft:"10px",
    color:"white",
    backgroundColor:
      u.Stock <= 0
        ? "red"
        : u.Stock < 10
        ? "rgb(223, 156, 57)"
        : "green"
  }}
  
>
{
  u.Stock <= 0
    ? "Out of Stock"
    : u.Stock < 10
    ? "Low Stock"
    : "In Stock"
}
 : {u.Stock}
</span> */}
<span
  className={`delivery stock ${
    product.Stock <= 0 
      ? "out"
      : product.Stock < 10
      ? "low"
      : ""
  }`}
>
  {
    product.Stock <= 0
      ? "Out of Stock"
      : product.Stock < 10
      ? "!Hurry up to buy"
      : ""
  }
</span>
              <div className="rating">
                <span className="star">{product.Rating} ★</span>
                <span className="reviews">{product.Review} Reviews</span>
                
                 
                 
              </div>
                </div>
              ))}
            </div>

          </section>
          
        </div>
        
      </div>
      
    </>
  );
}

export default Allproduct;
