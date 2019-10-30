// import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
// import { call, put, takeLatest } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
// import apiData from './api';



function* getAPIData(type = 'GET_DATA', newUser) {

   try {
      // const data = yield call(apiData, newUser);
      // const data = yield apiData();

      const data = yield {};

      // console.log(data);

      yield put({type: 'DATA_SUCCESS', data });
   } catch (e) {
      console.log(e);
      yield put({type: 'DATA_FAILURE', error: e.message });
   }
}


function* reduxSaga() {

  yield takeLatest("GET_DATA", getAPIData);
}

export default reduxSaga;