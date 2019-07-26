'use strict'

var Timer = require('./timer.js')
var LifeViewStates = require('./life-view.js').LifeViewStates

var LifeController = function (life, lifeView) {
  this.life = life
  this.lifeView = lifeView
  this.initialState = life.cells

  this.init()
}

LifeController.prototype = {
  init: function () {
    Timer.schedule(function () { this.life.next() }.bind(this))

    this.lifeView.playButtonClicked.subscribe(this.play.bind(this))
    this.lifeView.resetButtonClicked.subscribe(this.reset.bind(this))
  },
  play: function () {
    if (Timer.isTicking()) {
      Timer.stop()
      this.lifeView.change(LifeViewStates.PAUSED)
    } else {
      Timer.start()
      this.lifeView.change(LifeViewStates.PLAYING)
    }
  },
  reset: function () {
    this.life.cells = this.initialState
    if (!Timer.isTicking()) {
      this.lifeView.draw(this.life)
    }
  }
}

module.exports = LifeController
