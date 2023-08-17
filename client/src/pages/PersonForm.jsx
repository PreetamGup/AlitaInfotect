import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';

const PersonForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    hobbies: '',
    education: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (formData.hobbies.length === 0) {
      newErrors.hobbies = 'At least one hobby must be selected';
    }

    if (!formData.education) {
      newErrors.education = 'Highest education is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const response = await axios.post('/api/addperson',formData,{
              headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
              window.alert("Person added")
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                gender: '',
                hobbies: '',
                education: '',
              })
            } 
          } catch (error) {
            console.log(error);
          }
    }
  };

  return (
    <>
      <Navbar></Navbar>
   
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
      </div>
      <div>
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleInputChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="error">{errors.gender}</div>}
      </div>
      <div>
        <label>Hobbies</label>
        <input
          type="text"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleInputChange}
        />
        {errors.hobbies && <div className="error">{errors.hobbies}</div>}
      </div>
      <div>
        <label>Highest Education</label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleInputChange}
        />
        {errors.education && <div className="error">{errors.education}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default PersonForm;
