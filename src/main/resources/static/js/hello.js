/**
 * Created by Rotten on 4/28/2017.
 */
angular.module('hello', ['ngRoute']).config(function ($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'home',
        controllerAs: 'controller'
    }).when('/login', {
        templateUrl: 'login.html',
        controller: 'navigation',
        controllerAs: 'controller'
    }).when('/journal', {
        templateUrl: 'journal.html',
        controller: 'journal',
        controllerAs: 'controller'
    }).otherwise('/');

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'HMLHttpRequest';
}).controller('home', function ($http) {
    var self = this;
    $http.get('/resource').then(function (response) {
        self.greeting = response.data;
    })
}).controller('journal', function ($http) {
    var self = this;
    $http.get('/journalentry').then(function (response) {
        self.journal = response.data;
    })
}).controller('navigation', function ($rootScope, $http, $location) {
    var self = this;

    var authenticate = function (credentials, callback) {

        var headers = credentials ? {
            authorization: "Basic " +
            btoa(credentials.username + ":" + credentials.password)
        } : {};

        $http.get('user', {headers: headers}).then(function (response) {
            if (response.data.name) {
                $rootScope.authenticated = true;
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        }, function () {
            $rootScope.authenticated = false;
            callback && callback();
        });
    }

    authenticate();

    self.credentials = {};
    self.login = function () {
        authenticate(self.credentials, function () {
            if ($rootScope.authenticated) {
                $location.path("/");
                self.error = false;
            } else {
                $location.path("/login");
                self.error = true;
            }
        });
    }

    self.logout = function () {
        $http.post('logout', {}).finally(function () {
            $rootScope.authenticated = false;
            $location.path("/");
        });
    }
});