import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
require("dotenv").config();

const API_BASE = process.env.REACT_APP_API_URL;

export default function Login() {
  const [credentials, setCredentials] = useState({email:"",password:""});
  const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE}/api/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        console.log("Response:", response);
        const json = await response.json();
        if(json.success){
          localStorage.setItem('userEmail', credentials.email);
          localStorage.setItem('authToken', json.authToken);
          navigate("/"); // Notify user of successful login
        }
        else{
            alert("Invalid credentials"); 
        }
        
    }

    const onchange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }
  return (
    <>
      <div className="container">
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange}/>
                </div>
                
                <button type="submit" className="m-3 mb-3 btn btn-primary">Submit</button>
                <Link  className="m-3 mb-3 btn btn-primary" to="/CreateUser">New User</Link>
            </form>
            </div>
    </>
  )
}
