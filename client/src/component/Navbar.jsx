import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <a href="/">Home</a><span>{"  "}</span>
        <a href="/addperson">Add Person</a><span>{"  "}</span>
        <a href="/imageGallery">Image Gallery</a>
    </div>
  )
}

export default Navbar