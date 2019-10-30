import React from 'react';
import { render } from 'react-dom';
import { Icon } from 'antd';
// import { connect } from 'react-redux';

// const mapStateToProps = state => ({ users: state.users });
// const mapDispatchToProps = dispatch

const Users = (props) => {
// const users = useSelector(state => state.users);
const { users } = props;
    return (
      <div>
          <span style={{fontWeight: 'bold'}}>{users.length ?
          <span> No of users in record : {users.length}</span> :
          <span><b>No users in record</b></span>}</span>
          <div className='user-table'>
                {true ?
                // {screen.width < 288 ?

            <div style={{fontWeight: 'bold'}}>
                <span>No</span>
                <span>Firstname</span>
                <span>Lastname</span>
                <span>Birthday</span>
                <span>Age</span>
                <span>Hobby</span>
                <span onClick={() => props.onClearTable()}>
                <Icon type="delete" style={{backgroundColor: 'red', borderRadius: '10px', padding: '3px'}} />
                </span>
            </div>  :
            <div style={{fontWeight: 'bold'}}>
                <span>No</span>
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