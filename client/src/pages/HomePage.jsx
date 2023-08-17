import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Navbar from '../component/Navbar';

const HomePage = () => {
  const [allPerson, setallPerson]= useState([]);



 async function handleDelete(id){
  
  const res= await axios.delete(`/api/person/${id}`,{ 
    headers:{
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }})

  if(res.data.success){
    getallData()
    window.alert("Deleted")
  }
  else{
    console.error(res.data.message)
  }



  } 


  async function getallData(){
    const res= await axios.get("/api/alldata",{ 
      headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }})

    if(res.data.success){
      setallPerson(res.data.allPerson)
      console.log(res.data.allPerson)
    }


  }

  useEffect(()=>{
    getallData();
  },[setallPerson])

  return (
    <div>
      <Navbar/>
      {allPerson?.map(person=>{
        return (
          <div className='personCard' key={person._id} >
            <span>FirstName:- {person.firstName}</span><br />
            <span>LastName:- {person.lastName}</span><br />
            <span>Email:- {person.email}</span><br />
            <span>Gender:- {person.gender}</span><br />
            <span>Education:- {person.education}</span><br />
            <span>Phone Number:- {person.phoneNumber}</span><br />
            <span>Hobbies:- {person.hobbies}</span><br />

            <button onClick={()=> handleDelete(person._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default HomePage