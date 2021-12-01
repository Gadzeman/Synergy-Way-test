import React, { useState, useEffect } from 'react';
import './groups.scss'
import {useHistory} from 'react-router-dom';
import {GetCategories, GetGroups, DeleteCategoryFromGroup, AddCategoryToGroup} from '../../../requests';

const Groups = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const addCategory = async (groupId, categoryName) => {
    const answer = window.confirm('Are you sure you want to change category?')
    if (answer) {
      await AddCategoryToGroup(groupId, {name: categoryName})
    }
  }
  const deleteCategory = async (groupId, categoryName) => {
    const answer = window.confirm('Are you sure you want to change category?')
    if (answer) {
      await DeleteCategoryFromGroup(groupId, {name: categoryName})
    }
  }

  useEffect(async () => {
    setGroups(await GetGroups())
    setCategories(await GetCategories())
  }, []);
  console.log(groups);
  return (
    <div className={'groups'}>
      <button className={'groups__new'} onClick={() => history.push('/groups/new')}>Add new group</button>
      <table className="table table-dark table-striped groups__table">
        <thead>
        <tr>
          <th scope="col">Name</th>
          {categories.map(category =>
            <th key={category._id}>{category.name}</th>
          )}
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        { groups.message === 'Groups not exist' ? <h1>{groups.message}</h1> :
          groups.map(group =>
          <tr className={'groups__item'} key={group._id}>
            <td title={group.description}>{group.name}</td>
            {categories.map(category =>
              <td key={category._id}>
                <input
                  type="checkbox"
                  checked={group.categories.some(c => c.name === category.name) && true}
                  onClick={() => group.categories.some(c => c.name === category.name) ?
                    deleteCategory(group._id, category.name) :
                    addCategory(group._id, category.name)}
                  readOnly={true}
                />
              </td>
            )}
            <td><button onClick={() => history.push(`/group/${group._id}`)}>Edit Group</button></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Groups;
