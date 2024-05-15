import React, { useEffect, useState } from 'react'
import { Button, Dropdown, FloatingLabel, Form, Modal, Table } from 'react-bootstrap'
import { editEmpAPI, getAllEmpAPI, removeEmpAPI } from '../../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function View(addEmpResponse) {
  const[allEmp,setAllEmp]=useState([])
  const [editEmp,setEditEmp]=useState({})
  const [removeEmp,setRemoveEmp]=useState("")
  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);


  console.log('--------------data inside allEmp to be viewed on loading--------------');
  console.log(allEmp);

  useEffect(()=>{
       getAllEmp()
  },[addEmpResponse,removeEmp,editEmp])

  const getAllEmp=async()=>{
      try{
          const result = await getAllEmpAPI()
          console.log(result);
          if(result.status>=200 && result.status<300){
            setAllEmp(result.data);
           
          }
      }catch(err){
          console.log(err);
      }
  }

  const handleRemoveEmp = async (userid) =>{
   alert( "Do you want to delete?")
    try{
      const result = await removeEmpAPI(userid)
      setRemoveEmp(result.data)
      toast.warning("Successfully deleted!!!")

    }catch(err){
      console.log(err);
    }
  }

  const handleEditEmp=async(editThisEmployee)=>{
    setEditEmp(editThisEmployee)
    setShow(true)
  }

  const handleUpdate = async (empid,empdetails)=>{
    const{userName,email,status}=empdetails
    if(userName && email && status){
      try{
        const result = await editEmpAPI(empid,empdetails)
        setEditEmp(result.data)
        toast.success('Updated successfully')
        handleClose()

      }catch(err){
       console.log(err);
      }

    }else{
      alert('Fill the form completely!!!')
    }
  }

  return (
   <div className='d-flex justify-content-center'>
    <Table striped bordered hover className='mt-4 w-75'>
      <thead>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>

      { 
          allEmp.length>0?
          allEmp?.map(emp => (
            <tr key={emp?.id}>
              <td>{emp?.id}</td>
              <td>{emp?.userName}</td>
              <td>{emp?.email}</td>
              <td>{emp?.status}</td>
              <td className='d-flex justify-content-evenly'>
                <button onClick={()=>handleEditEmp(emp)} className='btn text-warning' ><i class="fa-solid fa-pen"></i></button>
                <button onClick={()=>handleRemoveEmp(emp?.id)} className='btn text-danger'><i class="fa-solid fa-trash"></i></button>
            </td>
            </tr>
          ))
          :
          <div>No data</div>
        } 

      </tbody>
    </Table>
    <ToastContainer position='top-center' theme='colored' autoClose={1000}/>

    
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <FloatingLabel controlId="floatingInputUname" label="User Name"className="mb-3">
            <Form.Control value={editEmp.id} onChange={e=>setEditEmp({...editEmp,userName:e.target.value})} type="text" placeholder="User Name" disabled />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInputUname" label="User Name"className="mb-3">
            <Form.Control value={editEmp.userName} onChange={e=>setEditEmp({...editEmp,userName:e.target.value})} type="text" placeholder="User Name" />
          </FloatingLabel>
          
          <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
            <Form.Control value={editEmp.email} onChange={e=>setEditEmp({...editEmp,email:e.target.value})} type="email" placeholder="name@example.com" />
          </FloatingLabel>

          <Dropdown onSelect={(status) => setEmployeeDetails({ ...employeeDetails, status })}>
            <Dropdown.Toggle style={{backgroundColor:'white', height:'50px',color:'black', textAlign:'left'}} id="dropdown-basic" className="w-100 ">
              {editEmp.status || "Employee Status"}
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
          <Button onClick={()=>{handleUpdate(editEmp.id,editEmp)}} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

   </div>
  )
}

export default View