import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import randomstring from 'randomstring'
import saveAs from 'browser-saveas'
import slugify from 'slugify'
import Maido from './components/Maido'

export class Home extends Component {
  constructor (props) {
    super(props)
    this.props.params.name = this.props.params.name || 'Ray Moe'
    this._downloadFromCanvas = this._downloadFromCanvas.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  static get propTypes () {
    return {
      params: PropTypes.object.isRequired
    }
  }

  _getImageFromCanvas (fn) {
    let canvas = this.refs.maido.refs.canvas
    return canvas.toBlob(fn)
  }

  _downloadFromCanvas () {
    let filename = `${ slugify(this.props.params.name).toLowerCase() }-${ randomstring.generate({ length: 8 }) }.png`
    this._getImageFromCanvas(blob => {
      saveAs(blob, filename)
    })
  }

  _handleChange () {
    browserHistory.replace(`/${ this.refs.text.value }`)
  }

  render () {
    return (
      <div>
        <h1>Sertifikat Lomba Maido tingkat Nasional</h1>
        <Maido text={ this.props.params.name || '' }
          ref='maido'/>
        <input type='text'
          placeholder='Input text'
          onChange={ () => { this._handleChange() } }
          ref='text'
          value={ this.props.params.name } />
        <button
          ref='download'
          onClick={ () => { this._downloadFromCanvas() } }>Download</button>
      </div>
    )
  }
}
