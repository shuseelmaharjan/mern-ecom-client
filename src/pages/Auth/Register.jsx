import React, { useState } from 'react';
import authService from '../../services/authService/authService';

const Register = () => {
  const [formData, setFormData] = useState({email:'', password:''});
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await authService.signup(formData);
      setMsg(response);
    }catch(error){
      setError('Error signing up.');
    }
  }



  return (
    <>
      <div>Register</div>
      <form onSubmit={handleSubmit}>

        <input type="email" name='email' value={FormData.email} onChange={handleChange} placeholder='Email' />
        <input type="password" name='password' value={FormData.password} onChange={handleChange} placeholder='Password' />

        {error && <p>{error}</p>}
        {msg && <p>{msg}</p>}
        <button type='submit'>Signup</button>
      </form>
    </>
  )
}

export default Register