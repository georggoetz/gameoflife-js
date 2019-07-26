var Life = require('./life.js')
var LifeController = require('./life-controller.js')
var LifeView = require('./life-view.js').LifeView

var ROWS = 100
var COLS = 100;

(function () {
  'use strict'

  var lifeDiv = document.getElementById('life')
  var life = Life.from(ROWS, COLS, function () { return Math.random() > 0.5 ? 1 : 0 })
  var lifeView = new LifeView(life, lifeDiv)
  var lifeController = new LifeController(life, lifeView)
  lifeController.play()
}())
