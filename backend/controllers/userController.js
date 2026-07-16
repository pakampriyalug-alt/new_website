const User = require("../models/user");
const bcrypt = require("bcryptjs");
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password,mobile,address,gender } = req.body;

    if (!name || !email || !password ||!mobile ||!address ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be 8 characters" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already registered" });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password:hashedPassword,mobile,address,gender });
    await user.save();

    res.status(201).json({
      message: "Registered Successfully",
      user, 
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.userUpdate= async(req,res)=>{

try{

const user = await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json({
message:"Profile Updated Successfully",
user:user
});

}
catch(err){
res.status(500).json(err);
}

};

// exports.userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email & Password required" });
//     }

//     const user = await User.findOne({ email, password });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid Email or Password" });
//     }

//     res.status(200).json({
//       message: "Login Success",
//       user:user, // ✅ always send user
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // 🎟️ CREATE TOKEN
   const token = jwt.sign(
  { id: user._id, role: "user" },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.status(200).json({
      message: "Login Success",
      token,   // ✅ send token
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getUserProfile = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "User only access" });
    }

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.verifyUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.json({ message: "User not found" });
    }

    res.json({ message: "User valid", user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getRegister = async (req, res) => {
  try {
    const registers = await User.find();
    res.json(registers);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteNewRegister = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
