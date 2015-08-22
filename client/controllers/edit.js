angular.module('Votter')
    .controller('EditCtrl', function($routeParams, API) {
        var vm = this;
        vm.creator = $routeParams.profile;
        vm.link = $routeParams.poll;
        API.getPoll(vm.creator, vm.link)
            .then(function(response) {
                vm.poll.question = response.data[0].title;
                vm.poll.choices = response.data[0].choices;
            });
        vm.poll = {
            question: "",
            choices: "",
            creator: vm.creator
        };
        vm.edit = function() {
            API.editPoll(vm.creator, vm.link, vm.poll);
        };


    });
