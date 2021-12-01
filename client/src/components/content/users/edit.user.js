import React, {useState} from 'react';
import './users.scss'
import {DeleteUser, PutUser} from '../../../requests';

const EditUserWindow = ({active, setActive, user}) => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('user')
  const changeUser = async () => {
    const body = {
      email
    }
    await PutUser(`${user._id}`, body)
    setActive(false)
    setEmail('')
  }
  const deleteUser = async () => {
    const answer = window.confirm('Are you sure you want to delete this user?')
    if (answer) {
      await DeleteUser(`${user._id}`)
      setActive(false)
      setEmail('')
    }
  }
  return (
    <div className={active ? 'modalWindow modalWindow__active' : 'modalWindow'} onClick={() => setActive(false)}>
      <div className={active ? 'modalWindow__content modalWindow__content__active' : 'modalWindow__content'} onClick={e => e.stopPropagation()}>
        <h4>Edit user</h4>
        <input type="text" placeholder='Enter new email' value={email} onChange={({target: {value}}) => setEmail(value)}/>
        {/*<select name="" id="" onChange={({target: {value}}) => setRole(value)}>*/}
        {/*  <option value="user">user</option>*/}
        {/*  <option value="admin">admin</option>*/}
        {/*</select>*/}
        <button onClick={changeUser}>Enter changes</button>
        <button onClick={deleteUser}>Delete User</button>
      </div>
    </div>
  );
};

export default EditUserWindow;
