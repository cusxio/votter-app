angular.module('Votter')

.controller('SignupCtrl', function($auth, $window) {
    var vm = this;
    vm.submit = function() {
        var user = {
            email: vm.email,
            password: vm.password
        };

        $auth.signup(user).then(function(response) {
            // Maybe say something like thank you for registering!
        });
    };
});
