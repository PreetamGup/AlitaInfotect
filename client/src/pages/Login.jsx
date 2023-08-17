import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate= useNavigate();

  const validateForm = () => {
    let errorMessage={}

    if (!username) {
      errorMessage.username = 'Username is required';
    }

    if (!password) {
      errorMessage.password = 'Password is required';
    }

    setErrors(errorMessage)

    return Object.keys(errorMessage).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {

        try {
            const response = await axios.post('/api/login',{username,password});

            if(response.data.success){
                localStorage.setItem('token',response.data.token);
                window.alert('Login Successfully');
                navigate('/')
              }else{
                console.error(response.data.message);
              }
        } catch (error) {
            console.log(error);
            window.alert('something went wrong');
        }
     
       
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h1 style={{textAlign:'center'}}>Login Form</h1>
      <div>
        <label>Username:- </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div>
        <label>Password:- </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
