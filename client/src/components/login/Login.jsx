import React from 'react'
import { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    const handleLogin = async (e) => {
        e.preventDefault()
        const API_URL = 'http://localhost:7000'
        const res = await axios.post(`${API_URL}/login`, { email, password })
        console.log("res ", res.data)
        if (res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem("token", JSON.stringify(res.data.token))
            navigate("/");
        } else {
            alert("Please enter correct email and password");
        }

    }
    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [])
    return (
        <>
            {!auth &&
                <div className='login-container'>

                    <h1>Login</h1>
                    <hr className='login-hr'/>
                    <form className='login-form'>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="login-block" placeholder='Enter Your Email' />

                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="login-block" placeholder='Enter Your Password ' />

                        <button type="submit" onClick={handleLogin} className="login-block login-btn" >Login</button>
                    </form>

                </div>
            }
        </>
    )
}

export default Login