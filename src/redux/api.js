export const apiData = async (user) => {
  
    let url = `https://us-central1-quickstart-1559031126554.cloudfunctions.net/createNewUser?firstname=${user.firstname}&lastname=${user.lastname}&birthday=${user.birthday}&age=${user.age}&hobby=${user.hobby}`;
  
    // let url = "https://jsonplaceholder.typicode.com/users";
  
    try {
      const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' }});
  
      const json = await res.json();
      console.log('json response', json);
      return json;
    } catch (e) {
      console.log("error response", e);
    }
  };
  