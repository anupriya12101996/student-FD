import React, { useState, useEffect } from 'react';
import './EditStudent.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import env from '../../utils/AppDetails';

const EditStudent = (props) => {
    const [name, setName] = useState(props.currData.fullname);
    const [age, setAge] = useState(props.currData.dob);
    const [school, setSchool] = useState(props.currData.school);
    const [classValue, setClassValue] = useState(props.currData.class);
    const [division, setDivision] = useState(props.currData.division);
    const [status, setStatus] = useState(props.currData.status == "Active" ? true : false);

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
            id: props.currData._id,
            name: name,
            dob: age,
            school: school,
            class: classValue,
            division: division,
            status: status,
        };
        axios.post(`${env.apiurl}update-student`, submitObj).then(res => {
            if (res.data) {
                Swal.fire({
                    title: 'Success',
                    text: 'Student Updated Successfully',
                    icon: 'success',
                });
                setName("");
                setAge("");
                setSchool("");
                setClassValue("");
                setDivision("");
                setStatus("");
                props.getStudentData();
                props.handleShowEdit();
            }
        }, err => {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong..!!',
                icon: 'error',
            });
            props.handleShowEdit();
            console.log(err);
        });
    }
    return (
        <div className='edit-holder'>
            <div className='card add-card'>
                <i class="fas fa-times-circle" onClick={() => props.handleShowEdit()}></i>
                <h1>Edit Student</h1>
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
                        <input type="radio" name="status" value={true} defaultChecked={status == true} onChange={(e) => handleChange(e)} />
                        <label>Active</label>
                        <input type="radio" name="status" value={false} defaultChecked={status == false} onChange={(e) => handleChange(e)} />
                        <label>Inactive</label>
                    </div>
                </div>
                <button onClick={handleSubmit}>Update</button>
            </div>
        </div>
    )
}

export default EditStudent;