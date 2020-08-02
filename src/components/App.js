import React from 'react';
import { Provider } from 'mobx-react';
import { Router } from 'react-router-dom';
// import DevTools from 'mobx-react-devtools';
import stores from '../stores';
import history from '../history';

import Wrapper from './Wrapper';
// import { SwiperPopup } from './SwiperPopup/SwiperPopup';

const App = ({ ...props }) => {
  return [
    <Provider {...stores} key="provider">
      <Router history={history}>
        <Wrapper />
        {/* <SwiperPopup /> */}
      </Router>
    </Provider>,
    // process.env.NODE_ENV !== 'production' && <DevTools key="mobx-devtools"/>
  ];
};

export default App;
