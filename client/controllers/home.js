angular.module('Votter')

.controller('HomeCtrl', function($auth, $window) {
    var vm = this;
    vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    if ($window.localStorage.currentUser) {
        var getUser = $window.localStorage.currentUser;
        var user = JSON.parse(getUser);
        vm.username = user.email;
    }
});
