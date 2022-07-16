import { Modal, Button } from 'react-bootstrap'
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function Login({ show, handleClose }) {

  let navigate = useNavigate();

  const title = 'Login';
  document.title = 'DumbMerch | ' + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post('/login', body, config);

      if (response?.status === 200) {

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data,
        });

        if (response.data.data.status === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (

      <Modal show={show} onHide={handleClose} centered style={{ width: '30%', marginLeft: '35%' }}>
        <Modal.Body className="text-dark">
          <div style={{ fontSize: '22px', lineHeight: '49px', fontWeight: '600', borderBottom: 'solid' }} className="mt-3 mb-5">
            Log In
          </div>

          {message && message}
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="mt-3 form d-flex">
              <h5 className='me-5 pe-5 mt-1'>Name</h5>
              <input
                type="text"
                placeholder="e.g Johndoe@example.com"
                value={email}
                name="email"
                onChange={handleChange}
                className="px-3 py-2"
                style={{ color: '#000000', backgroundColor: '#ffffff' }}
              />
            </div>

            <div className="mt-3 form d-flex">
              <h5 className='me-5 pe-3 mt-1'>password</h5>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                name="password"
                onChange={handleChange}
                className="px-3 py-2"
                style={{ color: '#000000', backgroundColor: '#ffffff' }}
              />
            </div>
            <div className="d-flex gap-2 mt-4 float-end">
              <Button variant="danger ps-5 pe-5 mt-2 me-2 w-40" type="submit" className="btn px-5 ">
                Save
              </Button>
              <Button variant="outline-danger ps-5 pe-5 mt-2 me-2 w-40" className="btn px-5">
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )
}