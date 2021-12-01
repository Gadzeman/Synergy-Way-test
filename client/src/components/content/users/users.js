import React, { useState, useEffect } from 'react';
import './users.scss';
import {GetUsers, PutUser} from '../../../requests';
import AddNewUser from './add.user.window'
import EditUserWindow from './edit.user';

const Users = () => {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [modalActiveNewUser, setModalActiveNewUser] = useState(false)
  const [modalActiveEdit, setModalActiveEdit] = useState(false)
  const editUserFunction = (user) => {
    setUser(user)
    setModalActiveEdit(true)
  }
  const changeRole = async (userId, role) => {
    const answer = window.confirm('Are you sure you want to change role for this user?')
    if (answer) {
      await PutUser(userId, {role})
    }
  }
  useEffect(async () => {
    setUsers( await GetUsers() )
  }, []);

  console.log(users);
  return (
    <div className={'users'}>
      <button className={'users__new'} onClick={() => setModalActiveNewUser(true)}>Add new user</button>
      <AddNewUser active={modalActiveNewUser} setActive={setModalActiveNewUser}/>
      <EditUserWindow active={modalActiveEdit} setActive={setModalActiveEdit} user={user}/>
      <table className="table table-dark table-striped users__table">
        <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Admin</th>
          <th scope="col">Group</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        {users.message === 'Users not exist' ? <h1>{users.message}</h1> :
          <tbody>
          { users.map(user =>
            <tr className={'users__item'} key={user._id}>
              <td>{ user.email }</td>
              <td><input
                type="checkbox"
                checked={ user.role === 'admin' && true }
                onClick={() => changeRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
                readOnly
              /></td>
              <td>{ user.groups.map( group => <div key={ group._id }>{ group.name }</div> )}</td>
              <td><button onClick={() => editUserFunction(user)}>Edit User</button></td>
            </tr>
          )}
          </tbody>
        }
      </table>
    </div>
  );
};

export default Users;
