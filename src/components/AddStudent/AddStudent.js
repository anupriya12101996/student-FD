import axios from 'axios';
import React, { useState } from 'react';
import Sidenav from '../SideNav/Sidenav';
import './AddStudent.css';
import Swal from 'sweetalert2';
import env from '../../../src/utils/AppDetails';

const AddStudent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [classValue, setClassValue] = useState('');
  const [division, setDivision] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'age') {
      setAge(value);
    } else if (name === 'school') {
      setSchool(value);
    } else if (name === 'class') {
      setClassValue(value);
    } else if (name === 'division') {
      setDivision(value);
    } else if (name === 'status') {
      setStatus(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitObj = {
      name: name,
      dob: age,
      school: school,
      class: classValue,
      division: division,
      status: status,
    };
    axios.post(`${env.apiurl}add-student`, submitObj).then(res => {
      if(res.data){
        Swal.fire({
          title: 'Success',
          text: 'Student Added Successfully',
          icon: 'success',
        });
        setName("");
        setAge("");
        setSchool("");
        setClassValue("");
        setDivision("");
        setStatus("");
      }
    }, err => {
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong..!!',
        icon: 'error',
      });
      console.log(err);
    });
  }

  return (
    <div className='add-holder'>
      <Sidenav />
      <div className='right-holder'>
        <div className='card add-card'>
          <h1>Add Student</h1>
          <input className='input-holder' type="text" name='name' value={name} onChange={(e) => handleChange(e)} placeholder="Full Name" />
          <input className='input-holder' type="number" name='age' value={age} onChange={(e) => handleChange(e)} placeholder="DD/MM/YYYY" />
          <select className='input-holder' name='school' value={school} onChange={(e) => handleChange(e)}>
            <option value="">Select School</option>
            <option value="DPS School">DPS School</option>
            <option value="DAV School">DAV School</option>
            <option value="Modal School">Modal School</option>
          </select>
          <select className='input-holder' name='class' value={classValue} onChange={(e) => handleChange(e)}>
            <option value="">Select Class</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select className='input-holder' name='division' value={division} onChange={(e) => handleChange(e)}>
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <div className='status-container'>
            <p>Status</p>
            <div className='radios-value'>
              <input type="radio" name="status" value={true} onChange={(e) => handleChange(e)} />
              <label>Active</label>
              <input type="radio" name="status" value={false} onChange={(e) => handleChange(e)} />
              <label>Inactive</label>
            </div>
          </div>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default AddStudent;