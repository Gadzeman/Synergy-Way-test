import React, {useState} from 'react';
import {PostGroup} from '../../../requests';

const AddGroup = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const addNewGroup = async (body) => {
    await PostGroup(body);
  }
  return (
    <div>
      <input type="text" placeholder={'Enter name'} onChange={({target: {value}}) => setName(value)}/>
      <input type="text" placeholder={'Enter description'} onChange={({target: {value}}) => setDescription(value)}/>
      <button onClick={() => addNewGroup({name, description})}>Add Group</button>
    </div>
  );
};

export default AddGroup;
