'use strict'

var Event = function (publisher) {
  this.publisher = publisher
  this.subscribers = []
}

Event.prototype = {
  subscribe: function (subscriber) {
    if (this.subscribers.indexOf(subscriber) < 0) {
      this.subscribers.push(subscriber)
    }
  },
  unsubscribe: function (subscriber) {
    var index = this.subscribers.indexOf(subscriber)
    if (index > -1) {
      this.subscribers.splice(index, 1)
    }
  },
  fire: function (args) {
    var publisher = this.publisher
    this.subscribers.forEach(function (subscriber) { subscriber(publisher, args) })
  }
}

module.exports = Event
