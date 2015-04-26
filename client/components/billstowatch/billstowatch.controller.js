'use strict';

angular.module('capitolwatchApp')
  .controller('billstowatchCtrl', function ($scope, $http, $location, Auth) {
    $scope.bills = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-introduced_date&format=jsonp&limit=5', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function (data) {
        $http.get('/api/user_votes/ui/' + Auth.getCurrentUser()._id).success(function(user_votedata) {
          //console.log('/api/user_votes/ui/' + Auth.getCurrentUser()._id);
          //console.log(user_votedata);
          for (var i = 0; i < data.objects.length; i++) {
            var bill_id = data.objects[i].id;
            //console.log(bill_id);
          }
        }).
          error(function(data, status, headers, config) {
            //console.log("sorry post to api user_votes didnt work");
          });

       for (var i = 0; i < data.objects.length; i++) {
          
          var length = 75;
          data.objects[i].title_without_number = data.objects[i].title_without_number.substring(0, length) + "[...]";
          var bill = data.objects[i];
          $scope.bills.push(bill);
          //console.log($scope.bills);
        }
      });
     
    
    

  });