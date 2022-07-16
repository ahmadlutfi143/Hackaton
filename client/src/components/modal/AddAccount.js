import { Modal, Button, Form } from 'react-bootstrap'
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function AddAccount({ show, handleClose, setConfirmDelete }) {

  const title = 'Register';
  document.title = 'DumbMerch | ' + title;

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;
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
      const response = await API.post('/register', body, config);

      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  const handleDelete = () => {
    setConfirmDelete(true)
  }

  return (

    <Modal show={show} onHide={handleClose} centered style={{ width: '24%', marginLeft: '38%' }}>
      <Modal.Body className="text-dark">
        <div
          style={{ fontSize: '22px', lineHeight: '49px', fontWeight: '600', borderBottom: 'solid' }}
          className="mt-3 mb-5"
        >
          Create new account
        </div>
          {message && message}
            <Form  onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="mt-3 form d-flex">
                <h5 className='me-5 mt-1'>Name</h5>
                <input
                  type="text"
                  placeholder="e.g Cash"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  className="px-3 py-2"
                  style={{ color: '#000000', backgroundColor: '#ffffff' }}
                />
                
              </div>
                <div className="d-flex gap-2 mt-4 float-end">
                  <Button variant="warning ps-5 pe-5 mt-2 me-2 w-40" className="btn px-5 ">
                Save
              </Button>
              <Button variant="outline-warning ps-5 pe-5 mt-2 me-2 w-40" className="btn px-5">
                Cancel
              </Button>
                </div>
            </Form>
      </Modal.Body>
    </Modal>
  )
}