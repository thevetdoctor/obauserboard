import userActions from './actions';
import { apiData } from './api';

const initialState = JSON.parse(localStorage.getItem('usersDB')) || {
    name: 'React Challenge by Enye!',
    errorMessage: '', 
    formView: true, 
    loading: false,  
    users: [
        {firstname: 'Oba',  
        lastname: 'Ode',
        birthday: '2019-09-16',  
        age: 34, 
        hobby: 'swimming'},
           
        {firstname: 'Dami', 
        lastname: 'Ode', 
        birthday: '2019-09-16', 
        age: 4, 
        hobby: 'reading'}, 
        
        {firstname: 'Demi', 
        lastname: 'Ode', 
        birthday: '2019-09-16',
        age: 4, 
        hobby: 'reading'},

        {firstname: 'Toke',
        lastname: 'Ode',
        birthday: '2019-09-16', 
        age: 4, 
        hobby: 'reading'},
      ]
}; 


const updateUserReducer = (state = initialState, actions) => {

  switch(actions.type) {
  case userActions.addUser.type:


  const { newUser } = actions;

  let url = `https://us-central1-quickstart-1559031126554.cloudfunctions.net/createNewUser?firstname=${newUser.firstname}&lastname=${newUser.lastname}&birthday=${newUser.birthday}&age=${newUser.age}&hobby=${newUser.hobby}`;

    apiData(url, newUser)
    .then(data => console.log('Data sent to DB =>', data));

    // console.log('data', data);

    // let newUserList = [ ...state.users ];
    // // newUserList.push(DBUser);
    // newUserList.push(newUser);

    // let newState = Object.assign({}, state, {
    //   ...state, users: newUserList,
    //   });
    // console.log('new user added', newUser);
    // localStorage.setItem('usersDB', JSON.stringify(newState));

  return state; 

  case userActions.deleteUser.type:
    const { id }= actions;
    console.log('Deleting user', id + 1);
    let newUserList = [ ...state.users ];
    newUserList.splice(id, 1);
    let newState = Object.assign({}, state, {
      ...state, users: newUserList,
      });
    console.log('newState: ', newState);
    localStorage.setItem('usersDB', JSON.stringify(newState));

  return newState;


 case userActions.deleteUsers.type:
    let newState2;
    if (state.users.length) {
    console.log('Deleting all users', state.users);
    let newUserList = [ ...state.users ];
    newUserList.splice(0, state.users.length);
    newState2 = Object.assign({}, state, {
      ...state, users: newUserList,
      });
    } else {
      console.log('Deleting all users from API');
    newState2 = Object.assign({}, state, {
      ...state, apiData: [],
      });
    }
    console.log('newState: ', newState2);
    localStorage.setItem('usersDB', JSON.stringify(newState2));

  return newState2;


  case userActions.logError.type:
    const { error } = actions; 
    console.log('error-message: ', error);
    let newState3 = Object.assign({}, state, {
      ...state, errorMessage: error,
    });
    localStorage.setItem('usersDB', JSON.stringify(newState3));
  
  return newState3;
  

  case userActions.formView.type:
    console.log(`switching ${!state.formView ? 'ON' : 'OFF'} the form`);
    let newState4 = Object.assign({}, state, {
      ...state, formView: !state.formView, errorMessage: ''
    });
    localStorage.setItem('usersDB', JSON.stringify(newState4));
  return newState4;


  case userActions.loading.type:
    console.log(`${!state.loading ? '' : 'NOT'} loading`);
    let newState5 = Object.assign({}, state, {
      ...state, loading: !state.loading
    });
    localStorage.setItem('usersDB', JSON.stringify(newState5));
  return newState5;
  

  case userActions.dataSuccess.type:
    console.log('Getting DATA from API');
    let { data } = actions;

    console.log(data);
    if (Object.keys(data[0]).indexOf('username') >= 0) {
      data = data.map(x => ({
        firstname: x.name,
        lastname: x.username,
        birthday: '1980-01-01',
        age: 25,
        hobby: 'travelling'
      }));
    } 
    console.log(data);

    let newState6 = Object.assign({}, state, {
      ...state, apiData: [...data], loading: false
    });
    localStorage.setItem('usersDB', JSON.stringify(newState6));
    console.log('API response', JSON.parse(localStorage.getItem('usersDB')).apiData);
  return newState6; 


  case userActions.dataFailure.type:
    // const { error } = actions;
    console.log('Error response from API', actions.error);
    let newState7 = Object.assign({}, state, {
      ...state, loading: false, apiData: [{
        firstname: 'Demi', 
        lastname: 'Ode', 
        birthday: '2019-09-16',
        age: 4, 
        hobby: 'reading'}]
    });
    localStorage.setItem('usersDB', JSON.stringify(newState7));
  return newState7;


  default:
    localStorage.setItem('usersDB', JSON.stringify(state));
 
  return state;
  }
};

export default updateUserReducer;