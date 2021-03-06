import { call, put, take, fork, takeLatest } from 'redux-saga/effects';
import { eventChannel } from "redux-saga";
import { apiData, DBdata } from './api';
import firebase from "../firebase";


function* startListener() {
  // #1: Creates an eventChannel and starts the listener;
  const channel = eventChannel(emiter => {
    const listener = firebase.database().ref();
    // console.log(listener, listener.toString());

      listener.on("value", snapshot => {
        console.log(snapshot.val());
        emiter({ data: snapshot.val() || {} });
      });

    // #2: Return the shutdown method;
    return () => {
  console.log('we are switching off now');
      listener.off();
    };
  });

  // #3: Creates a loops to keep the execution in memory;
  while (true) {
    try {
      const { data } = yield take(channel);
    console.log('event channel is working')
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put({type: 'ADD_USER', data });
    } catch (e) {
      // console.log(e);
      yield put({type: 'DATA_FAILURE', e });
    }
  }
}


function* getAPIData({type = 'GET_DATA'}) {

   try {
      const data = yield call(apiData);
      // const data = yield apiData();

      yield put({type: 'DATA_SUCCESS', data });
   } catch (e) {
      console.log(e);
      yield put({type: 'DATA_FAILURE', error: e.message });
   }
}


function* loadData({type = 'LOAD_DATA', user}) {

   try {

       // const data = { newUser: user };
      // const data = yield call(DBdata, user);
      const data = yield call(DBdata, user);

      yield put({type: 'DATA_SUCCESS', data });
   } catch (e) {
      console.log(e);
      yield put({type: 'DATA_FAILURE', error: e.message });
   }
}


function* reduxSaga() {

  yield takeLatest("LOAD_DATA", loadData);

  yield takeLatest("GET_DATA", getAPIData);

  console.log('we are here');

  yield fork(startListener);
}

export default reduxSaga;