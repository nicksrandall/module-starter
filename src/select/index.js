export default ngModule => {
  function directive () {
    require('./styles.css');
    var directive = {
      restrict: 'EA',
      replace: true,
      template: require('./template.html'),
      require: '^daFilterItems',
      link: linkFunc
    };

    function linkFunc (scope, element, attrs, ctrl) {
      var index = parseInt(attrs.index);
      scope.config = scope.fields[index];
    }

    return directive;
  }

  ngModule.directive('daFilterSelect', directive)
};