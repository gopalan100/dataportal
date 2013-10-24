/* Filters */
angular.module('countriesFilter', []).filter('filtereddataset', function (dataSetData) {
	alert(dataSetData);
    return function (stoves, characteristics) {
        var result = stoves.slice(); // copy array
        angular.forEach(characteristics, function (value, key) {
            if (value) {
                for (var index = 0; index < result.length; index++) {
                    stove = result[index];
                    if (stove.characteristics.indexOf(key) == -1) {
                        result.splice(index--, 1);
                    }
                }
            }
        });
        return result;
    }
});