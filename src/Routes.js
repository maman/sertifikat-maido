import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { Home } from './Home'

export class Routes extends Component {
  render () {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ Home } />
        <Route path='/:name' component={ Home } />
      </Router>
    )
  }
}
