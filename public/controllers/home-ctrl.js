angular.module('myApp')
    .controller('homeCtrl', function($scope, $http) {

        $scope.setUserLogin();

        /**
         * making get request to server
         * for user details
         */
        $http.get('/home/userDetails').then(function(response) {

            $scope.userDetails = response.data;
        });

        /**
         * making get request to server
         * for trainer details
         */
        $http.get('/home/trainerDetails').then(function(response) {

            $scope.trainerDetails = response.data;
        });

    });
