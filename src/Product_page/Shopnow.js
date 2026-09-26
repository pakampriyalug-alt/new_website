import Header from "./Header";
import "./Homepage.css";
import "./Saree.css";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function Shopnow(){
    const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:4000/getaddtocart");
        const found = res.data.find((p) => p._id === id);
        setProduct(found);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);
   const addToCart = async () => {
 
    if (!size) {
      alert("Please select size");
      return;
      
    }

    try {
     const res= await axios.post("http://localhost:4000/addcart", {
        productId: product._id,
        productName: product.Product,
        image: product.image,
        price: product.Price,
        size: size,
        quantity: quantity,
      });

      if(res.data.alreadyExists){
        alert("product is already in the cart")
      }
      else{
      alert("Product added to cart ");
      window.location.reload();
      }

    } catch (err) {
      console.log(err);
      alert("Failed to add to cart ");
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

    
    return(
        <>
        <Header/>
         <div className="product-page">
        <div className="product-container">
          <div className="product-left">
            <img
              src={`http://localhost:4000/uploads/${product.image}`}
              alt="product"
              className="product-image"
            />
          </div>

          <div className="product-right">
            <div className="product-title">{product.productName}</div>
            <div className="product-rating">⭐ {product.Rating}</div>

            <div className="product-price">₹{product.price}</div>
            <div className="product-label">Qtn:{product.quantity}</div>
            <div className="product-old-price">₹400</div>

            <div className="product-description">
              Stylish women’s wear made from premium fabric.
            </div>

            <div className="product-field">
              <div className="product-label">Size</div>
              <select
                className="product-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="">Select Size</option>
                {product.Size?.split(",").map((s, i) => (
                  <option key={i} value={s.trim()}>
                    {s.trim()}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-field">
              <div className="product-label">Quantity</div>
              <input
                type="number"
                className="product-quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="product-buttons">
              <button className="btn-cart" onClick={addToCart}>
                Add to Cart
              </button>
              <button className="btn-cart" style={{ background: "green" }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
        
        </>
    )
}
export default Shopnow;