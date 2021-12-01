import React, {useEffect, useState} from 'react';
import './groups.scss';
import {useParams} from 'react-router';
import {
  GetGroup,
  PutGroup,
  AddUserToGroup,
  DeleteUserFromGroup,
  GetUsers, DeleteGroup
} from '../../../requests';

const EditGroup = () => {
  const params = useParams();
  const [user, setUser] = useState()
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const putGroup = async (value, toChange = 'name') => {
    await PutGroup(group._id, toChange === 'name' ? {name: value} : {description: value})
    setGroupName('')
    setGroupDescription('')
  }
  const putFullGroup = async () => {
    const body = {
      name: groupName,
      description: groupDescription
    }
    await PutGroup(group._id, body)
  }
  const addUser = async () => {
    const body = {
      email: user
    }
    const response = await AddUserToGroup(group._id, body)
    if (response.status !== 400) {
      window.alert('User added')
    }
  }
  const deleteUser = async () => {
    const body = {
      email: user
    }
    const response = await DeleteUserFromGroup(group._id, body)
    if (response.status !== 400) {
      window.alert('User deleted')
    }
  }
  const deleteGroup = async () => {
    const answer = window.confirm('You want to delete group?')
    if (answer) {
      await DeleteGroup(group._id)
    }
  }
  useEffect(async () => {
    setGroup(await GetGroup(params.id))
    setUsers(await GetUsers())
  }, [])
  console.log(group);
  return (
    <div className={'edit'}>
      <div className={'edit__group'}>
        <input
          type="text"
          placeholder='Enter group name'
          value={groupName}
          onChange={({target: {value}}) => setGroupName(value)}
        />
        <input
          type="text"
          placeholder='Enter group description'
          value={groupDescription}
          onChange={({target: {value}}) => setGroupDescription(value)}
        />
        <button className='edit__group__button' onClick={() => putGroup(groupName)}>Change name</button>
        <button className='edit__group__button' onClick={() => putGroup(groupDescription, 'description')}>Change description</button>
        <button className='edit__group__button' onClick={putFullGroup}>Change all fields</button>
      </div>
      <div className={'edit__users'}>
        <select name="" id="" onChange={({target: {value}}) => setUser(value)}>
          <option value="" disabled selected>Choose user</option>
          {users.map(user => <option key={user._id} value={user.email}>{user.email}</option>)}
        </select>
        <button onClick={addUser}>Add user to group</button>
        <br/>
        <select name="" id="" onChange={({target: {value}}) => setUser(value)}>
          <option value="" disabled selected>Choose user</option>
          {/*{users.map(user => <option key={user._id} value={user.email}>{user.groups.some(g => g._id === group._id) === true && user.email}</option>)}*/}
          {users.map(user => user.groups.some(g => g._id === group._id) === true && <option key={user._id} value={user.email}>{user.email}</option>)}
        </select>
        <button onClick={deleteUser}>Delete user from group</button>
      </div>
      <button onClick={deleteGroup}>Delete group</button>
    </div>
  );
};

export default EditGroup;
