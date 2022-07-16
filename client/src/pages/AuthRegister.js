import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DumbMerch from '../assets/DumbMerch.png'
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export default function AuthRegister() {

  let navigate = useNavigate();

  const [state] = useContext(UserContext);
  const checkAuth = () => {
    if (state.isLogin === true) {
      if(state.user.status == 'Customer'){
        navigate('/user')
      }else{
        navigate('/admin')
      }
    }
  };

  checkAuth();

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
        <Col md="12">{isRegister ? <Register /> : <Login />}
            <div className="mt-5">
              <button onClick={switchLogin} className="btn btn-login px-5">
                Login
              </button>
              <button onClick={switchRegister} className="btn btn-register px-5">
                Register
              </button>
            </div>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}
