angular.module('Votter')
    .controller('HeaderCtrl', function($auth, $window, $routeParams) {
        var vm = this;

        vm.isAuthenticated = function() {

            return $auth.isAuthenticated();
        };

        // if ($window.localStorage.currentUser) {
        //     var getUser = $window.localStorage.currentUser;
        //     var user = JSON.parse(getUser);
        //     vm.username = user.email;
        // }
        vm.username = $routeParams.profile;




        vm.logout = function() {
            $auth.logout();
            delete $window.localStorage.currentUser;
        };
    });
