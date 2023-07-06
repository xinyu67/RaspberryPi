import React from 'react';
import axios from 'axios';

function App(){
  axios.get('http://localhost:8000/realtimeData')
  .then(response=>console.log(response.data));
  return (
    <div className='app'></div>
  );
}

export default App;