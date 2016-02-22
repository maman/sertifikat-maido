import React, { Component, PropTypes } from 'react'
import Sertifikat from '../assets/Sertifikat'

export default class Maido extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: this.props.text,
      image: this._loadImage(Sertifikat)
    }
  }

  static get propTypes () {
    return {
      text: PropTypes.string.isRequired
    }
  }

  /**
   * Run after component has mounted,
   * and DOM are ready
   */
  componentDidMount () {
    this._renderToCanvas(this.getCanvas(), this.state.text)
  }

  /**
   * Run before the render cycle
   * @param  {Object} nextState next state to render
   */
  componentWillUpdate (nextState) {
    this._renderToCanvas(this.getCanvas(), nextState.text)
  }

  /**
   * Load image from source
   * @param  {String} src image source, in base64
   * @return {DOMInstance}
   */
  _loadImage (src) {
    let image = new Image()
    image.src = src
    return image
  }

  /**
   * Get canvas DOM instance
   * @return {DOMInstance}
   */
  getCanvas () {
    return this.refs.canvas
  }

  /**
   * Render text and image to canvas
   * @param  {DomInstance} canvas Canvas DOM Instance
   * @param  {String}      text   Text to write on canvas
   */
  _renderToCanvas (canvas, text) {
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = 'normal bold 40px serif'
    ctx.textAlign = 'center'
    ctx.drawImage(this.state.image, 0, 0)
    ctx.fillText(text, (canvas.width / 2), 200)
  }

  /**
   * Render the component
   * @return {ReactInstance}
   */
  render () {
    return (
      <canvas ref='canvas'
        width={ this.state.image.width }
        height={ this.state.image.height } />
    )
  }
}
