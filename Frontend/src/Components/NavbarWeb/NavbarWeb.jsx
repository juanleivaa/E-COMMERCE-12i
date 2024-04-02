// NavbarWeb.jsx
import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './NavbarWeb.css'; 
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarWeb = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);

    return (
        <div className="header-container sticky">
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
                    <ul className="nav-menu">
                        <li onClick={() => { setMenu('shop') }}><Link style={{textDecoration:'none' , color:'#626262'}} to='/'>Home</Link>{menu === "shop" ? <hr/> : <></>}</li>
                        <li><ScrollLink style={{textDecoration:'none', color:'#626262'}} to='destacado' smooth={true} duration={500}>Destacado</ScrollLink>{menu === "" ? <hr/> : <></>}</li>
                        <li><ScrollLink style={{textDecoration:'none', color:'#626262'}} to='shop' smooth={true} duration={500}>Shop</ScrollLink>{menu === "" ? <hr/> : <></>}</li>

                        <li>
                            <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                                <NavDropdown.Item><li onClick={() => { setMenu('mens') }}><Link style={{textDecoration:'none'}} to='/mens'>Hombre</Link></li></NavDropdown.Item>
                                <NavDropdown.Item><li onClick={() => { setMenu('womens') }}><Link style={{textDecoration:'none'}} to='/womens'>Mujer</Link></li></NavDropdown.Item>
                                <NavDropdown.Item><li onClick={() => { setMenu('kids') }}><Link style={{textDecoration:'none'}} to='/kids'>Niños</Link></li></NavDropdown.Item>
                            </NavDropdown>
                        </li>
                        <li><Link style={{textDecoration:'none', color:'#626262'}} to='/'>Contacto</Link>{menu === "" ? <hr/> : <></>}</li>
                        <li><Link style={{textDecoration:'none', color:'#626262'}} to='/'><InfoIcon></InfoIcon></Link>{menu === "" ? <hr/> : <></>}</li>
                    </ul>
                </nav>
                
            </div>

        </div>
    );
};

export default NavbarWeb;
