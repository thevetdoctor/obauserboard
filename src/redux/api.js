const apiData = async (url) => {
  
  
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

  export default apiData;
  