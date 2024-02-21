import React, { useState, useEffect } from 'react';
import Image from './Image';
import CustomizationOptions from './CustomizationOptions';

const Dashboard = ({onnewThemeChange}) => {
  const [images, setImages] = useState([]);
  const [themeColor, setThemeColor] = useState('blue');

  useEffect(() => {
    const savedImages = localStorage.getItem('images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
    
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedThemeColor) {
      setThemeColor(savedThemeColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  const addImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setImages([...images, { id: images.length, url: imageUrl, name: file.name }]);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const rearrangeImages = (startIndex, endIndex) => {
    const newImages = Array.from(images);
    const [removed] = newImages.splice(startIndex, 1);
    newImages.splice(endIndex, 0, removed);
    setImages(newImages);
  };

  const handleThemeChange = (color) => {
    console.log("the new theme is ",themeColor)
    setThemeColor(color);
    onnewThemeChange(color)
  };

  return (
    <div className='dashboard-container'>
    <div className='controllers'>
    <CustomizationOptions themeColor={themeColor} onThemeChange={handleThemeChange} />
      <input type="file" onChange={addImage} />
    </div>
      
      <div className='imageHolder'>
      {images.map((image, index) => (
        <Image key={image.id} index={index} id={image.id} url={image.url} name={image.name} onRemove={removeImage} onDragEnd={rearrangeImages} />
      ))}
      </div>
      
    </div>
  );
};

export default Dashboard;
