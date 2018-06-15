import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Header from 'components/header'
import Workspace from 'containers/workspace'
import './styles.scss'

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <Header /> */}
        <Switch>
          <Route exact path='/' component={Workspace} />
          <Redirect from='/*' to='/' />
        </Switch>
      </div>
    )
  }
}

export default App