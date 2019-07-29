'use strict'

var Event = require('./event.js')

var Life = function (cells) {
  this.cells = cells || []
  this.changed = new Event(this)
}

Life.prototype = {
  next: function () {
    this.cells = this.cells.map(function (col, x) {
      return col.map(function (state, y) {
        var neighbors = this.neighbors(x, y)
        switch (state) {
          case 0: if (neighbors === 3) state = 1; break
          case 1: if (neighbors < 2 || neighbors > 3) state = 0; break
        }
        return state
      }, this)
    }, this)
    this.changed.fire()
  },
  neighbors: function (x, y) {
    return [
      [x, y - 1],
      [x, y + 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1]
    ].map(function ([x, y]) {
      return this.cells[x] && this.cells[x][y] ? this.cells[x][y] : 0
    }, this).reduce(function (sum, val) { return sum + val })
  }
}

Life.from = function (rows, cols, callback) {
  return new Life(Array.from({ length: 100 }, function (x) {
    return Array.from({ length: 100 }, function (y) {
      return callback(x, y)
    })
  }))
}

module.exports = Life
