import React from 'react'
import { render } from 'react-dom'
import {createBrowserHistory} from 'history'
import App from './App'

import toBlob from 'canvas-to-blob'

toBlob.init();

const history = createBrowserHistory();

history.listen((state) => {
  render(<App history={history} location={state.location} />, document.getElementById('root'))
});

render(<App history={history} location={window.location} />, document.getElementById('root'))