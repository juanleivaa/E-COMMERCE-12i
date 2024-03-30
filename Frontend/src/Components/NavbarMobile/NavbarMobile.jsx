import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useContext, useState  } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom'; 
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import './NavbarMobile.css'; 
import SearchIcon from '@mui/icons-material/Search';


const NavbarMobile = () => {

    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext)

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Brand href="#">
                    <Link to={'/'}>
                        <img className='logo1' src={logo} alt="" />
                    </Link>
                </Navbar.Brand>
                <div className="nav-login-cart">
                    {localStorage.getItem('token')
                        ? <button onClick={() => { localStorage.removeItem('token'); window.location.replace('/') }}>Logout</button>
                        : <Link to='/login'><button>Login</button></Link>}
                    <Link to='/cart'><img src={cart_icon} alt="cart icon" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavDropdown title="Categorias" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">
                                <li onClick={() => { setMenu('mens') }}><Link style={{textDecoration:'none'}} to='/mens'>Hombre</Link>{menu === "mens" ? <hr/> : <></>}</li>
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                <li onClick={() => { setMenu('womens') }}><Link style={{textDecoration:'none'}} to='/womens'>Mujer</Link>{menu === "womens" ? <hr/> : <></>}</li>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                <li onClick={() => { setMenu('kids') }}><Link style={{textDecoration:'none'}} to='/kids'>Niños</Link>{menu === "kids" ? <hr/> : <></>}</li>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#action1">Destacado</Nav.Link>
                        <Nav.Link href="#action1">Contacto</Nav.Link>
                        <Nav.Link href="#action1">Ayuda</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                        <Button><SearchIcon/></Button>
                    </Form>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default NavbarMobile;
