class Chronometer {
  constructor() {
    this.startTime = 0;
    this.timeTaken = 0;
  }

  start() {
    this.startTime = Date.now();
  }

  stop() {
    return this.timeTaken = Date.now() - this.startTime;
  }

  log() {
    return this.timeTaken;
  }

}

module.exports = Chronometer;
