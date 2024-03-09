import Coco from './Coco';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [cocoComponents, setCocoComponents] = useState([<Coco />]);

  const addCocoComponent = () => {
    setCocoComponents([...cocoComponents, <Coco key={cocoComponents.length} />]);
  };

  return (
    <div className="App">
      <div className="CocoList">
        {cocoComponents.map((coco, index) => (
          <div key={index}>{coco}</div>
        ))}
        <button class="add-coco-button" onClick={addCocoComponent}>+</button>
      </div>
    </div>
  );
}

export default App;
