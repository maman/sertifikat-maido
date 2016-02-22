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

  componentDidMount () {
    this._renderToCanvas(this._getCanvas(), this.state.text)
  }

  componentWillUpdate (nextState) {
    this._renderToCanvas(this._getCanvas(), nextState.text)
  }

  _loadImage (src) {
    let image = new Image()
    image.src = src
    return image
  }

  _getCanvas () {
    return this.refs.canvas
  }

  _renderToCanvas (canvas, text) {
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = 'normal bold 40px serif'
    ctx.textAlign = 'center'
    ctx.drawImage(this.state.image, 0, 0)
    ctx.fillText(text, (canvas.width / 2), 200)
  }

  render () {
    return (
      <canvas ref='canvas'
        width={ 600 }
        height={ 428 } />
    )
  }
}
