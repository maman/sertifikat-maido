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
  }

  static get propTypes () {
    return {
      params: PropTypes.object.isRequired
    }
  }

  /**
   * Get image from canvas
   * ---------------------------------------------------
   * this function requires the parent to call a method
   * inside the client. not the ideal solution.
   * ---------------------------------------------------
   * @param  {Function} fn callback function
   * @return {Function}
   */
  _getImageFromCanvas (fn) {
    /** TODO: cari cara yang lebi baik */
    let canvas = this.refs.maido.getCanvas()
    return canvas.toBlob(fn)
  }

  /**
   * Download image from canvas
   */
  _downloadFromCanvas () {
    let filename = `${ slugify(this.props.params.name).toLowerCase() }-${ randomstring.generate({ length: 8 }) }.png`
    this._getImageFromCanvas(blob => {
      saveAs(blob, filename)
    })
  }

  /**
   * Render the component
   * @return {ReactInstance}
   */
  render () {
    return (
      <div>
        <h1>Sertifikat Lomba Maido tingkat Nasional</h1>
        <Maido text={ this.props.params.name || '' }
          ref='maido'/>
        <input type='text'
          placeholder='Input text'
          onChange={ () => { browserHistory.replace(`/${ this.refs.text.value }`) } }
          ref='text'
          value={ this.props.params.name } />
        <button
          ref='download'
          onClick={ () => { this._downloadFromCanvas() } }>Download</button>
      </div>
    )
  }
}
