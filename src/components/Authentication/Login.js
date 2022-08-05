import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmailValue } from '../../store/reducers/user-reducers';
import env from '../../utils/AppDetails';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    const navigate = useNavigate();
    const userDispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        else {
            setCheck(e.target.checked);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (check) {
            axios.post(`${env.apiurl}login`, {
                email: email,
                password: password
            }).then(res => {
                if (res.data.data) {
                    setEmail("");
                    setPassword("");
                    userDispatch(setEmailValue(res.data.data.email));
                    navigate('/view-student');
                }
                else {
                    Swal.fire({
                        title: 'Failed',
                        text: 'Login Failed',
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
                text: 'Please accept Terms and Conditions..!!',
                icon: 'info',
            });
        }
    }

    return (
        <div className='holder'>
            <div className='overlay'>
                <div className='card'>
                    <h1>SignIn Now</h1>
                    <input className='input-holder' type="email" name='email' value={email} onChange={(e) => handleChange(e)} placeholder="Email" />
                    <input className='input-holder' type="password" name='password' value={password} onChange={(e) => handleChange(e)} placeholder="Password" />
                    <div className='check-holder'>
                        <input type="checkbox" onChange={(e) => handleChange(e)} />
                        <p>I agree to the Term of Services</p>
                    </div>
                    <button onClick={handleSubmit}>Sign In</button>
                    <p className='already-user'>Don't have an account? <span><Link className='redirect' to="/">Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default Login;