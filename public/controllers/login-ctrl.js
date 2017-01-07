angular.module('myApp')
    .controller('loginCtrl', function($scope, $http, $location, $sessionStorage, $localStorage) {

        $scope.user = {};
        $scope.loginEmpty = false;
        $scope.loginInvalid = false;
        window.localStorage['session'] = "false";

        $scope.login = function() {

            /**
             * check whether the username
             * and password is empty or not
             */
            if ($scope.user.id == null || $scope.user.id == "" || $scope.user.password == null || $scope.user.password == "") {

                $scope.loginInvalid = false;
                $scope.loginEmpty = true;
            } else {

                $scope.loginEmpty = false;

                /**
                 * making post request to the server 
                 * for validating the userId and password 
                 */
                $http.post('/user', $scope.user).then(function(response) {

                    if (response.data == "true") {

                        $scope.loginInvalid = true;
                    } else {

                        $localStorage.userLogin = response.data.userName;
                        $scope.isLogin = true;
                        $scope.setUserLogin();
                        window.localStorage['session'] = "true";
                        $location.path('/home');
                    }
                }, function() {

                    console.log("Failed");
                });
            }
        };
    });
