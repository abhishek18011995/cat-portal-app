angular.module('myApp')
    .controller('courseDetailsCtrl', function($scope, $http, $sessionStorage) {

        $scope.setUserLogin();
        var courseCode = $sessionStorage.courseCode;

        /**
         * making post request to server
         * for course details
         */
        $http.post('/' + courseCode).then(function(response) {

            $scope.courseDetails = response.data;
        });
    });
