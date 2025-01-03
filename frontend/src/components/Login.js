import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "", showPassword: false });
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }

    const handleViewPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword,
        });
    }

    const handleClick = async () => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        if (json.success) {
            // const {  success,authtoken,userId } = response.data;

      // Save user_id and token in localStorage
           localStorage.setItem('user_id', json.userId);
            localStorage.setItem('token', json.authtoken)
            navigate("/")
            props.showAlert("Logged in successfully", "success")
        } else {
            if (json.validationErrors) {
                json.validationErrors.map((err) => {
                    if (err.param === 'password') {
                        setErrors((prev) => ({ ...prev, password: err.msg }))
                    } else {
                        setErrors((prev) => ({ ...prev, email: err.msg }))
                    }
                })
            }
            if (json.error) {
                props.showAlert("Invalid Details! " + json.error, "danger")
            }
        }

    }

    return (
        <div>
            <div className='text-center mt-5 mb-4'>
                <h1>HabiTrack</h1>
                <p><b>Your habits on cloud ☁️</b></p>
            </div>

            <div className="container form">
                <p className="text-center"><i>Login to continue using HabiTrack 😊 </i></p>
                <div className="mb-4 input-container">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" />
                    {errors.email && <span className='error'><i className="fa fa-info-circle"></i> {errors.email}</span>}
                </div>

                <div className="mb-4 input-container">
                    <label htmlFor="password" className="form-label">Password</label>
                    <i className={`fa fa-eye${credentials.showPassword ? "-slash" : ""} view-password`} onClick={handleViewPassword}></i>
                    <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onchange} id="password" name="password" />
                    {errors.password && <span className='error'><i className="fa fa-info-circle"></i> {errors.password}</span>}
                </div>
            </div>
            <div className='text-center'>
                <button className='btn btn-dark' onClick={handleClick}>Login</button>
            </div>
            <br />
            <p className='text-center last-para'>Don't have an account? <a href="/signup">SignUp-&gt;</a> </p>
        </div>
    )
}

export default Login;