angular.module('capitolwatchApp')
  .controller('repactivityCtrl', function ($scope, $http, socket, Auth) {


$scope.glocation = [];
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latt = position.coords.latitude;
            var longg = position.coords.longitude;
            $scope.$apply(function() {
                $scope.glocation.push(latt, longg);
            });
        });
      }

    var latt = 42.96;
    var longg = -108.09;

    //Sunlight congress call
    var slc = 'https://congress.api.sunlightfoundation.com';
    var slckey = '4e6a01514540472cb4440d9541dc0b15';

    $scope.members = [];
    $http.jsonp('https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + latt + '&longitude=' + longg + '&apikey=4e6a01514540472cb4440d9541dc0b15&format=jsonp', {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
    .success(function (data) {
      for (var i = 0; i < data.results.length; i++) {
          var member = data.results[i];
          $scope.members.push(member);
          //console.log($scope.members);
      }
    });

 });