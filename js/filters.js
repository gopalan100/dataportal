/* Filters */

angular.module('countryFilters', []).filter('cfilter', function() {
   return function(input,x) {
   	      var groups = [];
   	    for(var i = 0; i < input.length; i++) {
        if (input[i].country.substring(0,1) == x)
        	groups.push(input[i]);
            
    } return groups; }
});
