angular.module('myApp')
    .controller('trainingCtrl', function($scope, $http, $sessionStorage) {

        $scope.setUserLogin();

        /**
         * requesting trainer details json
         * by making a GET request 
         * to server
         */
        $http.get('/trainingDetails').then(function(response) {

            $scope.trainingDetails = response.data;
            $scope.sendCourseCode = function(courseCode) {

                $sessionStorage.courseCode = courseCode;
            }
        });
    });
