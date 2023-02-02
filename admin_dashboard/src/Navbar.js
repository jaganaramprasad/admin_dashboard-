import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Modal from 'react-modal';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[editTable, setEditTable] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const role = e.target.elements.role.value;
    const gender = e.target.elements.gender.value;
    if (editTable !== null) {
      setEmployeeData(
        employeeData.map((employee, index) => {
          if (index === editTable) {
            return { name, role, gender };
          }
          return employee;
        })
      );
    } else {
      setEmployeeData([...employeeData, { name, role, gender }]);
    }
    CloseModal();
  };

  const handleEdit = (index) => {
    setEditTable(index);
    setIsModalOpen(true);
  };

  function handleDelete(index){
    setEmployeeData(employeeData.filter((employee, i)=>i!== index))
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = employeeData.filter(
    employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

return (
  <>
  <nav className="navbar navbar-light bg-primary">
    <div className="container-fluid">
      <img src="https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg" alt="company logo" style={{width:"100px",height:"50px"}} />
      <form className="d-flex">
        <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> 
      <button className="btn btn-success" onClick={handleOpenModal}>Create</button>
    </div>
  </nav>
  <br/>
    
  <Modal isOpen={isModalOpen} onRequestClose={CloseModal}>
    <h2>Create Employee</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Name" name="name"/>
        <br/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Role" name="role"/>
        <br/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Gender" name="gender"/>
        <br/>
      </div>
      
      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="button " className="btn btn-secondary" onClick={CloseModal}>Close</button>
</form>
</Modal>

<div style={{ padding: "20px",margin: "20px"}}>
<table className="table table-striped">
  <thead>
    <tr>
      <th>Sno</th>
      <th>Name</th>
      <th>Role</th>
      <th>Gender</th>
      <th>ResponseEdit</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((employee, index) => (
      <tr key={index}>
        <td scope='row'>{index+1}</td>
        <td>{employee.name}</td>
        <td>{employee.role}</td>
        <td>{employee.gender}</td>
        <td><button className="btn btn-info" style={{margin:"10px"}} onClick={() => handleEdit(index)}>Edit</button>
        <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</>
);
};

export default NavBar;