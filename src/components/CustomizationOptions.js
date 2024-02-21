import React from 'react';

const CustomizationOptions = ({ themeColor, onThemeChange }) => {
  const handleThemeChange = (e) => {
    
    onThemeChange(e.target.value);
    console.log("the new theme is ",themeColor)
  };

  return (
    <div>
      <label htmlFor="themeColor">Theme Color:</label>
      <select id="themeColor" value={themeColor} onChange={handleThemeChange}>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>
    </div>
  );
};

export default CustomizationOptions;
