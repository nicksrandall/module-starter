export default ngModule => {
  // @ngInject
  function directive ($compile, $rootScope) {
    require('./styles.css');
    
    // @ngInject
    function Ctrl ($scope, $element, $rootScope) {
      var vm = this;
      var i, item, el;
      var main = $element.find('.filter-items');
      var drill = $element.find('.filter-drill');

      for (i=0; i < $scope.fields.length; i++) {
        el = angular.element(`<div index="${i}" da-filter-${$scope.fields[i].type}></div>`);
        main.append(el);
        $compile(el)($scope.$new());
      }

      vm.options = [];
      vm.selectedItem = {name: null, value: null};
      vm.open = c => {
        main.removeClass('open');
        drill.addClass('open');
        vm.name = c.name;
        vm.selectedItem = $scope.model[c.key];
        vm.key = c.key;
        vm.options = c.templateOptions.options;
      };

      vm.select = (key, item) => $scope.model[key] = vm.selectedItem = item;

      vm.isSelectedItem = item => vm.selectedItem.value !== item.value;

      vm.close = () => {
        drill.removeClass('open');
        main.addClass('open');
      };
    }

    var directive = {
      restrict: 'EA',
      replace: true,
      template: require('./template.html'),
      scope: {
        model: '=',
        fields: '='
      },
      controller: Ctrl,
      controllerAs: 'vm',
      // bindToController: true
    };


    return directive;
  }

  ngModule.directive('daFilterItems', directive)
};