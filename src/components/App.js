import React from 'react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
import stores from '../stores';
import history from '../history';

import Wrapper from './Wrapper';

const App = ({ ...props }) => {
  return [
    <Provider {...stores} key="provider">
      <Router history={history}>
        <Wrapper />
      </Router>
    </Provider>,
  ];
};

export default App;
