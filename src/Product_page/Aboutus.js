import "./Aboutus.css";
import aboutImg from "./photo1.avif";
import Header from "./Header";
import Categorybar from "./Categorybar";
function Aboutus() {
  return (
    <>
    <Header/>
     <Categorybar/>
     <div className="about-body">

      {/* Welcome Section */}
      <div className="about-top">
        <div className="about-text">
          <h1>Welcome to Go Style</h1>
          <h3>Your Style, Our Passion</h3>

          <p>
            At Go Style, fashion is more than clothing — it is confidence and
            self expression. We bring the latest fashion trends with premium
            quality at affordable prices.
          </p>

          <p>
            We believe everyone deserves to look stylish and feel confident.
            Our collections are designed for comfort, elegance, and modern lifestyle.
          </p>
        </div>

        <div className="about-image">
          <img src={aboutImg} alt="Go Style Fashion" />
        </div>
      </div>

      <div className="mission-section">
  <h2 className="mission-title">Our Mission</h2>

  <div className="mission-box-container">

    <div className="mission-box">
      <i className="fa-solid fa-heart mission-icon"></i>
      <h3>Inspire Confidence</h3>
      <p>Helping customers feel stylish and confident everyday.</p>
    </div>

    <div className="mission-box">
      <i className="fa-solid fa-shirt mission-icon"></i>
      <h3>Latest Trends</h3>
      <p>Providing trending and timeless fashion collections.</p>
    </div>

    <div className="mission-box">
      <i className="fa-solid fa-truck mission-icon"></i>
      <h3>Fast Delivery</h3>
      <p>Quick and reliable delivery for better shopping experience.</p>
    </div>

  </div>
</div>



      {/* Story Section */}
      <div className="about-story">
        <h2>Our Story</h2>
        <p>
          Go Style started with a simple idea — make fashion shopping easy,
          affordable and enjoyable. Today, we serve thousands of happy customers
          with trendy and comfortable fashion collections.
        </p>
      </div>
       <button className="aboutusbtn">Contact Us</button>
    </div>
        <div className="footer">
  <div className="footer-section">
    {/* <img src={logo} className="logo" /> */}
    <div className="logo">
          <span className="logo-circle">Go</span>
          <span className="logo-text" style={{color:"white"}}>Style</span>
        </div>
    <p>
      Your trusted online store for electronics, gadgets, and accessories.
      We offer high-quality tech products at affordable prices.
    </p>
  </div>

  <div className="footer-section">
    <h3>Quick Links</h3>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/aboutus">About</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/login">Login</a></li>
    </ul>
  </div>

  <div className="footer-section">
    <h3>Customer Service</h3>
    <ul>
      <li><a href="/help">Help & Support</a></li>
      <li><a href="/shipping">Shipping Info</a></li>
      <li><a href="/returns">Return Policy</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms & Conditions</a></li>
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

export default Aboutus;
