import { useState, useEffect } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "./Header";



function Profileedit(){
    const navigate=useNavigate();
const handleCancel = () => {
    navigate(-1);
  };
const [user,setUser] = useState({
name:"",
email:"",
mobile:"",
address:"",
gender:""
});

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("user"));

if(data){
setUser(data);
}

},[]);

const handleChange = (e)=>{
setUser({
...user,
[e.target.name]:e.target.value
});

};

const updateProfile = async(e)=>{
e.preventDefault();

const res = await axios.put(
`http://localhost:4000/userupdate/${user._id}`,
user
);

alert(res.data.message);
 navigate(-1);

/* update localStorage */
localStorage.setItem("user", JSON.stringify(res.data.user));

};

return(
<>
<Header/>
    <div className="auth-container">

<form className="auth-card"onSubmit={updateProfile}>
<h2>Edit User Profile</h2>
<input
name="name"
value={user.name}
onChange={handleChange}
/>

<input
name="email"
value={user.email}
onChange={handleChange}
/>

<input
name="mobile"
value={user.mobile}
onChange={handleChange}
/>

<textarea
name="address"
value={user.address}
onChange={handleChange}
/>
<div className="radio-buttons">
<label>
<input
type="radio"
name="gender"
value="male"
checked={user.gender==="male"}
onChange={handleChange}
/>
Male
</label>

<label>
<input
type="radio"
name="gender"
value="female"
checked={user.gender==="female"}
onChange={handleChange}
/>
Female
</label>

</div>
<button type="submit">Save</button>
<button type="button"onClick={handleCancel}>cancel</button>

</form>
</div>
</>
);

}

export default Profileedit;