'use strict'

var Event = require('./event.js')

var WIDTH = 500
var HEIGHT = 500
var TXT_PAUSE = 'Pause'
var TXT_PLAY = 'Play'
var TXT_RESET = 'Reset'

var LifeView = function (life, lifeDiv) {
  this.life = life
  this.lifeDiv = lifeDiv
  this.playButtonClicked = new Event(this)
  this.resetButtonClicked = new Event(this)
  this.throttleChanged = new Event(this)

  this.init()
}

LifeView.prototype = {
  init: function () {
    // Canvas
    this.canvas = document.createElement('canvas')
    this.canvas.width = WIDTH
    this.canvas.height = HEIGHT
    this.lifeDiv.appendChild(this.canvas)

    // Controls container
    this.controlsDiv = document.createElement('div')
    this.lifeDiv.appendChild(this.controlsDiv)

    // Play/Pause button
    this.playButton = document.createElement('button')
    this.playButton.addEventListener('click', function () {
      this.playButtonClicked.fire()
    }.bind(this))
    this.controlsDiv.appendChild(this.playButton)

    // Reset button
    this.resetButton = document.createElement('button')
    this.resetButton.innerText = TXT_RESET
    this.resetButton.addEventListener('click', function () {
      this.resetButtonClicked.fire()
    }.bind(this))
    this.controlsDiv.appendChild(this.resetButton)

    // Speed SLider
    this.throttleSlider = document.createElement('input')
    this.throttleSlider.setAttribute('type', 'range')
    this.throttleSlider.addEventListener('change', function () {
      this.throttleChanged.fire()
    }.bind(this))
    this.controlsDiv.appendChild(this.throttleSlider)

    // Frequency label
    this.frequencyLabel = document.createElement('label')
    this.controlsDiv.appendChild(this.frequencyLabel)

    // Subscribe to events
    this.life.changed.subscribe(this.draw.bind(this))

    this.setPaused()
  },
  setPaused: function () { this.playButton.innerText = TXT_PLAY },
  setPlaying: function () { this.playButton.innerText = TXT_PAUSE },
  draw: function (life) {
    var context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    context.fillStyle = 'black'
    this.life.cells.forEach(function (col, x) {
      return col.forEach(function (state, y) {
        if (state === 1) {
          context.fillRect(x * 5, y * 5, 5, 5)
        }
      })
    })
  }
}

module.exports = LifeView
