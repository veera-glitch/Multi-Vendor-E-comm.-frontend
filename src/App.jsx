import {useState} from 'react';
import { FaShoppingCart, FaSearch, FaTruck, FaShieldAlt, FaStar, FaTags } from 'react-icons/fa';
import './App.css';
import { productsData } from './Products';
function App(){

  // CATEGORY DATA
// Stores all available product categories
const categories = ["All Products", "Anime merch", "Apparel", "Baby products", "Electronics", "Fashion", "Footwear", "Furniture",  "Home appliances", "Home decor", "Kids wear", "Kitchen", "K-pop merch","Laptops", "Mens wear", "Phones", "Sports", "Toys", "Womens wear"];

// STATE MANAGEMENT
// Stores values that change while the app runs
const [selectedCategory, setSelectedCategory] = useState("All Products");
const [searchQuery, setSearchQuery] = useState("");
const[mode,setMode]=useState(true);
const[openCat,setOpenCat]=useState(false);

// EVENT HANDLERS
// Functions that respond to user actions
function handleCategoryClick(category){
   setSelectedCategory(category);
 };


const lightanddarkness=()=>{
  setMode( prev=>!prev) 
 };

 const categoryDropdown =()=>{
  setOpenCat(prev =>!prev) 
 };


// FILTERING LOGIC
// Filters products based on the selected category
  const filteredProducts = productsData.filter((product)=>
(
selectedCategory === "All Products" ||
product.category === selectedCategory
)
&&
product.name.toLowerCase().includes(searchQuery.toLowerCase())

);


// USER INTERFACE (JSX)
// Everything below is rendered to the screen
  return(
    <>
  <div className={mode?'body':'light-theme'}>
    {/* HEADER / NAVIGATION BAR */}
    <nav className='header-block'>
      <div className="logo-container">
      <img src="/images/first-and-lastlogo-removebg-preview.png" alt="logo" className='logo-img' /></div>

      {/* Search Bar */}
    <div className='search-container'>
      <div className='search-input-wrapper'>
        <FaSearch className='search-icon' />
        <input 
          id="search-input" 
          type='text' 
          placeholder="what are you looking for? find it here!" 
          value={searchQuery}
          onChange={(e) =>setSearchQuery( e.target.value)}
        />
      </div>

    </div>

{/* Shopping Cart */}
    <div className="cart-container">
        <FaShoppingCart className="cart-icon" />
      </div>
   </nav>

{/* ================================
      MAIN CONTENT
================================ */}
   <main className="main-layout">

    {/*  Sidebar */}
<div className="categories-container">
  <div className="categories-header">
    
    <div className="delivery-badge">
      <FaTruck className="delivery-icon" />
      <span>Guaranteed Delivery</span>
    </div>
    <div className="feature-badges">
      <div className="feature-badge">
        <FaShieldAlt className="feature-icon" />
        <span>Secure Checkout</span>
      </div>
      <div className="feature-badge">
        <FaStar className="feature-icon" />
        <span>Top Rated</span>
      </div>
      <div className="feature-badge">
        <FaTags className="feature-icon" />
        <span>Best Deals</span>
      </div>
      <div >
     <button  className= 'mode-button' onClick={() =>lightanddarkness() }>{mode?'Light': 'Dark'}Mode</button>
      </div>
      <button className="categories-toggle"  onClick={() =>categoryDropdown()}> Categories{ openCat?'▼':'▲'}</button>
    </div>
  </div>

    
    <div>
      {/* Display all categories */}
     {openCat && categories.map((category, index) => (
        <div 
          key={index}
          className="category-items"
          onClick={() => handleCategoryClick(category)}
        >
          <h3>{category}</h3>
        </div>
      ))}
    </div>
  
       </div>
{/* Product Display Section */}
      <div className="products-container"> 

      <h1>{selectedCategory}</h1>
         <div > 
  <p style={{ color: '#aaa' }}>
    Currently Filtering: <span style={{ color: '#5DD62C', fontWeight: 'bold' }}>{selectedCategory}</span>
  </p>
  <br />


  {/* Product Cards */}
   <div className="product-grid">

{/* Loop through filtered products */}

    {filteredProducts.map((product) => (
      <div key={product.id} className="product-card">
        <div className="product-img-placeholder">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <span className="product-tag">{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <div className="product-bottom">
          <span className="product-price" style={{ color: '#5DD62C', fontSize:'19px',marginTop:'10px',fontWeight:'bolder' }}>
            ₦{product.price.toFixed(2)}
          </span>
          <button className="add-to-cart-btn">+</button>
        </div>
      </div>
    )
    )}
  </div>
</div>
      </div>
  


      </main>

</div>
    </>
  );
}
export default App;