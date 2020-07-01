import React, { Component } from 'react'
import randomstring from 'randomstring'
import saveAs from 'browser-saveas'
import PropTypes from 'prop-types';
import slugify from 'slugify'
import Maido from './components/Maido'

export default class App extends Component {
  static propTypes = {
    history: PropTypes.any,
    location: PropTypes.any,
  }

  constructor (props) {
    super(props)
    this._downloadFromCanvas = this._downloadFromCanvas.bind(this)
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      name: '',
    }
  }

  componentDidMount() {
    const name = this.props.location.pathname.replace('/', '');
    this.setState({
      name,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        name: this.props.location.pathname.replace('/', '')
      })
    }
    if (prevState.name !== this.state.name) {
      this.setState({
        name: this.state.name,
      })
    }
  }

  handleInput(e) {
    this.setState({
      name: e.target.value,
    })
    if (!e.target.value.length) this.props.history.push('/');
    else this.props.history.push(e.target.value);
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
    let filename = `${ slugify(this.state.name).toLowerCase() }-${ randomstring.generate({ length: 8 }) }.png`
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
        <Maido text={ this.state.name || '' }
          ref='maido'/>
        <input type='text'
          placeholder='Input text'
          onChange={this.handleInput}
          value={ this.state.name } />
        <button
          ref='download'
          onClick={ () => { this._downloadFromCanvas() } }>Download</button>
      </div>
    )
  }
}
