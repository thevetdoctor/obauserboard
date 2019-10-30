import React, { useReducer } from 'react';
import { DatePicker } from 'antd';
// import moment from 'moment';
import 'antd/dist/antd.css';
// import uuidv5 from 'uuid/v5';

// import { render } from 'react-dom';
// import { useSelector } from 'react-redux';
// import { Calendar, DatePicker } from 'antd';
// import Calendar from './Calendar';


const Form = ({ onClick }) => {
  
   const formState = {
    firstname: '',
    lastname: '',
    birthday: '', 
    age: '',
    hobby: '',
    // new: [],
  }

// const myId = 'abcgefgh-1234-1234-1234-123456789jkl';
// const myString = '1b671a64-40d5-491e-99b0-da01ff1f3341';

// const g = uuidv5('fanbase', myString);
// const h = uuidv5('fan', myString);
// console.log(g, h);

const reducer = (state, action) => {
  switch(action.type) {
    case 'INPUT':
      let inputKey = action.payload[0];
      let inputValue = action.payload[1];
      let newState = Object.assign({}, state, {
        ...state,
      });
      newState[inputKey] = inputValue;
      // newState.new.push(action.payload);
    return newState;

    case 'CLEAR_FORM':
     newState = {
          firstname: '',
          lastname: '',
          birthday: '', 
          age: '',
          hobby: '',
      };
    return newState;

    default:
    return state;
  }
}

const [state, dispatch] = useReducer(reducer, formState);

const handleSubmit = (e) => {
  e.preventDefault();
}

const handleChange = ({target}) => {
  let name = target.name;
  let val = target.value;
  let keyArray = ['firstname', 'lastname', 'birthday', 'age', 'hobby'];
  if (name === undefined) {
  dispatch({type: 'INPUT', payload: ['birthday', '']});
  }
  if (keyArray.indexOf(name) >= 0) {
  dispatch({type: 'INPUT', payload: [[name], '']});
  }
  console.log('name =>', name, ': value =>', val);

  if (name === 'undefined' || name === undefined) {
    console.log('name is undefined', 'target =>', target.parentNode, 'val =>', val);
    return;
  }
  if (val === '' || val.trim() === '') {
    target.classList.add('empty');
    console.log(`${name} is not supplied`);
    return;
  }
  if (name === 'age') {
    if (isNaN(val)) {
       target.classList.add('empty');
       console.log(`${name} should be a number!`);
    }
  }
  
if (name === '') {
  dispatch({type: 'INPUT', payload: ['birthday', val]});
  return;
}
  dispatch({type: 'INPUT', payload: [[name], val]});
}

    return (
      <div>
        <form className='form-selector' onSubmit={handleSubmit}>
        <div>
          <input type='text' name='firstname' placeholder='Firstname' onChange={handleChange}/><br />
          <input type='text' name='lastname' placeholder='Lastname'  onChange={handleChange} /><br />

          <div onFocus={handleChange}>
          <DatePicker className='date-picker' /><br />
          </div>
        
          <input type='text' name='age' placeholder='Age' onChange={handleChange} /><br />
          <input type='text' name='hobby' placeholder='Hobby' onChange={handleChange} /><br />
          <input type='submit' name='submit' value='Submit' onClick={() => onClick(state)} />
          </div>
        </form>
      </div>
    );
}

export default Form; 