
import React from 'react';
import { useMediaQuery } from '@mui/material';
import NavbarWeb from '../NavbarWeb/NavbarWeb'; 
import NavbarMobile from '../NavbarMobile/NavbarMobile';

const Navbar = () => {
    const isDesktop = useMediaQuery('(min-width:800px)');

    return isDesktop ? <NavbarWeb /> : <NavbarMobile />;
};

export default Navbar;








// // import React, { useContext, useState , useRef } from 'react';
// // import './Navbar.css';
// // import { Link } from 'react-router-dom';
// // import { ShopContext } from '../../Context/ShopContext';

// // import logo from '../Assets/logo.png';
// // import cart_icon from '../Assets/cart_icon.png';
// // import nav_dropdown from '../Assets/nav_dropdown.jpg';

// // const Navbar = () => {
// //     const [menu, setMenu] = useState("shop");
// //     const {getTotalCartItems} = useContext(ShopContext)
// //     const menuRef = useRef();


// //     const dropdown_toogle = (e) => {
// //         menuRef.current.classList.toggle('nav-menu-visible');
// //         e.target.classList.toggle('open');
// //     }

// //     return (
// //         <div className='navbar'>
// //             <div className='nav-logo'>
// //                 <Link to={'/'}>
// //                     <img className='logo' src={logo} alt="" />
// //                 </Link>
// //             </div>
// //             <img className='nav-dropdown' onClick={dropdown_toogle} src={nav_dropdown} alt="" />
// //             <ul ref={menuRef} className="nav-menu">
// //                 <li onClick={() => { setMenu('shop') }}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu === "shop" ? <hr/> : <></>}</li>
// //                 <li onClick={() => { setMenu('mens') }}><Link style={{textDecoration:'none'}} to='/mens'>Hombre</Link>{menu === "mens" ? <hr/> : <></>}</li>
// //                 <li onClick={() => { setMenu('womens') }}><Link style={{textDecoration:'none'}} to='/womens'>Mujer</Link>{menu === "womens" ? <hr/> : <></>}</li>
// //                 <li onClick={() => { setMenu('kids') }}><Link style={{textDecoration:'none'}} to='/kids'>Niños</Link>{menu === "kids" ? <hr/> : <></>}</li>

// //             </ul>
// //             <div className="nav-login-cart">
// //                 {localStorage.getItem('token') 
// //                 ? <button onClick={() => {localStorage.removeItem('token');window.location.replace('/')}} >Logout</button>
// //                 :<Link to='/login'><button>Login</button></Link>}
// //                 <Link to='/cart'><img src={cart_icon} alt="cart icon" /></Link>
// //                 <div className="nav-cart-count">{getTotalCartItems()}</div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Navbar;
