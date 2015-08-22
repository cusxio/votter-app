angular.module('Votter')

.controller('LoginCtrl', function($auth, $window, $rootScope) {
    var vm = this;
    vm.submit = function() {
        var user = {
            email: vm.email,
            password: vm.password
        };



        $auth.login(user)
            .then(function(response) {
                $window.localStorage.currentUser = JSON.stringify(response.data.user);
                vm.currentUser = JSON.parse($window.localStorage.currentUser);
                $window.location.href = '#/' + vm.currentUser.email;
            })
            .catch(function(response) {
                vm.errorMessage = {};
                angular.forEach(response.data.message, function(message, field) {
                    console.log(field);
                    vm.loginForm[field].$setValidity('server', false);
                    vm.errorMessage[field] = response.data.message[field];
                });

            });
    };
    vm.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(response) {
                $window.localStorage.currentUser = JSON.stringify(response.data.user);
                vm.currentUser = JSON.parse($window.localStorage.currentUser);
                $window.location.href = '#/' + vm.currentUser.email;
            });
    };

});
