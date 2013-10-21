/* Services */

angular.module('dataSetDataServices', ['ngResource']).
    factory('dataSetData', function($resource){  
  return $resource('dataa/:studentId.json', {}, {
    query: {method:'GET', params:{studentId:'datasetData'}, isArray:true}
  });
  
});
