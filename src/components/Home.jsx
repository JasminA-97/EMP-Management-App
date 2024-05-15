import React, { useState } from 'react'
import { Button, Dropdown, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { addEmployeeAPI } from '../../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home({setAddEmpResponse}) {
  const [employeeDetails,setEmployeeDetails]=useState({userName:"", email:"",status:""
  })
  console.log(employeeDetails);
  const handleAdd=async()=>{
    const {userName,email,status}=employeeDetails
    if(userName && email && status){
      try{
        const result=await addEmployeeAPI(employeeDetails)
        console.log('--------------data to be inserted--------------'+ result);
        if(result.status>=200 && result.status<300){
          console.log(result.data);
          setAddEmpResponse(result.data)
          toast.success(`${result.data.userName} Added Successfully`)
          setEmployeeDetails({userName:"",email:"",status:""})
          handleClose()
        }else{
          alert(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }else{
      toast.warning('Fill the form completely!!!')
    }
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <>
   <h1 className='text-center mt-3 text-info'>Employee Management App</h1>
  <div className="container w-100 h-sreen d-flex justify-content-center">
    <div className="mt-5 d-flex justify-content-around w-50">
      <h4>Add new Employee</h4>
      <button onClick={handleShow} className='btn rounded-circle bg-info text-light fs-5 fw-bolder'>+</button>
    </div>
  </div>

  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <FloatingLabel controlId="floatingInputUname" label="User Name"className="mb-3">
              <Form.Control onChange={e=>setEmployeeDetails({...employeeDetails,userName:e.target.value})} type="text" placeholder="User Name" />
            </FloatingLabel>
            
            <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
              <Form.Control onChange={e=>setEmployeeDetails({...employeeDetails,email:e.target.value})} type="email" placeholder="name@example.com" />
            </FloatingLabel>

            <Dropdown onSelect={(status) => setEmployeeDetails({ ...employeeDetails, status })}>
            <Dropdown.Toggle style={{backgroundColor:'white', height:'50px',color:'black', textAlign:'left'}} id="dropdown-basic" className="w-100 ">
              {employeeDetails.status || "Employee Status"}
            </Dropdown.Toggle>
            <Dropdown.Menu className='w-100'>
              <Dropdown.Item eventKey="Active">Active</Dropdown.Item>
              <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={1000}/>


   </>
  )
}

export default Home