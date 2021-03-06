import { put, fork, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import firebase from "../firebase";


function* startListener() {
  // #1: Creates an eventChannel and starts the listener;
  const channel = new eventChannel(emiter => {
    const listener = firebase
      .database()
      .ref("users")
      .on("value", snapshot => {
        console.log(snapshot);
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
    // try {
      const { data } = yield take(channel);
    console.log('event channel is working')
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put({type: 'DATA_SUCCESS', data });
    // } catch (e) {
    //   console.log(e);
    //   yield put({type: 'DATA_FAILURE', error: e.message });
    // }
  }
}

function* reduxSaga() {

// export default function*() {
  console.log('we are here');

  yield fork(startListener);
}

export default reduxSaga;
