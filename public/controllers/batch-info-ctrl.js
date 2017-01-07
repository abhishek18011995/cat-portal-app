angular.module('myApp')
    .controller('batchInfoCtrl', function($scope, $http) {

        $scope.setUserLogin();
        /**
         * making get request to server
         * for batch information
         */
        $http.get('/home/batchInfo').then(function(response) {

            $scope.batchLength = response.data.length;
            $scope.batchInfo = response.data;
        });
    });
