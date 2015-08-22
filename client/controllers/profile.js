angular.module('Votter')
    .controller('ProfileCtrl', function(API, $window) {
        var vm = this;
        var getUser = $window.localStorage.currentUser;
        var user = JSON.parse(getUser);
        vm.username = user.email;
        API.getPolls(vm.username)
            .then(function(response) {
                var data = response.data;
                if (data.length === 0) {
                    vm.polls.length = 0;
                } else {
                    data.forEach(function(poll) {
                        vm.polls.push({
                            title: poll.title,
                            link: poll.link
                        });

                    });
                }

            });


        vm.polls = [];
        vm.delete = false;
        vm.deleteButton = function() {
            vm.delete = !vm.delete;
        };
        vm.deletePoll = function(index, link) {
            API.deletePoll(vm.username, link);
            vm.polls.splice(index, 1);

        };

    });
