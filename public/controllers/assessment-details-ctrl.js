angular.module('myApp')
    .controller('assessmentDetailsCtrl', function($scope, $http, $sessionStorage) {

        $scope.setUserLogin();
        var aCode = $sessionStorage.aCode;
        $scope.assessmentCode = {};
        $scope.assessmentCode.aCode = aCode;

        /**
         * making post request to server
         * for particular assessment details
         */
        $http.post('/assessment_details/' + aCode, $scope.assessmentCode).then(function(response) {

            angular.forEach(response.data, function(vals, keys) {

                angular.forEach(vals.details, function(val, key) {

                    $scope.assessmentDetail = val;
                });
            });
        });
    });
