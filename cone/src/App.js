import { useState } from 'react';
import './App.css';
import ConeArea from './cone-area/ConeArea';
import InputForm from './input-form/InputForm';

function App() {
  return (
    <div>
      <InputForm />
      <ConeArea />
    </div>
  );
}

export default App;
