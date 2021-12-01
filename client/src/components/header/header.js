import React from 'react';
import './header.scss'
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  return (
    <div className={'header'}>
      <div className={'header__wrap'}>
        <ul>
          <li onClick={() => history.push('/')}>Users</li>
          <li onClick={() => history.push('/groups')}>Groups</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
