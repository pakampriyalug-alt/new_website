import Header from "./Header";
import "./Homepage.css";
import "./frock.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Saree.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Categorybar from "./Categorybar";
import Swal from "sweetalert2";


function Women1({ getwishlistcount }) {

  const seller = JSON.parse(localStorage.getItem("seller"));
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const res = await axios.get("http://localhost:4000/getwishlist", {
        params: { userId: user._id }
      });

      const ids = res.data.map(item => item.productId._id.toString());
      setWishlistIds(ids);

    } catch (err) {
      console.log("Fetch wishlist error:", err);
    }
  };
  const [wishlistIds, setWishlistIds] = useState([]);

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
  const toggleWishlist = async (product) => {
    if (wishlistIds.includes(product._id)) {
      await removeFromWish(product);
    } else {
      await addTowish(product);
    }

    fetchWishlist();
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


      window.location.reload();
      getwishlistcount();

    } catch (err) {
      console.log(err);
    }
  };


  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/viewproduct")
  //     .then((res) => {
  //       const found = res.data.find((p) => p._id === id);
  //       setProduct(found);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);
  useEffect(() => {
    const getProduct = async () => {
      try {

        const [adminRes, sellerRes] = await Promise.all([
          axios.get("http://localhost:4000/viewproduct"),
          axios.get("http://localhost:4000/sellerallproduct")
        ]);

        const mergedProducts = [...adminRes.data, ...sellerRes.data];

        setProducts(mergedProducts);

        const found = mergedProducts.find((p) => p._id === id);

        setProduct(found);

      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);
  // const relatedProducts = products.filter(
  //   (p) => p.Subcategory === product?.Subcategory && p._id !== product?._id
  // );
  const relatedProducts = products.filter(
    (p) =>
      (p.Subcategory || p.subcategory) ===
      (product?.Subcategory || product?.subcategory) &&
      p._id.toString() !== id
  );
  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));



    if (!user) {

      Swal.fire({
        title: "Success !",
        text: "Login First !",
        icon: "success"
      });

      return;
    }
    if (!size) {
    Swal.fire("Please select the size!");
      return;
    }



    try {
      const res = await axios.post("http://localhost:4000/addcart", {
        userId: user._id,
        productId: product._id,
        productName: product.Product,
        image: product.image,
        price: product.Price,
        size: size,
        quantity: quantity,
        Sellerid: product.Sellerid || product.Sellerid?._id,
      });


      if (res.data.alreadyExists) {
        alert("Product is already in the cart");
      } else {


        Swal.fire({
          title: "Success !",
          text: "Product is added Successfuly!",
          icon: "success"
        });

      }
    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    }
  };
  const Buynow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
     Swal.fire("Please login first!");
      return;
    }
    if (!size) {
       Swal.fire("Please select the size!");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        "http://localhost:4000/addcart",
        {
          userId: user._id,
          productId: product._id,
          productName: product.Product,
          image: product.image,
          price: product.Price,
          size: size,
          quantity: quantity,
          Sellerid: product.Sellerid,
        }
      );

      navigate(`/shippingform/${res.data.cartId}`);
      console.log(product._id);

    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }





  return (
    <>
      <Header />
      <Categorybar />
      <div className="product-page">
        <div className="product-container">
          <i
            className="fa-solid fa-heart"
            style={{
              cursor: "pointer",
              fontSize: "30px",
              color: wishlistIds.includes(product._id) ? "red" : " #dfdfce",
            }}
            onClick={() => toggleWishlist(product)}
          ></i>
          <div className="product-left">

            <img
              src={`http://localhost:4000/uploads/${product.image}`}
              alt="product"
              className="product-image"
            />

          </div>

          <div className="product-right">

            <div className="product-title">{product.Product}</div>
            <div className="product-rating">⭐ {product.Rating}</div>

            <div className="product-price">₹{product.Price}</div>
            <div className="product-old-price">₹400</div>


            {product.Sellerid && (
              <div className="seller-box">
                <h4>Sold by: {product.Sellerid.shopname}</h4>
                <p>Shop Address: {product.Sellerid.shopaddress}</p>
              </div>
            )}
            <div className="product-description">
              {product.Description}
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
            <span
              className="line"
              style={{
                marginLeft: "10px",
                color: "white",
                backgroundColor:
                  product.Stock <= 0 ? "red" : null
              }}

            >
              {
                product.Stock <= 0
                  ? "Out of Stock"
                  : null
              }

            </span>


            <div className="product-buttons">
              <button className="btn-cart" disabled={product.Stock <= 0} onClick={addToCart}>
                Add to Cart
              </button>
              {/* <button onClick={() => navigate(`/shippingform/${product._id}`)}>
  Buy Now
</button> */}
              <button className="btn-cart" onClick={Buynow} disabled={product.Stock <= 0} style={{ backgroundColor: "green" }}>
                Buynow
              </button>



            </div>
          </div>
        </div>
      </div>
      <div className="page-header">
        <h1 className="page-title">Related Product</h1>

      </div>

      <div className="product-grid">
        {relatedProducts.slice(0, 5).map((item) => (
          <div key={item._id} className="product-card">
            <Link to={`/category/Women1/${item._id}`}>
              <img
                src={`http://localhost:4000/uploads/${item.image}`}
                alt=""
                width="250"
              /></Link>
            <h4 className="product-name">{item.Product}</h4>
            <p className="price">₹{item.Price}</p>

            <span className="delivery" >Free Delivery</span>
            <div className="rating">
              <span className="star">{product.Rating} ★</span>
              <span className="reviews">{product.Review} Reviews</span>



            </div>
          </div>

        ))}
      </div>
      <br></br>
      <div className="footer">
        <div className="footer-section">
          {/* <img src={logo} className="logo" /> */}
          <div className="logo">
            <span className="logo-circle">Go</span>
            <span className="logo-text" style={{ color: "white" }}>Style</span>
          </div>
          <p>
            Your trusted online store for electronics, gadgets, and accessories.
            We offer high-quality tech products at affordable prices.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Help & Support</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: ElectroBazaar@electronics.com</p>
          <p>Phone: +91 1234567890</p>
          <p>Address: Chennai, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 ElectroBazaar. All rights reserved.
      </div>
    </>
  );
}

export default Women1;
