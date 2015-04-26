angular.module('capitolwatchApp')
  	.controller('repactivityCtrl', function ($scope, $http, socket, Auth) {

  		
      	if (navigator.geolocation){
        	navigator.geolocation.getCurrentPosition(function(position){
            	var latt = position.coords.latitude;
            	var longg = position.coords.longitude;
         
            

            	//Sunlight congress call
            	var slc = 'https://congress.api.sunlightfoundation.com';
            	var slckey = '4e6a01514540472cb4440d9541dc0b15';

            	$scope.members = [];
            	$scope.recentvotes = [];
	            	$http.jsonp('https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + latt + '&longitude=' + longg + '&apikey=4e6a01514540472cb4440d9541dc0b15&format=jsonp', {
	              		params: {
	                		callback: 'JSON_CALLBACK'
	              		}
	            	})
	            	.success(function (data) {
	              		for (var i = 0; i < data.results.length; i++) {
	                  		var member = data.results[i];
	                  		$scope.members.push(member.govtrack_id);				
	              		}
	              		console.log($scope.members);

	              		for(var k = 0; k < $scope.members.length; k++){
	              				$http.jsonp('https://www.govtrack.us/api/v2/vote_voter?person=' + $scope.members[k] +'&sort=-created&limit=1&format=jsonp', {
	              			  		params: {
	              			    		callback: 'JSON_CALLBACK'
	              			  		}
	              				})
	              				.success(function (data) {
	              					for (var k = 0; k < data.objects.length; k++) {
	              					    var recentvote = data.objects[k];
	              					    $scope.recentvotes.push(recentvote);				
	              					}

	              			      		//$scope.recentvotes.push(data);
	              			      		console.log($scope.recentvotes);
	              				})
	              				.error(function (data){
	              					console.log('https://www.govtrack.us/api/v2/vote_voter?person=' + $scope.members[i] +'&sort=-created&limit=1&format=jsonp');
	              				});
	              		}
	            	});

	            

	            

        	});
      	}

      	
 	});