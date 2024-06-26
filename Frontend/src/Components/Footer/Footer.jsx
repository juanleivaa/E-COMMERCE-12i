import React from 'react'
import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../Assets/logo.png'
import qrdatafiscal from '../Assets/qrdatafiscal.jpg'


function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <img src={logo} alt="Logo" className="img-fluid" />
          </Col>
          <Col className='links'>
          <Row>
            <Col>
              <button className="btn btn-link">Home</button>
            </Col>
            <Col>
              <button className="btn btn-link">Destacado</button>
            </Col>
          </Row>
          <Row>
            <Col>
              <button className="btn btn-link">Contacto</button>
            </Col>
            <Col>
              <button className="btn btn-link">Ayuda</button>
            </Col>
          </Row>

          </Col>
          <Col>
            <Row>
              <Col className='social-icons' >
                <button className="btn btn-link"><GitHubIcon style={{color:'#525252'}}/></button>
                <button className="btn btn-link"><LinkedInIcon  style={{color:'#525252'}}/></button>
                <button className="btn btn-link"><FacebookIcon  style={{color:'#525252'}}/></button>
              </Col>
            </Row>
            <Row className='contac-info'>
            <hr />
              <Col >
                <p>jleiva21082004@gmail.com</p>
                <p>+54 381 412 8781 </p>

              </Col>
            </Row>
            <Row className='contac-info'>
            <hr />
                <Col >
                  <p>Marcos Paz 80 </p>
                  <p>San Miguel de Tucumán , Argentina</p>
                </Col>
            </Row>
            <Row  className='qrdataf'>
            <hr />
              <Col className='qrdataf'>
                <img src={qrdatafiscal} alt="Imagen" className="img-fluid" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='copyright'>
          <hr />
          <p>All rights reserved © 2024 </p>
        </Row>
      </Container>
    </footer>
  );
  }
  
  export default Footer;

