'use strict'

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

module.exports = Timer
