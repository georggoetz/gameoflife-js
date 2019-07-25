(function () {
  'use strict'

  var canvas = document.getElementById('animCvs')
  canvas.width = 500
  canvas.height = 500

  var context = canvas.getContext('2d')

  var Life = function (rows, cols, callback) {
    this.cells = []
    if (rows && cols && callback) {
      this.fill(rows, cols, callback)
    }
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
    fill: function (rows, cols, callback) {
      for (var x = 0; x < cols; x++) {
        this.cells[x] = []
        for (var y = 0; y < rows; y++) {
          this.cells[x][y] = callback(x, y)
        }
      }
    },
    next: function () {
      var self = this
      return new Life(this.rows(), this.cols(), function (x, y) {
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
      return this.cell(x, y - 1) +
             this.cell(x, y + 1) +
             this.cell(x - 1, y - 1) +
             this.cell(x - 1, y) +
             this.cell(x - 1, y + 1) +
             this.cell(x + 1, y - 1) +
             this.cell(x + 1, y) +
             this.cell(x + 1, y + 1)
    },
    draw: function (context) {
      context.clearRect(0, 0, 500, 500)
      context.fillStyle = 'black'
      for (var x = 0; x < this.cols(); x++) {
        for (var y = 0; y < this.rows(); y++) {
          var state = this.cells[x][y]
          if (state === 1) {
            var xpos = x * 5
            var ypos = y * 5
            context.fillRect(xpos, ypos, 5, 5)
          }
        }
      }
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

  var life = new Life(100, 100, function () {
    return Math.random() > 0.5 ? 1 : 0
  })

  Timer.schedule(function () {
    life.draw(context)
    life = life.next()
  })
}())
