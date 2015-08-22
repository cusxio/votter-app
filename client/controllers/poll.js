angular.module('Votter')
    .controller('PollCtrl', function(API, $routeParams, $window,$auth) {
            var vm = this;
            vm.creator = $routeParams.profile;
            vm.link = $routeParams.poll;
            API.getPoll(vm.creator, vm.link)
                .then(function(response) {
                    vm.question = response.data[0].title;
                    var choices = response.data[0].choices;
                    choices.forEach(function(choice) {
                        vm.pollChoices.push(choice.text);
                    });
                });
            vm.pollChoices = [];
            vm.input = "";

            vm.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };


            if ($window.localStorage.votes) {
                vm.voted = JSON.parse($window.localStorage.votes);
                for (var i = 0; i < vm.voted.length; i++) {
                    if (vm.link == vm.voted[i]) {
                        vm.voteButton = false;
                        break;
                    } else {
                        vm.voteButton = true;
                    }
                }
            } else {
                vm.voteButton = true;
                vm.voted = [];
            }











                vm.submit = function() {
                    API.updateVotes(vm.creator, vm.link, {
                            selection: vm.input
                        })
                        .then(function(response) {
                            console.log(response);
                        });
                    vm.voted.push(vm.link);
                    $window.localStorage.votes = JSON.stringify(vm.voted);

                };
            });
