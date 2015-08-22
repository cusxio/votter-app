angular.module('Votter')
    .directive('emailAvailableValidator', function($http) {
        return {
            require: 'ngModel',
            link: function($scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.emailAvailable = function(email) {
                    return $http.get('http://localhost:9000/check-email?email=' + email);
                };
            }
        };
    });
