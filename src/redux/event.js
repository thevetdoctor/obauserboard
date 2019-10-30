function* startListener() {
    // #1
    const channel = new eventChannel(emiter => {
      const listener = database.ref("todos").on("value", snapshot => {
        emiter({ data: snapshot.val() || {} });
      });
  
          // #2
      return () => {
        listener.off();
      };
    });
  
      // #3
    while (true) {
      const { data } = yield take(channel);
          // #4
      yield put(actionsCreators.updateList(data));
    }
  }
  
  export default function*() {
    yield fork(startListener);
  }