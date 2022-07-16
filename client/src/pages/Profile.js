import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { API } from '../config/api';
import DumbMerch from '../assets/DumbMerch.png'
import imgBlank from '../assets/blank-profile.png';
import '../style/Profile.css';
import { faMarsAndVenus, faPhone, faCirclePlus, faEnvelope, faUser, faMessage, faRightFromBracket, faBasketShopp, faCirclePlusing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import AddAccount from '../components/modal/AddAccount';
import AddCategory from '../components/modal/AddCategory';
import CreateTransaction from '../components/modal/CreateTransaction';

function Profile() {

    let navigate = useNavigate();

    const title = 'Profile';
    document.title = 'DumbMerch | ' + title;
  
    const { id } = useParams()
    const [state, dispatch] = useContext(UserContext)

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [idAddAccount, setIdAddAccount] = useState(null);
    const [confirmAddAccount, setConfirmAddAccount] = useState(null);

    const [idAddCategory, setIdAddCategory] = useState(null);
    const [confirmAddCategory, setConfirmAddCategory] = useState(null);
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showi, setShowi] = useState(false);
    const handleClosei = () => setShowi(false);
    const handleShowi = () => setShowi(true);

    let { data: products, refetch } = useQuery('productsCache', async () => {
      const response = await API.get('/products');
      return response.data.data;
    });
  
    let { data: profile } = useQuery('profileCache', async () => {
      const response = await API.get('/profile/' + id);
      return response.data.data;
    });
  
    let { data: transactions } = useQuery('transactionsCache', async () => {
      const response = await API.get('/transactions');
      return response.data.data;
    });

    const handleEdit = (id) => {
      navigate(`/admin/edit-product/${id}`);
    };
  
    const handleDelete = (id) => {
      setIdDelete(id);
      handleShow();
    };

    const handleAddAccount = () => {
      handleShow();
    };

    const handleAddCategory = () => {
      handleShowi();
    };
  
    const deleteById = useMutation(async (id) => {
      try {
        await API.delete(`/product/${id}`);
        refetch();
      } catch (error) {
        console.log(error);
      }
    });
  
    useEffect(() => {
      if (confirmDelete) {
        handleClose();
        deleteById.mutate(idDelete);
        setConfirmDelete(null);
      }
    }, [confirmDelete]);

    return (
        <div className='user-container'>
          <body className='border-profile'>
            <div className='container h-100'>
              <div className='container h-100'>
                <div className='row alin-items-center h-100'>               
                  <form className='wow fadeInUp border-0 bg-transparent pt-4' data-wow-delay='0.2s'>
                    <div className='card border-0 bg-transparent'>                  
                      <div className='card mb-5 border-0' style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                        <div className='row g-0'>
                          <div className='col pt-0'>
                            <div className='card-body'>
                              <h1 className='pb-3' style={{ color: '#000000', fontSize: '30px', borderBottom: 'solid' }}><b>Accounts</b></h1>
                              <div className='col-md-12 d-flex'>
                              <div className='col-md-9'>
                              <Table className='mt-5' style={{ border: 'solid' }}>
                                <thead className=''>
                                  <tr>
                                    <th>No&emsp;&emsp;&emsp;&emsp;</th>
                                    <th>Name</th>
                                    <th style={{ width: '30%' }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {transactions?.map((item, index) => (
                                    <tr key={index}>
                                      <td className='pt-4'>{index + 1}</td>
                                      <td className='pt-4'>{item.products.name}</td>
                                      <td><Button variant="warning ps-4 pe-4 mt-2 me-2 w-40" onClick={() => { handleEdit(item.id); }}  className="button-table">Update</Button>
                                          <Button variant="outline-danger ps-4 pe-4 mt-2 w-40" onClick={() => { handleDelete(item.id); }} className="ms-2 button-table">Delete</Button></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                              </div>                         
                              </div>
                              <div className='mb-4 me-5 float-end'>
                              <Button variant="" onClick={() => { handleAddAccount(); }}><FontAwesomeIcon icon={faCirclePlus} style={{ color: '#EB786B', fontSize: '45px' }} /></Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                  <form className='wow fadeInUp border-0 bg-transparent pt-4' data-wow-delay='0.2s'>
                    <div className='card border-0 bg-transparent'>                  
                      <div className='card mb-5 border-0' style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                        <div className='row g-0'>
                          <div className='col pt-0'>
                            <div className='card-body'>
                            <h1 className='pb-3' style={{ color: '#000000', fontSize: '30px', borderBottom: 'solid' }}><b>Categories</b></h1>
                              <h1 className='mt-5' style={{ color: '#000000', fontSize: '30px' }}>Income Categories</h1>
                              <div className='col-md-12 d-flex'>
                              <div className='col-md-9'>
                              <Table style={{ border: 'solid' }}>
                                <thead className=''>
                                  <tr>
                                    <th>No&emsp;&emsp;&emsp;&emsp;</th>
                                    <th>Name</th>
                                    <th style={{ width: '30%' }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {transactions?.map((item, index) => (
                                    <tr key={index}>
                                      <td className='pt-4'>{index + 1}</td>
                                      <td className='pt-4'>{item.products.name}</td>
                                      <td><Button variant="warning ps-4 pe-4 mt-2 me-2 w-40" onClick={() => { handleEdit(item.id); }}  className="button-table">Update</Button>
                                          <Button variant="outline-danger ps-4 pe-4 mt-2 w-40" onClick={() => { handleDelete(item.id); }} className="ms-2 button-table">Delete</Button></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>

                              <h1 style={{ color: '#000000', fontSize: '30px' }}>Expenses Categories</h1>
                              <Table style={{ border: 'solid' }}>
                                <thead className=''>
                                  <tr>
                                    <th>No&emsp;&emsp;&emsp;&emsp;</th>
                                    <th>Name</th>
                                    <th style={{ width: '30%' }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {transactions?.map((item, index) => (
                                    <tr key={index}>
                                      <td className='pt-4'>{index + 1}</td>
                                      <td className='pt-4'>{item.products.name}</td>
                                      <td><Button variant="warning ps-4 pe-4 mt-2 me-2 w-40" onClick={() => { handleEdit(item.id); }}  className="button-table">Update</Button>
                                          <Button variant="outline-danger ps-4 pe-4 mt-2 w-40" onClick={() => { handleDelete(item.id); }} className="ms-2 button-table">Delete</Button></td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                              </div>
                              </div>
                              <div className='mb-4 me-5 float-end'>
                              <Button variant="" onClick={() => { handleAddCategory(); }}><FontAwesomeIcon icon={faCirclePlus} style={{ color: '#EB786B', fontSize: '45px' }} /></Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </body>
          <AddAccount
          setConfirmAddAccount={setConfirmAddAccount}
          show={show}
          handleClose={handleClose}
        />
        <AddCategory
          setConfirmAddCategory={setConfirmAddCategory}
          show={showi}
          handleClose={handleClosei}
        />
        </div>

        

    );
}

export default Profile;


