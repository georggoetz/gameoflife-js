'use strict'

var Event = require('./event.js')

var Life = function (cells) {
  this.cells = cells || []
  this.changed = new Event(this)
}

Life.prototype = {
  cols: function () {
    return this.cells.length
  },
  rows: function () {
    return this.cols() > 0 ? this.cells[0].length : 0
  },
  cell: function (x, y) {
    var top = y >= 0
    var left = x >= 0
    var right = x < this.cols()
    var bottom = y < this.rows()
    return left && right && top && bottom ? this.cells[x][y] : 0
  },
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
    return this.cell(x, y - 1) +
           this.cell(x, y + 1) +
           this.cell(x - 1, y - 1) +
           this.cell(x - 1, y) +
           this.cell(x - 1, y + 1) +
           this.cell(x + 1, y - 1) +
           this.cell(x + 1, y) +
           this.cell(x + 1, y + 1)
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
