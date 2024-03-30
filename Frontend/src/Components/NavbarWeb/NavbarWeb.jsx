import React, { useContext, useState , useRef } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './NavbarWeb.css'; 
import { Link } from 'react-router-dom'; 
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';






const NavbarWeb = () => {


    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();


  return (
    <div className="header-container sticky"> {/* Agrega la clase 'sticky' aquí */}
      <div className="header">
        <Link to={'/'}>
            <img className='logo' src={logo} alt="" />
        </Link>
        <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button><SearchIcon/></Button>
        </Form>
        <div className="nav-login-cart">
            {localStorage.getItem('token') 
            ? <button onClick={() => {localStorage.removeItem('token');window.location.replace('/')}} >Logout</button>
            :<Link to='/login'><button>Login</button></Link>}
            <Link to='/cart'><img src={cart_icon} alt="cart icon" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
      <div className="sticky-nav">
        <nav>
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu('shop') }}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu === "shop" ? <hr/> : <></>}</li>
                <li onClick={() => { setMenu('mens') }}><Link style={{textDecoration:'none'}} to='/mens'>Hombre</Link>{menu === "mens" ? <hr/> : <></>}</li>
                <li onClick={() => { setMenu('womens') }}><Link style={{textDecoration:'none'}} to='/womens'>Mujer</Link>{menu === "womens" ? <hr/> : <></>}</li>
                <li onClick={() => { setMenu('kids') }}><Link style={{textDecoration:'none'}} to='/kids'>Niños</Link>{menu === "kids" ? <hr/> : <></>}</li>
                <li onClick={() => { setMenu('') }}><Link style={{textDecoration:'none'}} to='/'>Destacado</Link>{menu === "" ? <hr/> : <></>}</li>
                <li onClick={() => { setMenu('') }}><Link style={{textDecoration:'none'}} to='/'>Contacto</Link>{menu === "" ? <hr/> : <></>}</li>
                <li onClick={() => { setMenu('') }}><Link style={{textDecoration:'none'}} to='/'><InfoIcon></InfoIcon></Link>{menu === "" ? <hr/> : <></>}</li>
            </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavbarWeb;