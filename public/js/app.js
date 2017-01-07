(function() {
    'use strict';

    var app = angular.module("myApp", ["ngRoute", "ngStorage"]);
    app.config(function($routeProvider) {

        $routeProvider
            .when('/', {
                controller: "loginCtrl",
                templateUrl: "partials/login.html"
            })
            .when('/home', {
                resolve: {
                    "check": function($location) {
                        if (window.localStorage['session'] == "false") //check condition if its logged in
                            window.location.replace("/"); //redirect user to home.
                    }
                },
                controller: "homeCtrl",
                templateUrl: "partials/home.html"
            })
            .when('/batchInfo', {
                resolve: {
                    "check": function($location) {
                        if (window.localStorage['session'] == "false") //check condition if its logged in
                            window.location.replace("/"); //redirect user to home.
                    }
                },
                controller: "batchInfoCtrl",
                templateUrl: "partials/batch-info.html"
            })
            .when('/training', {
                resolve: {
                    "check": function($location) {
                        if (window.localStorage['session'] == "false") //check condition if its logged in
                            window.location.replace("/"); //redirect user to home.
                    }
                },
                controller: "trainingCtrl",
                templateUrl: "partials/training.html"
            })
            .when('/assessment', {
                resolve: {
                    "check": function($location) {
                        if (window.localStorage['session'] == "false") //check condition if its logged in
                            window.location.replace("/"); //redirect user to home.
                    }
                },
                controller: "assessmentCtrl",
                templateUrl: "partials/assessment.html"
            })
            .when('/:courseCode', {
                resolve: {
                    "check": function($location) {
                        if (window.localStorage['session'] == "false") //check condition if its logged in
                            window.location.replace("/"); //redirect user to home.
                    }
                },
                controller: "courseDetailsCtrl",
                templateUrl: "partials/course-details.html"
            })
            .when('/assessment_details/:aCode', {
                resolve: {
                    "check": function($location) {
                        if (window.localStorage['session'] == "false") //check condition if its logged in
                            window.location.replace("/"); //redirect user to home.
                    }
                },
                controller: "assessmentDetailsCtrl",
                templateUrl: "partials/assessment-details.html"
            });
    });

    // main controller
    app.controller('mainCtrl', function($scope, $location, $localStorage) {

        $scope.userLogin = "Guest";
        $scope.setUserLogin = function() {

            $scope.userLogin = $localStorage.userLogin;
            console.log($scope.userLogin);
        }

        $scope.isActive = function(destination) {

            return destination == $location.path();
        }
    });

})();
