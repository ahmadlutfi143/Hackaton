import { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Money from '../assets/Money.png'
import Login from '../components/modal/Login';
import Register from '../components/modal/Register';

export default function Auth() {

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

  let navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showi, setShowi] = useState(false);
  const handleClosei = () => setShowi(false);
  const handleShowi = () => setShowi(true);

  const [idRegister, setIdRegister] = useState(null);
  const [idLogin, setIdLogin] = useState(null);
  const [confirmRegister, setConfirmRegister] = useState(null);
  const [confirmLogin, setConfirmLogin] = useState(null);

  const handleRegister = (id) => {
    setIdRegister(id);
    handleShow();
  };

  const handleLogin = (id) => {
    setIdLogin(id);
    handleShowi();
  };

  const [state, dispatch] = useContext(UserContext)
  const logout = () => {
      console.log(state)
      dispatch({
          type: "LOGOUT"
      })
      navigate("/auth")
  }

  const [isRegister, setIsRegister] = useState(false);

  return (

    <div className="">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <div className="" style={{ textAlign: 'center' }}>
            <div className="mb-4" style={{ textAlign: 'center' }}>
              <img src={Money} style={{ width: "125px" }} alt="brand" />
            </div>
            <div className="mb-5">
              <h1 style={{ color: '#000000' }}>Be a Financial Manager for Yourself</h1>
            </div>
            <div className="mb-5">
              <h5 style={{ color: '#000000' }}>Record your every Income and Expense</h5>
              <h5 style={{ color: '#000000' }}>so you can easily monitor your financial flow and manage it</h5>
            </div>
            <Button variant="outline-danger ps-5 pe-5 mt-2 me-2 w-40" onClick={() => { handleLogin(); }} className="btn px-5">
              Log In
            </Button>
            <Button variant="outline-danger ps-5 pe-5 mt-2 me-2 w-40" onClick={() => { handleRegister(); }} className="btn px-5">
              Sign Up
            </Button>
            </div>
        </Row>
      </Container>
      
      <Register
        setConfirmRegister={setConfirmRegister}
        show={show}
        handleClose={handleClose}
      />
      <Login
        setConfirmLogin={setConfirmLogin}
        show={showi}
        handleClose={handleClosei}
      />
    </div>
  );
}
