angular.module('Votter')
    .controller('ResultCtrl', function($routeParams, API, $auth) {
        var vm = this;
        vm.creator = $routeParams.profile;
        vm.link = $routeParams.poll;
        API.getPoll(vm.creator, vm.link)
            .then(function(response) {
                vm.question = response.data[0].title;
                var choices = response.data[0].choices;
                choices.forEach(function(choice) {
                    vm.labels.push(choice.text);
                    vm.data.push(choice.votes);
                });
            })
            .catch(function(response) {
                vm.unAuthenticated = response.data.message;
            });
        vm.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        vm.colors = ['#FEF234', '#404E5C', '#CF1259', '#4F6272', '#DD7596'];
        vm.labels = [];
        vm.data = [];
    });
