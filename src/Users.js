import React from 'react';
import { Icon } from 'antd';
// import { connect } from 'react-redux';

// const mapStateToProps = state => ({ users: state.users });
// const mapDispatchToProps = dispatch

const Users = (props) => {
// const users = useSelector(state => state.users);
let { users } = props;
// let newUserList = [];
// const users = users.map(x => users.includes(x.firstname)
users = users.filter(x => x !== undefined);
users = users.filter(x => x !== null);
users = users.filter((thing, index, self) => self.findIndex(t => t.firstname === thing.firstname && t.lastname === thing.lastname) === index);

    return (
      <div>
          <span style={{fontWeight: 'bold'}}>{users.length ?
          <span> No of users in record : {users.length}</span> :
          <span><b>No users in record</b></span>}</span>
          <div className='user-table'>
                {window.screen.width < 288 ?

            <div>
                <span>UserID</span>
                <span>Firstname</span>
                <span>Lastname</span>
                <span>Birthday</span>
                <span>Age</span>
                <span>Hobby</span>
                <span onClick={() => props.onClearTable()}>
                <Icon type="delete" style={{backgroundColor: 'red', borderRadius: '10px', padding: '3px'}} />
                </span>
            </div>  :
            <div>
                <span>UserID</span>
                <span>Fname</span>
                <span>Lname</span>
                <span>Bday</span>
                <span>Age</span>
                <span>Hobby</span>
                <span onClick={() => props.onClearTable()}>
                <Icon type="delete" style={{backgroundColor: 'red', borderRadius: '10px', padding: '3px'}} />
                </span>
            </div> 
                } 
          {users.length ?
          users.map((item, index) => (
            <div key={index}>
                <span>{item.userId}</span>
                <span>{item.firstname}</span>
                <span>{item.lastname}</span>
                <span>{item.birthday}</span>
                <span>{item.age}</span>
                <span>{item.hobby}</span>
                <span onClick={() => props.onDelete(index)}>
                <Icon type="delete" />
                </span>
                </div>
          )).reverse()
          :
          <div className='no-users'>No users available</div>
          }
          </div>
      </div>
    );
}

// const Users = connect(mapStateToProps)(ConnectedUsers);
export default Users;