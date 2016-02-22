import React from 'react'
import { render } from 'react-dom'
import { Routes } from './Routes'

import toBlob from 'canvas-to-blob'

toBlob.init()

render(<Routes />, document.getElementById('root'))
