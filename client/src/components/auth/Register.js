import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import Money from '../../assets/Money.png'

export default function Register() {

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

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-1">
      <div className="mb-3" style={{ textAlign: 'center' }}>
          <img src={Money} style={{ width: "125px" }} alt="brand" />
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Username"
              value={name}
              name="name"
              onChange={handleChange}
              className="px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-0">
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
