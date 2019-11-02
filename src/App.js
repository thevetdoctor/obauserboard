import React from 'react';
import { useSelector } from 'react-redux';
import store from './redux/store';
import { Icon } from 'antd';
import Hello from './Hello';
import Users from './Users';
import Form from './Form2';
import './style.css';
 


const App = () => {

  // eslint-disable-next-line
const state = store.getState();
// store.subscribe((state) => console.log('calling subscribe!'));

const name = useSelector(state => state.name);
const errorMessage = useSelector(state => state.errorMessage);
const users = useSelector(state => state.users);
const formview = useSelector(state => state.formView);
const apiData = useSelector(state => state.apiData);
// const apiError = useSelector(state => state.error);
const loading = useSelector(state => state.loading);

const handleDelete = (id) => {

  store.dispatch({
  type: 'DELETE_USER',
  id,
});

}


const clearTable = () => {

  store.dispatch({
  type: 'DELETE_USERS',
});

}

const handleSaga = () => {

  store.dispatch({
  type: 'GET_DATA',
});
// handleLoading();
// setTimeout(() => handleLoading(), 2000);

}
 

const handleLoading = () => {

  store.dispatch({
  type: 'LOADING',
}); 
setTimeout(() => handleSaga(), 4000);
// handleSaga();
}


const viewForm = (formview) => {

  store.dispatch({
    type: 'FORM_VIEW',
  });
}

const handleClick = (formValues) => {
  // console.log('input =>', formValues);
  
const { firstname, lastname, birthday, age, hobby } = formValues;

let usersInState = [ ...users ];
let userExist = usersInState.filter(user => user['firstname'] === formValues['firstname'] && user.lastname === formValues.lastname);

if (userExist.length) {
   let error = 'User exists already';
  
      store.dispatch({
        type: 'LOG_ERROR',
        error,
      });
  return false;
}
// console.log('user exist', userExist, usersInState);
// console.log(Object.values(formValues));
let error = '';
for (let item in formValues) {
    if (formValues[item] === '') {
      console.log('item', item, formValues[item] ? formValues : 'not supplied');
      error = `${item} not supplied!`;

      store.dispatch({
        type: 'LOG_ERROR',
        error,
      });
    
      return false;
    }

  if (item === 'age') {
    if (isNaN(formValues[item])) {
       console.log('Age must be a number!');
        error = 'Age must be a number';

        store.dispatch({
        type: 'LOG_ERROR',
        error,
      });
    return; 
    }
  }
} 
  let  user = {firstname,
        lastname,
        birthday,
        age,
        hobby};
  // let newState = [...state.users, user];

  error = '';
  store.dispatch({
        type: 'LOG_ERROR',
        error,
      });

   store.dispatch({
      type: 'LOAD_DATA',
      user,
   });

  // console.log('submitted', 'newUser =>', user);
} 

const populate = () => {
  // console.log('populate is disabled for now');
// let newUser = JSON.parse(localStorage.getItem('usersDB'));
    // console.log(newUser.apiData.length);
    let count = Math.floor(Math.random() * 5);
    if (apiData) {
    // console.log(apiData[count], newUser);
    store.dispatch({
      type: 'LOAD_DATA',
      user: apiData[count] || {firstname: 'Oyetoke',
                                lastname: 'Oderanti',
                                birthday: '2019-09-16', 
                                age: 38, 
                                hobby: 'reading'}
    });
    }
  return;
}

    return (
      <div  className='text-underlined'>
        <Hello name={name} />
        <div className='links'>
          <div>
            <span><a href='https://www.facebook.com/huntiololo' target="_blank" rel="noopener noreferrer"><Icon className='fb logo' type="facebook" /></a></span>
            <span><a href='https://www.twitter.com/animalworldng' target='_blank' rel="noopener noreferrer"><Icon className='twitter logo' type="twitter" /></a></span>
            <span><a href='https://www.instagram.com/animalworldng' target='_blank' rel="noopener noreferrer"><Icon className='insta logo' type="instagram" /></a></span>
          </div>
        <div>
            {!formview ?
              <span className='btn show-form' onClick={viewForm}><Icon type="plus-circle" /><span>Show form</span></span>
              :
              <span className='btn' onClick={viewForm}><Icon type="close-circle" /></span>
            }
             {loading ?
                  <span className='btn'><Icon type="loading" /></span>
              :
                <span>{(apiData && apiData.length) ?
                <span className='btn populate-data' onClick={() => populate()}><Icon type="login"/></span>
                   :
                  <span className='btn random-data' onClick={() => handleLoading()}><Icon type="cloud-download"/></span>

                  
                }</span>
            }
        </div>
        </div>
        {formview ? 
        <span>
        {errorMessage ? <span className='error'>{errorMessage} </span> : <span></span>}
        <Form onClick={handleClick}/>
        </span>
        :
        <span></span>
        }
        <hr />
        <Users users={users} onClearTable={clearTable} onDelete={handleDelete}/>
        <p style={{color: '#333', marginTop: '2em'}}>
        NB: Click <span style={{color: '#fff'}}><Icon type='delete'/></span> to delete a user from the record!
        </p>
        <p>
          {/* .... Development in progress ...!!! */}
        </p>
        
      </div>
    );
  }

export default App;



// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//        ytytutiutuyt
//        ojojojoj
//       </header>
//     </div>
//   );
// }

// export default App;
