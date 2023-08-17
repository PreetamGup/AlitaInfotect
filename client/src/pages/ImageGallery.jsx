import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';

const ImageGallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageSelect = (e) => {
    setSelectedImages([...selectedImages, ...e.target.files]);
  };

  console.log(uploadedImages)

  

  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('/api/upload', formData);
      
    //   setUploadedImages([...uploadedImages, ...response.data]);
      setSelectedImages([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };


  useEffect(()=>{
    
    async function getallImages(){
        const res= await axios.get("/api/all")
        setUploadedImages(res.data)
    }

    getallImages();

    console.log("Image Gallery ")


    },[setUploadedImages])


  return (
    <div>
        <Navbar/>
      <h2>Image Gallery</h2>
      <input type="file" multiple onChange={handleImageSelect} />
      <button onClick={handleUpload}>Upload Images</button>
      <div className="gallery">
        {uploadedImages?.map((imageName, index) => (
          <img key={index} src={require(`./../UploadImages/${imageName}`)} alt={`${imageName}`} style={{width:"100px", height:"100px"}}/>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
