import React from 'react'
import Header from './Header'
import Main from './Main'

const App = ({...props}) => {

  return (
    <div className="application">
      <Header/>
      <Main/>
    </div>
  )
};

export default App
