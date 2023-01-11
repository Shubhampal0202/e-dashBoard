import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './signup.css'
import { useEffect } from 'react';
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    useEffect(() => {
        console.log("useEffect")
        if (auth) {
            navigate("/")
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetails = { name, email, password }
        setName("");
        setEmail("");
        setPassword("");
        const API_URL = 'http://localhost:7000'
        const res = await axios.post(`${API_URL}/signup`, userDetails)
        if (res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            navigate("/");
        }
    }
    return (
        <>
            {!auth &&
                <div className='signup-container'>
                    <h1 className='signup-heading'>Signup</h1>
                    <hr className='signup-hr' />
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <label htmlFor="name" className='block'>Name</label>
                        <input type="text" id="name" className='input block' value={name} onChange={(e) => { setName(e.target.value) }} />

                        <label htmlFor="email" className='block'>Email</label>
                        <input type="email" id="email" className='input block' value={email} onChange={(e) => { setEmail(e.target.value) }} />

                        <label htmlFor="password" className='block'>Password</label>
                        <input type="password" id="password" className='input block' value={password} onChange={(e) => { setPassword(e.target.value) }} />

                        <button type="submit" className='signup-btn  block' onClick={handleSubmit}>Signup</button>
                    </form>
                </div>
            }
        </>
    )
}
export default Signup