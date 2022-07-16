import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';
import Money from '../../assets/Money.png'
import '../../style/Daily.css';
import { faMarsAndVenus, faPhone, faCirclePlus, faEnvelope, faUser, faMessage, faRightFromBracket, faBasketShopp, faCirclePlusing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row, Col, Table } from 'react-bootstrap';


export default function Daily() {
  
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
          <body className='border-daily'>
            <div className='container h-100'>
              <div className='container h-100'>
                <div className='row alin-items-start h-100'>               
                  <form className='col-md-8 wow fadeInUp border-0 bg-transparent' data-wow-delay='0.2s'>
                    <div className='card border-0 bg-transparent'>                  
                      <div className='card mb-5 border-0' style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                        <div className='row g-0'>
                          <div className='col pt-0'>
                            <div className='card-body'>
                              <div className='pb-1 ps-3 d-flex' style={{ color: '#000000', fontSize: '20px', borderBottom: 'solid' }}>
                              <h3 className='pe-5'><b>18</b></h3>
                              <h5 className='ps-5  pe-5 mt-2'>07.2022</h5>
                              <h5 className='ps-5 pe-5 mt-2' style={{ color: '#0889FF' }}>Rp. 500,000</h5>
                              <h5 className='ps-5 pe-5 mt-2' style={{ color: '#F06161' }}>Rp. 30,000</h5>
                              </div>
                              <div className=''>
                              <div className=''>
                              <div className=''>
                              <div>
                                <div className='card-body border-0' style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                                  <div className='mb-1 mt-1 d-flex'>
                                    <div className='pe-5'>
                                      <h5 className='pb-3' style={{ color: '#050505', fontSize: '20px'}}>Food &emsp;</h5>   
                                      <h5 className='pb-3' style={{ color: '#050505', fontSize: '20px'}}>Bonus &emsp;</h5>
                                      <h5 style={{ color: '#050505', fontSize: '20px'}}>Food &emsp;</h5>
                                    </div>
                                    <div className='pe-5'>
                                    <h5 className='pb-3' style={{ color: '#050505', fontSize: '20px'}}>Cash &emsp;</h5>   
                                    <h5 className='pb-3' style={{ color: '#050505', fontSize: '20px'}}>Card &emsp;</h5>  
                                    <h5 style={{ color: '#050505', fontSize: '20px'}}>Accounts &emsp;</h5>
                                    </div>
                                    <div style={{ paddingLeft: '32%' }}>
                                    <h5 className='pb-3' style={{ color: '#F06161', fontSize: '20px'}}>Rp. 5,000 &emsp;</h5>   
                                    <h5 className='pb-3' style={{ color: '#0889FF', fontSize: '20px'}}>Rp. 500,000 &emsp;</h5>  
                                    <h5 style={{ color: '#F06161', fontSize: '20px'}}>Rp. 25,000 &emsp;</h5>
                                    </div>           
                                  </div>

                                  
                                </div>
                              </div> 
                            </div>
                              </div>                         
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>

                 
                  <form className='col-md-4 border-0' >
                  <div className=''>
                              <div>
                                <div className='card-body border-0' style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                                  <div className='mb-1 mt-1 d-flex'>
                                    <div className='pe-5'>
                                      <h5 className='pb-3' style={{ color: '#050505', fontSize: '20px'}}>Income &emsp;</h5>   
                                      <h5 className='pb-3' style={{ color: '#050505', fontSize: '20px'}}>Expenses &emsp;</h5>
                                      <h5 style={{ color: '#050505', fontSize: '20px'}}>Totaal &emsp;</h5>
                                    </div>
                                    <div>
                                    <h5 className='pb-3' style={{ color: '#0889FF', fontSize: '20px'}}>Rp. 1,000,000 &emsp;</h5>   
                                    <h5 className='pb-3' style={{ color: '#F06161', fontSize: '20px'}}>Rp. 85,000 &emsp;</h5>  
                                    <h5 style={{ color: '#050505', fontSize: '20px'}}>Rp. 915,000 &emsp;</h5>
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
          
        </div>

  );
}
