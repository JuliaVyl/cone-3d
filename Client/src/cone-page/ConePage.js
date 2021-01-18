import { useState } from 'react';
import ConeArea from '../cone-area/ConeArea';
import './input-form.css';

const ConePage = () => {
  const [height, setHeight] = useState(4);
  const [radius, setRadius] = useState(2);
  const [segments, setSegments] = useState(14);
  const [coordinates, setCoordinates] = useState(null);

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
    setCoordinates(null);
    const coordinates = await fetchApi();
    setCoordinates(coordinates);
  };

  return (
    <div className='input-group'>
      <form className='input-form' onSubmit={onSendData}>
        <label className='input-form__text'>Высота конуса:</label>
        <input
          className='input-form__height'
          type='range'
          min='0.001'
          max='7.000'
          name='height'
          value={height}
          onChange={handleChange(setHeight)}
          required
        ></input>

        <label className='input-form__text'>Радиус основания конуса:</label>
        <input
          className='input-form__radius'
          type='range'
          min='0.001'
          max='8.000'
          name='radius'
          value={radius}
          onChange={handleChange(setRadius)}
          required
        ></input>

        <label className='input-form__text'>Количество сегментов конуса:</label>
        <input
          className='input-form__segments'
          type='range'
          min='3'
          max='100'
          value={segments}
          name='segments'
          onChange={handleChange(setSegments)}
          required
        ></input>
        <button className='input-form__btn'>Построить</button>
      </form>

      {coordinates && (
        <ConeArea
          vertices={coordinates}
          parameters={{ height, radius, segments }}
        />
      )}
    </div>
  );
};
export default ConePage;
