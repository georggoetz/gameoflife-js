'use strict'

// Simple Moving Average
var SMA = function (maxSamples) {
  this.samples = []
  this.maxSamples = maxSamples
}
SMA.prototype = {
  push: function (sample) {
    this.samples.push(sample)
    if (this.samples.length > this.maxSamples) {
      this.samples.splice(0, 1)
    }
  },
  average: function () {
    var sum = this.samples.reduce(function (sum, sample) { return sum + sample }, 0)
    return this.samples.length > 0 ? sum / this.samples.length : 0
  }
}

module.exports = SMA
