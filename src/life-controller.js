'use strict'

var SMA = require('./moving_average.js')

// Constants for decreasing logarithmic slider scale: 1000 ms down to 1 ms intervals
var LOG_MIN = 6.907755278982137 // ln(1000)
var LOG_SCALE = -0.06907755278982136 // ln(1) - ln(1000) / (100 - 0)
var SMA_SAMPLES = 100

var LifeController = function (life, lifeView) {
  this.life = life
  this.lifeView = lifeView
  this.initialState = life.cells
  this.playing = false

  this.init()
}

LifeController.prototype = {
  init: function () {
    console.log((Math.log(1) - Math.log(1000)) / 100)
    this.lifeView.playButtonClicked.subscribe(this.togglePlay.bind(this))
    this.lifeView.resetButtonClicked.subscribe(this.reset.bind(this))
    this.lifeView.throttleChanged.subscribe(this.throttle.bind(this))
    this.throttle(this.lifeView)
    this.animate()
  },
  togglePlay: function (lifeView) {
    if (this.playing) {
      this.playing = false
      lifeView.setPaused()
    } else {
      this.playing = true
      lifeView.setPlaying()
    }
  },
  reset: function (lifeView) {
    this.life.cells = this.initialState
    if (!this.playing) {
      lifeView.draw(this.life)
    }
  },
  animate: function () {
    var now = Date.now()

    if (!this.then) {
      this.then = now
    }

    // Number of callbacks is usually 60 times per second (16 ms).
    window.requestAnimationFrame(this.animate.bind(this))

    if (!this.playing) {
      return
    }

    var elapsed = now - this.then

    if (elapsed > this.interval) {
      // Next frame starts then:
      // Remove extra time that might be added by the 16 ms ticks.
      this.then = now - (elapsed % this.interval)
      this.life.next()

      this.frequency.push(1000.0 / elapsed)
    }
    this.lifeView.frequencyLabel.innerText = this.frequency.average().toFixed(2) + ' Hz'
  },
  throttle: function (lifeView) {
    // Apply a log scale because changes at high speed are barely noticable.
    this.interval = Math.exp(LOG_MIN + LOG_SCALE * lifeView.throttleSlider.value)
    // Smoothen frequency by applying a simple moving average.
    this.frequency = new SMA(SMA_SAMPLES)
  }
}

module.exports = LifeController
