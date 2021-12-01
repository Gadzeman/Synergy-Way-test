import React from 'react';
import {Switch, Route} from 'react-router';
import Users from './users/users'
import Groups from './groups/groups'
import EditGroup from './groups/edit.group';
import AddGroup from './groups/add.group'

const Content = () => {
  return (
    <>
      <Switch>
        <Route path={'/'} exact>
          <Users />
        </Route>
        <Route path={'/groups'} exact>
          <Groups />
        </Route>
        <Route path={'/group/:id'} exact>
          <EditGroup />
        </Route>
        <Route path={'/groups/new'}>
          <AddGroup />
        </Route>
      </Switch>
    </>
  );
};

export default Content;
