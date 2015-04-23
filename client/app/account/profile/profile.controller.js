'use strict';

angular.module('capitolwatchApp')
  .controller('ProfileCtrl', function ($scope, User, Auth, $http) {

    $scope.errors = {};
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.bills = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-introduced_date&format=jsonp&limit=5', {
        params: {
            callback: 'JSON_CALLBACK'
        }
    })
    .success(function (data) {
        $http.get('/api/user_votes/ui/' + Auth.getCurrentUser()._id).success(function(user_votedata) {
            console.log('/api/user_votes/ui/' + Auth.getCurrentUser()._id);
            console.log(user_votedata);
            for (var i = 0; i < data.objects.length; i++) {
                var bill_id = data.objects[i].id;
            console.log(bill_id);
        }
    })
    .error(function(data, status, headers, config) {
        console.log("sorry post to api user_votes didnt work");
    });


    $scope.uservotes = [];
    $http.jsonp('/api/user_votes/ui/' + Auth.getCurrentUser()._id, {
        params: {
            callback: 'JSON_CALLBACK'
        }
    })
    .success(function(data, status, headers, config) {
        for (var i = 0; i < data.objects.length; i++) {
            var uservote = data.objects[i];
            $scope.uservotes.push(uservote);
            console.log($scope.uservotes);
        }
    });
});
});


