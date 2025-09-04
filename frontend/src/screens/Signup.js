import React,{useState} from 'react'
import { Link } from 'react-router-dom';
require("dotenv").config();

const API_BASE = process.env.REACT_APP_API_URL;

export default function Signup() {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",Geolocation:""});

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE}/api/CreateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,location:credentials.Geolocation, email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            alert("Account created successfully");
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name='Geolocation' value={credentials.Geolocation} onChange={onchange}/>
                </div>
                <button type="submit" className="m-3 mb-3 btn btn-primary">Submit</button>
                <Link className="m-3 mb-3 btn btn-primary" to="/Login">Already User</Link>
            </form>
            </div>
        </>
    )
};


