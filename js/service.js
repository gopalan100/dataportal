/* Services */

angular.module('dataSetDataServices', ['ngResource']).factory('dataSetData', function($resource){  
  return $resource('/getChartData', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
  
})
.factory('getSectors', function($resource){  
 return $resource('/getSectors', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getCountries', function($resource){  
 return $resource('/getCountries', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getYears', function($resource){  
 return $resource('/getYears', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('getSurveyData', function($resource){  
 return $resource('/getSurveyData', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
})
.factory('dataSetData1', function($resource){  
return $resource('/dataa/datasetData.json', {}, {
        query: {
            method: 'GET',
            params: {
               
            },
            isArray: true
        }
    });
  
})


;

