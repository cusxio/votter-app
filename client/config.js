angular.module('Votter')
.config(function($routeProvider, $authProvider) {
    $routeProvider.otherwise('/');
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        })
        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            controllerAs: 'signup',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .when('/:profile', {
            templateUrl: 'views/user/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile'
        })
        .when('/:profile/create', {
            templateUrl: 'views/user/create.html',
            controller: 'CreateCtrl',
            controllerAs: 'create'
        })
        .when('/:profile/:poll', {
            templateUrl: '/views/user/poll.html',
            controller: 'PollCtrl',
            controllerAs: 'poll'
        })
        .when('/:profile/:poll/result', {
            templateUrl: '/views/user/result.html',
            controller: 'ResultCtrl',
            controllerAs: 'result'
        })
        .when('/:profile/:poll/edit', {
            templateUrl: '/views/user/edit.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
        });

    // $locationProvider.html5Mode(true);
    $authProvider.baseUrl = 'http://localhost:9000';
    $authProvider.signupUrl = '/signup';
    $authProvider.loginUrl = '/login';
    $authProvider.google({
        clientId: '67023895723-8psjja0ha7iat9dr5qlh55rdl2omam9b.apps.googleusercontent.com',
        url: 'http://localhost:9000/auth/google',
        redirectUri: 'http://localhost:3000'
    });
});
