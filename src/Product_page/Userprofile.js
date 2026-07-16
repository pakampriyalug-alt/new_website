// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./Header";
// import "./Userprofile.css";
// function Userprofile() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

   
//     if (!storedUser) {
//       setError("Please login first");
//       return;
//     }

//     const userId = storedUser._id;

//     axios.get(`http://localhost:4000/profile/${userId}`)
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         setError("Failed to load profile");
//       });

//   }, []);

 
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("userprofileId");
//     window.location.href = "/";
//   };


//   if (!user && !error) {
//     return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
//   }


//   if (error) {
//     return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;
//   }

//   return (
//     <>
//     <Header/>
//     <div className="container" style={{width:"400px",height:"300px"}}>
//       <h2 className="heading">User Profile</h2>

//       <div className="card">
//          <img style={{height:"50px",width:"50px"}}src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" /> {user.name}
      
//         <p><strong>Email:</strong> {user.email}</p>

//         <button style={styles.button} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//     </>
//   );
// }

// export default Userprofile;


// const styles = {
//   container: {
//     textAlign: "center",
   
//     height:"100vh",
//     background:"linear-gradient(to right, #bbf7d0, #f0fdf4)"
//   },
//   heading: {
//     marginBottom: "20px",
//    padding:"20px"
//   },
//   card: {
//     display: "inline-block",
//     padding: "20px",
  
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)"
//   },
//   button: {
//     marginTop: "15px",
//     padding: "10px 20px",
//     backgroundColor: "black",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   }
// };
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import "./Userprofile.css";
import { useNavigate } from "react-router-dom";

function Userprofile() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
// const navigate=useNavigate();
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (!storedUser) {
//       setError("Please login first");
//       return;
//     }

//     axios
//       .get(`http://localhost:4000/profile/${storedUser._id}`)
//       .then((res) => setUser(res.data))
//       .catch(() => setError("Failed to load profile"));
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };
// const handeledit=()=>{
//   navigate("/profileedit")
// }
//   if (!user && !error) return <h3 className="loading">Loading...</h3>;
//   if (error) return <h3 className="error">{error}</h3>;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get("http://localhost:4000/profile", {
       headers: {
  Authorization: `Bearer ${token}`,
},
      });

      setUser(res.data);

    } catch (err) {
      console.log(err);
     
    }
  };

  fetchProfile();
}, []);

// ✅ Prevent crash
if (!user) {
  return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
}

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
const handeledit=()=>{
   navigate("/profileedit")
}
  return (
    <>
      <Header />
{/* 
      <div className="profile-container">
        <div className="profile-card">

          <div className="profile-top">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              className="profile-img"
            />
            <h2>{user.name}</h2>
          </div>

          <div className="profile-info">
            <p><span>Email:</span> {user.email}</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div> */}
 <div className="profile-container">
  <div className="profile-card">

    <div className="profile-header">
     <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              ></img>
      <h2>{user.name}</h2>
      <p>User</p>
    </div>

    <div className="profile-body">
      <h3>Information</h3>

      <div className="info-grid">
        <div>
          <span><i class="fa-solid fa-envelope"></i>Email</span>
          <p>{user.email}</p>
        </div>

        <div>
          <span><i class="fa-solid fa-phone"></i>Phone</span>
          <p>{user.mobile}</p>
        </div>

        <div>
          <span><i class="fa-solid fa-address-book"></i>Address</span>
          <p>{user.address}</p>
        </div>

        <div>
          <span><i class="fa-duotone fa-solid fa-person-half-dress"></i>Gender</span>
          <p>{user.gender}</p>
        </div>
      </div>

      <button className="infobutton" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</button>
      <button className="infobutton2" onClick={handeledit}><i class="fa-solid fa-pen-to-square"></i>Edit</button>
    </div>

  </div>
</div>
    </>
  );
}

export default Userprofile;