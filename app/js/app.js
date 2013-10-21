
angular.module('AshokaApp', ['ui.bootstrap', 'dataSetDataServices', 'ngDragDrop']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
     	 when('/', {
            templateUrl: '/Ashoka_Dev/app/partials/homepage.html',
            controller: 'ContactController'
        }).
        when('/about', {
            templateUrl: '/Ashoka_Dev/app/partials/aboutpage.html',
            controller: 'ContactController'
        }).
        when('/data', {
            templateUrl: '/Ashoka_Dev/app/partials/datapage.html',
            controller: 'ContactController'
        })
}]);      
      
      
    