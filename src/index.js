import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from 'Containers/App'
import registerServiceWorker from './registerServiceWorker'

import 'normalize.css'
import './App.styl'

let store = 0;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();
