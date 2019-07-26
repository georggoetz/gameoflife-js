'use strict'

var Event = function (source) {
  this.source = source
  this.listeners = []
}

Event.prototype = {
  add: function (listener) {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener)
    }
  },
  remove: function (listener) {
    var index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  },
  fire: function (args) {
    var source = this.source
    this.listeners.forEach(function (listener) { listener(source, args) })
  }
}

module.exports = Event
