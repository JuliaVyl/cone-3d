import { useState } from 'react';
import './input-form.css';

const InputForm = () => {
  const [height, setHeight] = useState('');
  const [radius, setRadius] = useState('');
  const [segments, setSegments] = useState('');

  let coordinates = [];

  const handleChange = (f) => (e) => {
    f(e.target.value);
  };

  const fetchApi = async () => {
    const response = await fetch('http://localhost:5000/cone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ radius, segments }),
    });
    const json = await response.json();

    return json;
  };

  const onSendData = async (e) => {
    e.preventDefault();
    const data = await fetchApi();
  };

  return (
    <div className='input-group'>
      <form className='input-form' onSubmit={onSendData}>
        <input
          className='input-form__height'
          type='number'
          min='1'
          max='100'
          name='height'
          value={height}
          placeholder='Введите высоту конуса'
          onChange={handleChange(setHeight)}
          required
        ></input>
        <input
          className='input-form__radius'
          type='number'
          min='1'
          max='100'
          name='radius'
          value={radius}
          placeholder='Введите радиус основания конуса'
          onChange={handleChange(setRadius)}
          required
        ></input>
        <input
          className='input-form__segments'
          type='number'
          min='3'
          max='150'
          value={segments}
          name='segments'
          placeholder='Введите количество сегментов конуса'
          onChange={handleChange(setSegments)}
          required
        ></input>
        <button className='input-form__btn'>Построить</button>
      </form>
    </div>
  );
};
export default InputForm;
