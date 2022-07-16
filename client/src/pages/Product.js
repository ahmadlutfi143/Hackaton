import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Slider from "react-slick";
import imgEmpty from '../assets/empty.svg';
import Money from '../assets/Money.png';
import '../style/Home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Daily from "../components/auth/Daily";
import Weekly from "../components/auth/Weekly";
import { faMarsAndVenus, faPhone, faCirclePlus, faEnvelope, faUser, faMessage, faRightFromBracket, faBasketShopp, faCirclePlusing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Product() {

  let navigate = useNavigate();

  // const [state] = useContext(UserContext);
  // const checkAuth = () => {
  //   if (state.isLogin === true) {
  //     if(state.user.status == 'Customer'){
  //       navigate('/user')
  //     }else{
  //       navigate('/admin')
  //     }
  //   }
  // };

  // checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

    return (
        <div className='user-container'>
          <body className='border-home'>
            <Container>
        <Row className="d-flex align-items-center">
            <div className="col-md-8">
            <Button variant="" onClick={switchLogin} className="btn px-4 mt-2">
                <b>July 2022</b>
              </Button>
              <Button variant="" onClick={switchLogin} className="btn px-4 mt-2">
                <b>Daily</b>
              </Button>
              <Button variant="" onClick={switchRegister} className="btn px-4 mt-2">
                <b>Weekly</b>
              </Button>
              <Button variant="" onClick={switchRegister} className="btn px-4 mt-2">
                <b>Monthly</b>
              </Button>
              <Button variant="mt-2 float-end"><FontAwesomeIcon icon={faCirclePlus} style={{ color: '#EB786B', fontSize: '45px' }} />
              </Button>
            </div>
            
        </Row>
      </Container>
      
            </body>

            <body>
            <Col>{isRegister ? <Weekly/> : <Daily />}</Col>
            </body>
        </div>
        
    );
}

export default Product;