const calculator = require('./calculator')

class Collector {
  constructor(){
    this.storage = {};

  }

  isRouteDefined(route, method, code, status){
    if(!this.storage[route]) return false;
    if(!this.storage[route][method]) return false;
    if(!this.storage[route][method][status]) return false;
    if(!this.storage[route][method][status][code]) return false;
    return true;
  }

  getRouteData(route, method, code, status) {
    if(this.isRouteDefined(route,method,code,status)){
        return this.storage[route][method][status][code];
    }
    return this.createRouteData(route, method, code, status);
  }

  isError(status){
    if(!status){
      status = 404;
    }
    if(status === 400 || status === 404){
      return true;
    }
    return false;
  }

  createRouteData(route, method, code, status) {
    this.storage[route] = {};
    this.storage[route][method] = {};
    this.storage[route][method].success = {};
    this.storage[route][method].error = {};
    this.storage[route][method][status][code] = {
      count: 0
    };

    return this.storage[route][method][status][code];
  }

  getStatus(code){
    if(this.isError(code)){
      return 'error';
    }
    return 'success';
  }

  updateRouteData(routeData,route,method,code, status){
    this.storage[route][method][status][code];
  }

  collect(route, method, code, responseTime) {
    let status = this.getStatus(code);
    let routeData = this.getRouteData(route,method,code, status);
    if(!routeData){
      return;
    }
    calculator.calc(routeData, responseTime);
    this.updateRouteData(routeData, route,method,code, status);
  }

  summary(){
    return this.storage;
  }
}


module.exports = Collector;
