import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";


function Wishlist({ getwishlistcount }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();

  // ✅ FETCH WISHLIST
  const fetchWishlist = async () => {
     if (!user) {
    navigate("/login");
    return;
  }

    try {
      const res = await axios.get("http://localhost:4000/getwishlist", {
        params: { userId: user._id },
      });

      setWishlist(res.data);

   
      const ids = res.data.map(item =>
        item.productId?._id?.toString()
      );

      setWishlistIds(ids);

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);


 const removeFromWish = async (item) => {
  try {
    await axios.delete("http://localhost:4000/removewishlist", {
      data: {
        userId: user._id,
        productId: item.productId._id,
      },
    });


    setWishlist(prev =>
      prev.filter(p => p.productId._id !== item.productId._id)
    );

    setWishlistIds(prev =>
      prev.filter(id => id !== item.productId._id)
    );
    window.location.reload();
  
    localStorage.setItem("wishlistUpdated", Date.now());

  } catch (err) {
    console.log("Remove error:", err);
  }
};
  return (
    <>
    <Header getwishlistcount={getwishlistcount} />

      <div className="wishlist-container">
        <h3 className="wishlist-title">Your Wishlist</h3>

        {wishlist.length === 0 ? (
          <p className="empty-text">No items in wishlist</p>
        ) : (
          <div className="product-grid">
            {wishlist.map((item) => (
              <div className="product-card" key={item._id}>

                <Link to={`/category/Women1/${item.productId?._id}`}>
                  <img
                    className="product-image"
                    src={`http://localhost:4000/uploads/${item.productId?.image}`}
                    alt={item.productId?.Product}
                  />
                </Link>

                <h4 className="product-name">
                  {item.productId?.Product}
                </h4>

                <p className="price">
                  ₹{item.productId?.Price}
                </p>

                <span className="delivery">
                  Free Delivery
                </span>

                <div className="rating">
                  <span className="star">
                    {item.productId?.Rating} ★
                  </span>
                  <span className="reviews">
                    {item.productId?.Review} Reviews
                  </span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWish(item)}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;