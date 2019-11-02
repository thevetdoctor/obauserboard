const userActions = {
    addUser: { type: 'ADD_USER'},
    deleteUser: { type: 'DELETE_USER'},
    deleteUsers: { type: 'DELETE_USERS'},
    logError: { type: 'LOG_ERROR'},
    formView: { type: 'FORM_VIEW'},
    loadData: { type: 'LOAD_DATA'},
    getData: { type: 'GET_DATA'},
    loading: { type: 'LOADING'},
    dataSuccess: { type: 'DATA_SUCCESS'},
    dataFailure: { type: 'DATA_FAILURE'}
  }
  
  export default userActions;
  
  
  // const userActions = {
  //   addUser: { type: 'ADD_USER', user},
  //   deleteUser: { type: 'DELETE_USER', id},
  //   logError: { type: 'LOG_ERROR', error}
  // }