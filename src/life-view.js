'use strict'

var Event = require('./event.js')

var WIDTH = 500
var HEIGHT = 500
var TXT_PAUSE = 'Pause'
var TXT_PLAY = 'Play'
var TXT_RESET = 'Reset'

var LifeViewStates = Object.freeze({
  PLAYING: 'playing',
  PAUSED: 'paused'
})

var LifeView = function (life, lifeDiv) {
  this.life = life
  this.lifeDiv = lifeDiv
  this.playButtonClicked = new Event(this)
  this.resetButtonClicked = new Event(this)

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
    this.controlsDiv.appendChild(this.playButton)

    // Reset button
    this.resetButton = document.createElement('button')
    this.resetButton.innerText = TXT_RESET
    this.controlsDiv.appendChild(this.resetButton)

    // Subscribe to events
    this.life.changed.subscribe(this.draw.bind(this))

    // Publish events
    this.playButton.addEventListener('click', function () {
      this.playButtonClicked.fire()
    }.bind(this))
    this.resetButton.addEventListener('click', function () {
      this.resetButtonClicked.fire()
    }.bind(this))

    this.change(LifeViewStates.PAUSED)
  },
  change: function (viewState) {
    switch (viewState) {
      case LifeViewStates.PLAYING:
        this.playButton.innerText = TXT_PAUSE
        break
      case LifeViewStates.PAUSED:
        this.playButton.innerText = TXT_PLAY
        break
    }
  },
  draw: function (life) {
    var context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    context.fillStyle = 'black'
    for (var x = 0; x < life.cols(); x++) {
      for (var y = 0; y < life.rows(); y++) {
        var state = this.life.cell(x, y)
        if (state === 1) {
          var xpos = x * 5
          var ypos = y * 5
          context.fillRect(xpos, ypos, 5, 5)
        }
      }
    }
  }
}

module.exports = { LifeView, LifeViewStates }
