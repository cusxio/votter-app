angular.module('Votter')
    .factory('API', function($http) {
        return {
            createPoll: function(poll,user) {
                return $http.post('http://localhost:9000/' + user + '/create',poll);
            },
            getPolls: function(creator) {
                return $http.get('http://localhost:9000/get-polls?creator=' + creator);
            },
            getPoll: function(creator, link) {
                return $http.get('http://localhost:9000/' + creator + '/' + link);
            },
            updateVotes: function(creator, link, selection) {
                return $http.put('http://localhost:9000/' + creator + '/' + link, selection);
            },
            editPoll: function(creator, link, changes) {
                return $http.put('http://localhost:9000/' + creator + '/' + link + '/edit'  , changes);
            },
            deletePoll: function(creator, link) {
                return $http.delete('http://localhost:9000/' + creator + '/' + link);
            }
        };
    });
