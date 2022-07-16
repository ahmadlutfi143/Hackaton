import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Money from '../assets/Money.png'
import Profile from '../assets/Profile.png'
import { Dropdown } from 'react-bootstrap';
import { faEnvelope, faGear, faMessage, faArrowRightFromBracket, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarUser() {

  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  const logout = () => {
      console.log(state)
      dispatch({
          type: "LOGOUT"
      })
      navigate("/auth")
  }
  return (
    <Navbar bg='white'>
    <Container>
      <Navbar.Brand as={Link} to="/user"><img src={Money} style={{ maxWidth: '50px' }} alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Dropdown>
          <Dropdown.Toggle className='bg-transparent border-0'>
            <img
              src={Profile}
              className="rounded-circle me-2 img-contact"
              alt="user avatar"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className='me-5'>
            <Dropdown.Item as={Link} to="/user/profile" style={{ color:'#000000', fontSize: '20px' }}><FontAwesomeIcon icon={faGear} style={{ color: '#F3A871', fontSize: '25px', paddingRight: '10px' }} /> Settings</Dropdown.Item>
            <Dropdown.Item onClick={logout} style={{ color:'#000000', fontSize: '20px' }}><FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: '#F3A871', fontSize: '25px', paddingRight: '10px' }} /> Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarUser;