const uuidv5 = require('uuid/v5');

const getID = user => {
    const uuidString = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  const userTag = user.firstname.concat('-', user.lastname);
  const id = uuidv5(userTag, uuidString);

  user.userId = id;
  // console.log(user);
  return user;
};

export default getID;