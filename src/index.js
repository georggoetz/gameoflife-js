var Life = require('./life.js')
var LifeView = require('./life-view.js')
var Timer = require('./timer.js');

(function () {
  'use strict'

  var canvas = document.getElementById('animCvs')
  canvas.width = 500
  canvas.height = 500

  var life = Life.from(100, 100, function () { return Math.random() > 0.5 ? 1 : 0 })
  var lifeView = new LifeView(life, canvas)

  Timer.schedule(function () {
    life.next()
  })
}())
