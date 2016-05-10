(function(){
	var service = function($http, $q){
		var sharedService = {};
		var baseURL = 'http://localhost:5000/api.tubusiness';
		var header = {
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        };
		sharedService.post = function (info) {
            var defer = $q.defer();

            $http.post(baseURL, info, header).success(function (data) {
                defer.resolve(data.data);
            }).error(function (e) {
                console.log('error: '+ e);
            });
            return defer.promise;
        };

        return sharedService;
	};
	angular.module('app').factory('$appService',service);
})();