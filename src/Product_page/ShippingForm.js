import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import "./ShippingForm.css";
import "./Saree.css";
import { Link } from "react-router-dom";
import "./Addtocart.css";

function ShippingForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/buynow/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);


const goToShipping = async () => {
   const user = JSON.parse(localStorage.getItem("user"));
   
  try {
     const totalAmount= product.price * product.quantity
     const quantity=product.quantity
    const res = await axios.post(
      "http://localhost:4000/api/order/create",
      {
       

       userId : user._id,
       product: product,
        productId:product._id,
      
        quantity:quantity,
        totalAmount:totalAmount,
           
      }
    );
    
  console.log(user._id);
   
    localStorage.setItem("orderId", res.data.orderId);

    
    navigate(`/buynow/${id}`);

  } catch (error) {
    console.log("Create Order Error:", error);
    alert("Order Create Failed");
  }
};


  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <Header />

      <div className="checkout-container">

        {/* LEFT PRODUCT */}
        <div className="checkout-left">

          <div className="page-header">
            <h1 className="page-title">Buynow Product</h1>
          </div>

          <div className="product-card-new">
            <div className="product-flex-new">

              <Link to={`/category/Women1/${product.productId}`}>
                <img
                  className="product-image-new"
                  src={`http://localhost:4000/uploads/${product.image}`}
                  alt={product.productName}
                />
              </Link>

              <div className="product-details-new">
                <h2>{product.productName}</h2>
                <p className="price-new"> ₹ {product.price}</p>
                <p>Size : {product.size}</p>
                <p>Quantity : {product.quantity}</p>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT PRICE */}
        <div className="checkout-right">

          <div className="price-card-new">

            <h3 className="price-title-new">Price Details</h3>

            <div className="price-row-new">
              <span>Total Items</span>
              <span>{product.quantity}</span>
            </div>

            <div className="price-row-new">
              <span>Total Price</span>
              <span>₹ {product.price * product.quantity}</span>
            </div>

            <hr />

            <div className="price-row-new total-final-new">
              <span>Total Amount</span>
              <span>₹ {product.price * product.quantity}</span>
            </div>

            <button
              className="btn-address-new"
              onClick={goToShipping}
            >
              Add Shipping Address
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ShippingForm;

//   return (
//     <>
//       <Header />

//       <div className="checkout-container">

//         {/* LEFT */}
//         <div className="checkout-left">

//           <h1>Buy Now Product</h1>

//           <div className="product-card-new">
//             <div className="product-flex-new">

//               <img
//                 className="product-image-new"
//                 src={`http://localhost:4000/uploads/${product.image}`}
//                 alt={product.productName}
//               />

//               <div className="product-details-new">
//                 <h2>{product.productName}</h2>
//                 <p>₹ {product.price}</p>
//                 <p>Size : {product.size}</p>
//                 <p>Quantity : {product.quantity}</p>
//               </div>

//             </div>
//           </div>

//         </div>

//         {/* RIGHT */}
//         <div className="checkout-right">

//           <div className="price-card-new">

//             <h3>Price Details</h3>

//             <p>Total Items: {product.quantity}</p>
//             <p>Total Price: ₹ {product.price * product.quantity}</p>

//             <hr />

//             <h3>Total Amount: ₹ {product.price * product.quantity}</h3>

//             <button onClick={goToShipping}>
//               Add Shipping Address
//             </button>

//           </div>

//         </div>

//       </div>
//     </>
//   );
// }

// export default ShippingForm;