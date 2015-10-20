var angular = require('angular');
var ngModule = angular.module('mobile-filters', []);

require('./filter-items')(ngModule);
require('./select')(ngModule);

if (ON_TEST) {
  require('./index.spec')(ngModule);
}

export default ngModule;