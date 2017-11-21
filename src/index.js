import React from 'react'
import ReactDOM from 'react-dom'
import App from 'Containers/App'
import registerServiceWorker from './registerServiceWorker'

import 'normalize.css'
import './App.styl'

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();