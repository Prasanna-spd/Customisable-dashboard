import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [themeColor, setThemeColor] = useState('blue');

  const handleThemeChange = (color) => {
    setThemeColor(color);
  };
  return (
    <div className="App" style={{ backgroundColor: themeColor }}>
    {console.log("The theme color is ",themeColor)}
      <h1 style={{textAlign:"center"}}>Customisable Dashboard App</h1>
      <Dashboard onnewThemeChange={handleThemeChange}/>
    </div>
  );
}

export default App;
