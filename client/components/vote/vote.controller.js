'use strict';

angular.module('capitolwatchApp')
  .controller('voteCtrl', function ($scope, $http, $location, Auth, $routeParams) {

    

    $scope.voteyea = function(){
      $http.post('/api/user_votes', {
          userid: Auth.getCurrentUser()._id,
          billid: $routeParams.id,
          stance: 'nay'
      })
        .success(function(data, status, headers, config){
            console.log("yea boy shit got voted yea");
            $scope.votesuccess = true;
            $scope.votecontrol = true;
        })
        .error(function(data, status, headers, config){
          console.log("vote didnt happen");
        });
    }

    $scope.votenay = function(){

      $http.post('/api/user_votes', {
          userid: Auth.getCurrentUser()._id,
          billid: $routeParams.id,
          stance: 'nay'
      })
        .success(function(data, status, headers, config){
            console.log("yea boy shit got voted nay");
            $scope.votesuccess = true;
            $scope.votecontrol = true;


            $http.get('/api/user_votes/')
              .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                  var stance = data[i].stance;
                  console.log("yum");
                }
              })
              .error(function(data, status, headers, config) {
                console.log("sorry get to api user_votes didnt work");
              });




        })
        .error(function(data, status, headers, config){
          console.log("vote didnt happen");
        });
    }

  });