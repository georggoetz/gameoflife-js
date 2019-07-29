'use strict'

var LifeController = function (life, lifeView) {
  this.life = life
  this.lifeView = lifeView
  this.initialState = life.cells
  this.playing = false

  this.init()
}

LifeController.prototype = {
  init: function () {
    this.lifeView.playButtonClicked.subscribe(this.togglePlay.bind(this))
    this.lifeView.resetButtonClicked.subscribe(this.reset.bind(this))

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
    window.requestAnimationFrame(this.animate.bind(this))
    if (this.playing) {
      this.life.next()
    }
  }
}

module.exports = LifeController
