import React from 'react';
import MainNav from './components/MainNav';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      {/*<MainNav />*/}
      {/*<HomePage />*/}

      <Route exact path="/signin" component={SignInPage} />

      {/*<SignUpPage />*/}
    </>
  );
};

export default App;
