import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";
import "./Addtocart.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Categorybar from "./Categorybar";

function Addtocart() {
   const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
const [wishlistIds, setWishlistIds] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));



useEffect(() => {
  if (!user) {
    navigate("/login");
    return;
  }

  getProducts();
}, []);

const addTowish = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    const res = await axios.post("http://localhost:4000/addwish", {
      userId: user._id,
      productId: product.productId || product._id, 
     
      
    });
      try {
        await axios.delete(
          `http://localhost:4000/deleteaddtocart/${id}`
        );
        getProducts();
      } catch (err) {
        console.log(err);
      }
    alert(res.data.message);

    setWishlistIds(prev => [...prev, product._id]);

  } catch (err) {
    console.log(err);
  }
};
  const toggleWishlist = (product) => {
  if (wishlistIds.includes(product._id)) {
    removeFromWish(product);
  } else {
    addTowish(product);
  }
};


const removeFromWish = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Login first");
    return;
  }

  try {
    await axios.delete("http://localhost:4000/removewishlist", {
      params: {
        userId: user._id,
        productId: product.productId || product._id, 
      },
    });

    // update UI instantly
    setWishlistIds(prev => prev.filter(id => id !== product._id));

  } catch (err) {
    console.log("Remove error:", err);
  }
};
 const totalAmount = products.reduce((total, item) => {
            return total + (item.price * item.quantity);
            }, 0);
localStorage.setItem("totalamount",totalAmount);
const getProducts = async () => {
  try {
    const res = await axios.get(
      `http://localhost:4000/getaddtocart/${user._id}` 
    );

    console.log("API DATA:", res.data); 
    setProducts(res.data);
    localStorage.setItem("carts",JSON.stringify(res.data));
  } catch (err) {
    console.log(err);
  }
};


  const deleteAddtocart = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(
          `http://localhost:4000/deleteaddtocart/${id}`
        );
        getProducts();
      } catch (err) {
        console.log(err);
      }
    }
  };


  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      await axios.put(
        `http://localhost:4000/updatecartquantity/${id}`,
        { quantity: newQty }
      );

      // update UI instantly
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, quantity: newQty } : p
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const address = () => {
    navigate("/addressform");
  };


  return (
    <>
      <Header />

      <Categorybar/>
      <div className="cartpage">
        
        <div className="addtocartcontainer">
           <div className="page-header">
  <h1 className="page-title">Add to cart</h1>
  <p className="page-subtitle">Trending collections with free delivery</p>
</div>
          {products.map((product) => (
            <div className="addtocartboxes" key={product._id}>
             
               <div className="cartleft">
                <Link to={`/category/Women1/${product.productId}`}>
              <img
                className="addtoimg"
                src={`http://localhost:4000/uploads/${product.image}`}
                alt={product.productName}
              />
              </Link>
              <div className="addtoname">
                <h4>{product.productName}</h4>
                <p className="price">₹{product.price}</p>
                <p>Size: {product.size}</p>
                <div className="qtybox">
                  
                  <button className="qtybtn" onClick={() =>
              updateQuantity(product._id, product.quantity - 1)
            }
                   
                  >-</button>
                  <div className="qtyvalue">{product.quantity}</div>
                  <button className="qtybtn" onClick={() =>
              updateQuantity(product._id, product.quantity + 1)
            }
                    
                  >+</button>
                  </div>
              </div>
              </div>
                <div className="cartright">
              <label
                className="removebtn"
                onClick={() => deleteAddtocart(product._id)}
              >
                <i className="fa fa-remove"></i> Remove
              </label>

              
              </div>
            </div>
          ))}
        </div>

        <div className="totalbox">
          <h3>Price Details</h3>

          <div className="totalrow">
            <span>Total Items</span>
            <span>{products.length}</span>
          </div>

          <div className="totalrow">
            <span>Total Price</span>
            <span>
              ₹{products.reduce(
                (sum, p) => sum + p.price * p.quantity,
                0
              )}
            </span>
          </div>

          <div className="totalrow">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="totalrow totalamount">
            <span>Total Amount</span>
            <span>
             ₹{products.reduce(
                (sum, p) => (sum + (p.price * p.quantity)),
                0
              )} 
           
          
            </span>
          </div>

          <button className="checkoutbtn" onClick={address}>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default Addtocart;
