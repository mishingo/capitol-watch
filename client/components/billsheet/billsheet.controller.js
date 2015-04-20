'use strict';

angular.module('capitolwatchApp')
  .controller('billsheetCtrl', function ($scope, $http, $location, Auth, $routeParams) {
    
    $scope.message = 'Hello Bitch';
    $scope.id = $routeParams.id;
    var billid = $routeParams.id;
    //console.log($scope.id);

    
    $scope.abill = [];
    $http.jsonp('https://www.govtrack.us/api/v2/bill/' + billid + "?&format=jsonp", {
      params: {
        callback: 'JSON_CALLBACK'
      }
    })
      .success(function(data){
        
        if(data.bill_type == "senate_bill"){
          data.bill_type = "Senate";
        }
        if(data.bill_type == "house_resolution"){
          data.bill_type = "House of Representatives";
        }
        if(data.bill_type == "house_bill"){
          data.bill_type = "House of Representatives";
        }


        $scope.bill_type = data.bill_type;
        $scope.introduced = data.introduced_date;
        $scope.congress = data.congress;
        $scope.bill_number = data.display_number;
        $scope.bill_title = data.title_without_number;

        if(data.current_status == "referred"){
          data.current_status = "Referred";
        }
        $scope.current_status = data.current_status;
        $scope.current_status_date = data.current_status_date;
        $scope.current_status_desc = data.current_status_description;
        $scope.majoractions = [];
        for (var i = 0; i < data.major_actions.length; i++) {
          var majoraction = data.major_actions[i][2];
          $scope.majoractions.push(majoraction);
          console.log($scope.majoractions);
        }
        $scope.major_actions = data.major_actions[0][2];
        $scope.sponsor_bioguide = data.sponsor.bioguideid;
        $scope.sponsor_name = data.sponsor.name;
        $scope.sponsor_party = data.sponsor_role.party;

        $scope.sponsor_description = data.sponsor_role.description;
        $scope.sponsor_phone = data.sponsor_role.phone;
        $scope.sponsor_website = data.sponsor_role.website;
        $scope.sponsor_start = data.sponsor_role.startdate;
        $scope.sponsor_end = data.sponsor_role.enddate;

        $scope.committees = [];
        for (var i = 0; i < data.committees.length; i++) {
          var committee = data.committees[i];
          $scope.committees.push(committee);
          console.log($scope.committee);
        }


        $scope.abill.push(data);
        console.log(data);
        console.log($scope.bill_type);
      })
      .error(function(data, status, headers, config){
        console.log("sorry data wasn't retrieved from govtrack bills");
      });

  });