import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Authentication.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import env from '../../utils/AppDetails';

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [check, setCheck] = useState('');

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        else if (e.target.name == 'cpassword') {
            setConfirmpass(e.target.value);
        }
        else {
            setCheck(e.target.checked);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (check) {
            if(password == confirmpass){
                axios.post(`${env.apiurl}register`, {
                    email: email,
                    password: password,
                    confirmpassword: confirmpass
                }).then(res => {
                    if (res.data.data) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Registration Success',
                            icon: 'success',
                        });
                        setEmail("");
                        setPassword("");
                        setConfirmpass("");
                    }
                    else {
                        Swal.fire({
                            title: 'Failed',
                            text: res.data.message ? res.data.message : 'Registration Failed',
                            icon: 'info',
                        });
                    }
                }).catch(err => {
                    console.log(err);
                    Swal.fire({
                        title: 'Failed',
                        text: 'Something went wrong..!!',
                        icon: 'error',
                    });
                });
            }
            else {
                Swal.fire({
                    title: 'Info',
                    text: 'Passwords did not match..!!',
                    icon: 'info',
                });
            }
        }
        else {
            Swal.fire({
                title: 'Info',
                text: 'Please accept Terms and Conditions..!!',
                icon: 'info',
            });
        }
    }

    return (
        <div className='holder'>
            <div className='overlay'>
                <div className='card'>
                    <h1>SignUp Now</h1>
                    <input className='input-holder' type="email" name='email' value={email} onChange={(e) => handleChange(e)} placeholder="Email" />
                    <input className='input-holder' type="password" name='password' value={password} onChange={(e) => handleChange(e)} placeholder="Password" />
                    <input className='input-holder' type="password" name='cpassword' value={confirmpass} onChange={(e) => handleChange(e)} placeholder="Confirm Password" />
                    <div className='check-holder'>
                        <input type="checkbox" onChange={(e) => handleChange(e)} />
                        <p>I agree to the Term of Services</p>
                    </div>
                    <button onClick={handleSubmit}>Sign Up</button>
                    <p className='already-user'>Already have an account? <span><Link className='redirect' to="/login">Sign In</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default Authentication;