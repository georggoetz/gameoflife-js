'use strict'

var LifeView = function (life, canvas) {
  this.life = life
  this.canvas = canvas
  this.life.changed.add(this.draw.bind(this))
}
LifeView.prototype = {
  draw: function (life) {
    var context = this.canvas.getContext('2d')
    context.clearRect(0, 0, 500, 500)
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

module.exports = LifeView
