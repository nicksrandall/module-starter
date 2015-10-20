angular.module('test', ['mobile-filters'])
.controller('TestCtrl', function ($scope) {
  $scope.model = {
    team: {
      name: "Iron Man",
      value: "iron_man"
    },
    month: {
      "name": "October",
      "value": "october"
    }
  };

  $scope.fields = [
    {
      type: 'select',
      key: 'team',
      name: 'Team',
      templateOptions: {
        label: "Normal Select",
        options: [
          {
            "name": "Iron Man",
            "value": "iron_man"
          },
          {
            "name": "Captain America",
            "value": "captain_america"
          },
          {
            "name": "Black Widow",
            "value": "black_widow"
          },
          {
            "name": "Hulk",
            "value": "hulk"
          },
          {
            "name": "Captain Marvel",
            "value": "captain_marvel"
          }
        ]
      }
    }, 
    {
      type: 'select',
      key: 'month',
      name: 'Month',
      templateOptions: {
        label: "Normal Select",
        options: [
          {
            "name": "October",
            "value": "october"
          },
          {
            "name": "November",
            "value": "november"
          },
          {
            "name": "December",
            "value": "december"
          },
          {
            "name": "January",
            "value": "january"
          },
          {
            "name": "February",
            "value": "february"
          }
        ]
      }
    }
  ];
});