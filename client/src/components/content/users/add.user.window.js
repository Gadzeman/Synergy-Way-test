import React, { useState } from 'react';
import './users.scss'
import { PostUser } from '../../../requests';

const AddUserWindow = ({ active, setActive }) => {
  const [email, setEmail] = useState('');
  const newUserBody = {
    email
  }
  const addNewUser = async (userBody) => {
    await PostUser(userBody)
    setActive(false)
    setEmail('')
  }
  return (
    <div className={active ? 'modalWindow modalWindow__active' : 'modalWindow'} onClick={() => setActive(false)}>
      <div className={active ? 'modalWindow__content modalWindow__content__active' : 'modalWindow__content'} onClick={e => e.stopPropagation()}>
        <h4>Add new user</h4>
        <input
          value={email}
          onChange={({ target: { value }}) => setEmail( value )}
          type='text'
          placeholder='Enter user email'/>
        <button onClick={() => addNewUser(newUserBody)}>Add</button>
      </div>
    </div>
  );
};

export default AddUserWindow;
