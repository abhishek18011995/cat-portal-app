angular.module('myApp')
    .controller('assessmentCtrl', function($scope, $http, $sessionStorage) {

        $scope.setUserLogin();
        $scope.assessmentDetails = [];

        $scope.getAssessmentCode = function(aCode) {

            $sessionStorage.aCode = aCode;
        }

        /**
         * making post request to server
         * for assessment details
         */
        $http.get('/assessment').then(function(response) {

            $scope.assessment = response.data;
            angular.forEach($scope.assessment, function(val, key) {

                $scope.assessmentDetails = val.details;
            });
        });
    });
