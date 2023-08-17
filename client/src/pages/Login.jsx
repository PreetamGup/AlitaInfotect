import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
     
      console.log('Submitting login request:', username, password);
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
