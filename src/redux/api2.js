// export const apiData = async () => {
//   try {
//     const res =
//       JSON.parse(localStorage.getItem("usersDB")).apiError !== undefined
//         ? await fetch(
//             "https://my.api.mockaroo.com/enye_users.json?key=1f7ca420",
//             { headers: { "Content-Type": "application/json" } }
//           )
//         : await fetch("https://jsonplaceholder.typicode.com/users", {
//             headers: { "Content-Type": "application/json" }
//           });

//     const json = await res.json();
//     // console.log('json response', json);
//     return json;
//   } catch (e) {
//     console.log("error response", e);
//   }
// };
