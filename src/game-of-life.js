(function () {
  'use strict'

  var canvas = document.getElementById('animCvs')
  canvas.width = 500
  canvas.height = 500

  var context = canvas.getContext('2d')

  var Board = function (rows, cols, fn) {
    this.rows = rows
    this.cols = cols
    this.cells = []
    this.reset()
    this.each(fn)
  }
  Board.prototype = {
    reset: function () {
      for (var i = 0; i < this.cols; i++) {
        this.cells[i] = []
      }
    },
    each: function (fn) {
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          this.cells[i][j] = fn ? fn(i, j) : 0
        }
      }
    },
    next: function () {
      var self = this
      return new Board(self.cols, self.rows, function (x, y) {
        var neighbors = self.neighbors(x, y)
        var state = self.cells[x][y]
        switch (state) {
          case 0: if (neighbors === 3) state = 1; break
          case 1: if (neighbors < 2 || neighbors > 3) state = 0; break
        }
        return state
      })
    },
    neighbors: function (x, y) {
      var left = Math.max(0, x - 1)
      var top = Math.max(0, y - 1)
      var right = Math.min(this.cols - 1, x + 1)
      var bottom = Math.min(this.rows - 1, y + 1)
      var neighbors = 0
      for (var dx = left; dx <= right; dx++) {
        for (var dy = top; dy <= bottom; dy++) {
          if (dx === x && dy === y) continue
          neighbors += this.cells[dx][dy]
        }
      }
      return neighbors
    },
    draw: function (context) {
      var self = this
      context.clearRect(0, 0, 500, 500)
      context.fillStyle = 'black'
      this.each(function (x, y) {
        var state = self.cells[x][y]
        if (state === 1) {
          var xpos = x * 5
          var ypos = y * 5
          context.fillRect(xpos, ypos, 5, 5)
        }
        return state
      })
    }
  }

  var Timer = (function () {
    var tasks = []
    // var requestId

    function tick () {
      for (var i = 0; i < tasks.length; i++) {
        tasks[i]()
      }
      /* requestId = */window.requestAnimationFrame(function () { tick() })
    }

    tick()

    return {
      schedule: function (task) {
        if (tasks.indexOf(task) < 0) {
          tasks.push(task)
        }
      },
      cancel: function (task) {
        var index = tasks.indexOf(task)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      }
    }
  })()

  var board = new Board(100, 100, function (x, y) {
    return Math.random() > 0.5 ? 1 : 0
  })

  Timer.schedule(function () {
    board.draw(context)
    board = board.next()
  })
}())
