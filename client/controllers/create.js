angular.module("Votter")
    .controller("CreateCtrl", function($http, $window, API,$routeParams) {
        var vm = this;

        vm.creator = $routeParams.profile;

        vm.addChoice = function() {
            vm.poll.choices.push({
                text: ""
            });
        };
        vm.fire = function() {
            console.log(vm.poll);
        };

        vm.submit = function() {
            API.createPoll(vm.poll,vm.creator)
            .then(function(response) {
                console.log(response.data);
            });

        };

        vm.poll = {
            question: "", 
            choices:[{text: "", votes: 0}, {text: "", votes: 0}],
            creator: vm.creator
        };
    });
