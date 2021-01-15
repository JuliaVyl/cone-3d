import './input-form.css';

const InputForm = () => {
  return (
    <div className='input-group'>
      <form className='input-form'>
        <input
          className='input-form__height'
          type='number'
          min='1'
          max='100'
          placeholder='Введите высоту конуса'
          required
        ></input>
        <input
          className='input-form__radius'
          type='number'
          min='1'
          max='100'
          placeholder='Введите радиус основания конуса'
          required
        ></input>
        <input
          className='input-form__segments'
          type='number'
          min='3'
          max='150'
          placeholder='Введите количество сегментов конуса'
          required
        ></input>
        <button className='input-form__btn'>Рассчитать</button>
      </form>
    </div>
  );
};
export default InputForm;
