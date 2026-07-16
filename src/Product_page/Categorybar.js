import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "./girl.jfif";
import { Link } from "react-router-dom";
import "./Header.css";
function Categorybar(){
    
      const navigate=useNavigate();
         const [isOpen, setIsOpen] = useState(false);
     
          const toggleMenu = () => {
         setIsOpen(!isOpen);
       };
       const userData = localStorage.getItem("user");
     
     const loginuser =
       userData && userData !== "undefined"
         ? JSON.parse(userData)
         : null;
        const [count, setCount] = useState(0);
     
       const getcount = async () => {
         const user = JSON.parse(localStorage.getItem("user"));
     
       
         if (!user) {
           setCount(0);
           return;
         }
     
         try {
           const res = await axios.get(
             `http://localhost:4000/cartcount/${user._id}`
           );
     
           setCount(res.data.count); 
         } catch (err) {
           console.log(err);
         }
       };
     
       useEffect(() => {
         getcount();
       }, []);
       const [wishlistcount, setWishlistcount] = useState(0);
     
     const getwishlistcount = async () => {
       const user = JSON.parse(localStorage.getItem("user"));
     
       if (!user) {
         setWishlistcount(0);
         return;
       }
     
       try {
         const res = await axios.get(
           `http://localhost:4000/wishcount/${user._id}`
         );
     
         setWishlistcount(res.data.count);
       } catch (err) {
         console.log(err);
       }
     };
     
     // ✅ run on load
     useEffect(() => {
       getwishlistcount();
     }, []);
       const [data, setData] = useState([]);
       const [openCategory, setOpenCategory] = useState(null);
     
       useEffect(() => {
         axios
           .get("http://localhost:4000/viewuser")
           .then((res) => setData(res.data))
           .catch((err) => console.log(err));
       }, []);
     
       
       const grouped = data.reduce((acc, item) => {
         if (!acc[item.Category]) {
           acc[item.Category] = {
             image: item.image,
             subs: [],
           };
         }
         acc[item.Category].subs.push(item.Subcategory);
         return acc;
       }, {});
     const id = loginuser?._id;
    return(
        <>
         <div className="category-bar">
  {Object.entries(grouped).map(([category, info]) => (
    <div key={category} className="category-item">

  
      <Link
        to={`/category/${category}`}
        className="category-image-btn"
        onMouseEnter={() => setOpenCategory(category)}
      >
        <img
          src={`http://localhost:4000/uploads/${info.image}`}
          alt={category}
        />
        <span>{category}</span>
      </Link>

    
      {openCategory === category && (
        <div
          className="dropdown"
          onMouseLeave={() => setOpenCategory(null)}
        >
          {info.subs.map((sub, i) => (
            <Link
              key={i}
              to={`/category/${category}/${sub}`}
              className="dropdown-item"
            >
              {sub}
            </Link>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

        </>
    )
}
export default Categorybar;