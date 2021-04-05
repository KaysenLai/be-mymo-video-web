import React from 'react';
import './MainNav.scss';
import { AppBar } from '@material-ui/core';

const MainNav: React.FC = () => {
  return (
    <AppBar position="static" className="main-nav">
      <div>nav</div>
    </AppBar>
  );
};

export default MainNav;
