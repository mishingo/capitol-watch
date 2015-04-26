angular.module('capitolwatchApp')
    .controller('recentvoteCtrl', function ($scope, $http, socket, Auth) {
        $scope.yea = [];
        $scope.nay = [];
        $scope.votes = [];
    
        $http.jsonp('https://www.govtrack.us/api/v2/bill?order_by=-current_status_date&format=jsonp', {
            params: {
                callback: 'JSON_CALLBACK'
            }
        })
        .success(function (data) {
            for (var i = 0; i < data.objects.length; i++) {
                var vote = data.objects[i];
                for(var k =0; k < vote.major_actions.length; k++){
                    var majors = vote.major_actions[k];
                }
                    var last_action = majors[majors.length-2];
                    vote.last_major_action = last_action;
                    var matchvote = /(\bvote\b)|(\bYea-Nay\b)|(\bYeas\b)/;

                    if(last_action.match(matchvote)){
                        //console.log("This action has a vote");
                        var yea = last_action.match(/(?:)[0-9]+/);
                        var nay = last_action.match(/\s-\s([0-9]+)/);
                        if(yea){
                            vote.yea = yea[0];
                        } 

                        if(nay){
                            vote.nay = nay[1];
                        } 
                    } 
                
                    if(vote.current_status == "passed_simpleres"){
                       vote.current_status = "Passed Simple Resolution"; 
                       vote.title_color = "#B8E986";
                    }
                    if(vote.current_status == "referred"){
                       vote.current_status = "Referred"; 
                       vote.title_color = "#FFE081";
                    }
                    if(vote.current_status == "reported"){
                       vote.current_status = "Reported"; 
                       vote.title_color = "#4A90E2";
                    }

                    if(vote.current_status == "pass_over_senate"){
                       vote.current_status = "Passed Over Senate"; 
                       vote.title_color = "#B8E986";
                    }

                    if(vote.current_status == "pass_over_house"){
                       vote.current_status = "Passed Over House"; 
                       vote.title_color = "#B8E986";
                    }

                $scope.votes.push(vote);
                //console.log(vote);
                
            }
        });
    });