const stats = require("stats-lite");
const FixedArray = require("fixed-array");

const HISTORY_SIZE = 20;

const calc = (routeData, responseTime) => {
  if(!routeData.count) routeData.count = 0;
  if(!routeData.callsHistory) routeData.callsHistory = FixedArray(HISTORY_SIZE);
  routeData.callsHistory.push(responseTime);
  routeData.count += 1;
  routeData.min = routeData.callsHistory.min();
  routeData.max = routeData.callsHistory.max();
  routeData.mean = routeData.callsHistory.mean();
  routeData.p75 = stats.percentile(routeData.callsHistory.values(), 0.75);
  routeData.p95 = stats.percentile(routeData.callsHistory.values(), 0.95);
  routeData.p99 = stats.percentile(routeData.callsHistory.values(), 0.99);
}

module.exports = {calc}
