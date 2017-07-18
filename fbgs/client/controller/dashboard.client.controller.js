/**
 * Created by Adhitya on 18-05-2017.
 */
angular.module('fbgs').controller('DashboardController', ['$scope', '$rootScope', '$state', 'Authentication', 'Menus', '$window','$http', function ($scope, $rootScope, $state, Authentication, Menus, $window, $http) {
    $scope.currentTab = 'users';
    $scope.searchItem;
    $scope.searchResult;
    $scope.favouriteUsers = [];
    $scope.favouritePages = [];
    $scope.favouriteEvents = [];
    $scope.nextdata = null;
    $scope.prevData = null;

    function getUsersGenericData() {
        $http.post("/getFrequentlySearchedUsers", {email: Authentication.user.email}).success(function(data) {
            if(!data) {
                document.getElementById("noFreqSearchedUsers").style.display = "block";
            }
            else{
                document.getElementById("noFreqSearchedUsers").style.display = "none";
                $scope.searchResult = {data:[]};
                var details = JSON.parse(JSON.stringify(data));
                for(var i = 0; i < details.length; i++) {
                    $http.get("https://graph.facebook.com/v2.8/"+details[i].data.fbId+"? fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
                        .success(function(user) {
                            $scope.searchResult.data[$scope.searchResult.data.length] = user;
                        });
                }
            }
        });

        $http.post("/getFavouriteUsers", {email: Authentication.user.email}).success(function(data){
            if(data.data.length != 0) {
                $scope.favouriteUsers = data.data;
                console.log($scope.favouriteUsers);
            }
        });
    }

    //getUsersGenericData();

    function getPagesGenericData() {
        $http.post("/getFrequentlySearchedPages", {email: Authentication.user.email}).success(function(data) {
            if(!data || data.length == 0) {
                document.getElementById("noFreqSearchedPages").style.display = "block";
                $scope.searchResult = null;
            }
            else{
                document.getElementById("noFreqSearchedPages").style.display = "none";
                $scope.searchResult = {data:[]};
                var details = JSON.parse(JSON.stringify(data));
                for(var i = 0; i < details.length; i++) {
                    $http.get("https://graph.facebook.com/v2.8/"+details[i].data.fbId+"? fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
                        .success(function(user) {
                            $scope.searchResult.data[$scope.searchResult.data.length] = user;
                        });
                }
            }
        });

        $http.post("/getFavouritePages", {email: Authentication.user.email}).success(function(data){
            if(data != null ||  data != '' || data.data.length != 0 ) {
                $scope.favouritePages = data.data;
                console.log($scope.favouritePages);
            }
        });
    }

    function getEventsGenericData() {
        $http.post("/getFrequentlySearchedEvents", {email: Authentication.user.email}).success(function(data) {
            if(!data || data.length == 0) {
                document.getElementById("noFreqSearchedEvents").style.display = "block";
                $scope.searchResult = null;
            }
            else{
                document.getElementById("noFreqSearchedEvents").style.display = "none";
                $scope.searchResult = {data:[]};
                var details = JSON.parse(JSON.stringify(data));
                console.log(details);
                for(var i = 0; i < details.length; i++) {
                    $http.get("https://graph.facebook.com/v2.8/"+details[i].data.fbId+"? fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
                        .success(function(user) {
                            $scope.searchResult.data[$scope.searchResult.data.length] = user;
                        });
                }
            }
        });

        $http.post("/getFavouriteEvents", {email: Authentication.user.email}).success(function(data){
            if(data != null ||  data != '' || data.data.length != 0 ) {
                $scope.favouriteEvents = data.data;
                console.log($scope.favouriteEvents);
            }
        });
    }

    $scope.$on('searchFb', function(event, args) {
        $scope.searchItem = args.item.item;
       if($scope.currentTab == 'users'){
           $http.get("https://graph.facebook.com/v2.8/search?q="+$scope.searchItem+"&type=user&fields=id,name,picture.width(700).height(700)&limit=24&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
               .success(function(data){
                   $scope.searchResult = data;
                    if(data.paging.next) {
                        document.getElementById("usersControlPanel").style.display = "block";
                        $scope.nextdata = data.paging.next;
                    }
               });
       }
       else if($scope.currentTab == 'pages'){
           $http.get("https://graph.facebook.com/v2.8/search?q="+$scope.searchItem+"&type=page&fields=id,name,picture.width(700).height(700)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
               .success(function(data){
                   $scope.searchResult = data;
                   if(data.paging.next) {
                        document.getElementById("pagesControlPanel").style.display = "block";
                        $scope.nextdata = data.paging.next;
                    }
               });
       }
       else if($scope.currentTab == 'events') {
           $http.get("https://graph.facebook.com/v2.8/search?q="+$scope.searchItem+"&type=event&fields=id,name,picture.width(700).height(700)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
               .success(function(data){
                   $scope.searchResult = data;
                   if(data.paging.next) {
                        document.getElementById("eventsControlPanel").style.display = "block";
                        $scope.nextdata = data.paging.next;
                    }
               });
       }
    });

    $scope.showNextDetails = function() {
        $http.get($scope.nextdata).success(function(data) {
            $scope.searchResult = data;
            if(data.paging.next) {
                $scope.nextdata = data.paging.next;
            }else{
                $scope.nextdata = null;
            }
            $scope.prevData = data.paging.previous;
        });
    };

    $scope.showPrevDetails = function() {
        $http.get($scope.prevData).success(function(data) {
            $scope.searchResult = data;
            $scope.nextdata = data.paging.next;
            if(data.paging.previous) {
                $scope.prevData = data.paging.previous;
            }
        });
    };

    $scope.showDetails = function(id) {
        /*$http.get("https://graph.facebook.com/v2.8/"+id+"? fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")*/
        $http.get("https://graph.facebook.com/v2.8/124984464200434?%20fields=id,name,picture.width(1000).height(1000),albums.limit(100){name,photos.limit(100){name,%20picture}},posts.limit(100)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
            .success(function(data) {
                if($scope.currentTab == "users"){
                    $http.post("/saveFrequentlySearchedUsers", {email: Authentication.user.email, fbid: id});  
                }
                else if($scope.currentTab == "pages") {
                    $http.post("/saveFrequentlySearchedPages", {email: Authentication.user.email, fbid: id});     
                }
                else if($scope.currentTab =="events") {
                    $http.post("/saveFrequentlySearchedEvents", {email: Authentication.user.email, fbid: id});        
                }
               
               $scope.userDetails = data;
               if(!data.albums) {
                   document.getElementById("noUserAlbums").style.display = "block";
               }
               if(!data.posts) {
                   document.getElementById("noUserPosts").style.display = "block";
               }
               $scope.selected = {value: 0};
            });
    };

    $scope.changeFavouriteUsersColor = function(id) {
        $http.post("/updateFavouriteUsers", {email: Authentication.user.email, fbid: id}).success(function(data){
            if(data != "Error") {
                $scope.favouriteUsers = data[0].data;
                console.log($scope.favouriteUsers);
            }
            else{
                alert("There was some error in the server"); 
            }
        });
    };

    $scope.changeFavouritePagesColor = function(id) {
        $http.post("/updateFavouritePages", {email: Authentication.user.email, fbid: id}).success(function(data){
            if(data != "Error") {
                $scope.favouritePages = data[0].data;
                console.log($scope.favouritePages);
            }
            else{
                alert("There was some error in the server"); 
            }
        });
    };

     $scope.changeFavouriteEventsColor = function(id) {
        $http.post("/updateFavouriteEvents", {email: Authentication.user.email, fbid: id}).success(function(data){
            if(data != "Error") {
                $scope.favouriteEvents = data[0].data;
                console.log($scope.favouriteEvents);
            }
            else{
                alert("There was some error in the server"); 
            }
        });
    };

    $scope.formatCreatedTime = function(date) {
      $scope.formattedDate = {value: moment(date).format("YYYY-MM-Do hh:mm:ss a")};
    };

    $scope.isUserMarkedAsFavourite = function(id) {
        if($scope.favouriteUsers == undefined) {
            return false;
        }
        else{
            if($scope.favouriteUsers.indexOf(parseInt(id)) == -1) {
                return false;
            }
            else{
                return true;
            }
        }
    }

    $scope.isPageMarkedAsFavourite = function(id) {
        if($scope.favouritePages == undefined) {
            return false;
        }
        else{
            if($scope.favouritePages.indexOf(parseInt(id)) == -1) {
                return false;
            }
            else{
                return true;
            }
        }
    }

    $scope.isEventMarkedAsFavourite = function(id) {
        if($scope.favouriteEvents == undefined) {
            return false;
        }
        else{
            if($scope.favouriteEvents.indexOf(parseInt(id)) == -1) {
                return false;
            }
            else{
                return true;
            }
        }
    }

    $scope.$on('clearResult', function(event, args) {
        $scope.searchResult = {};
        $scope.searchItem = null;
        document.getElementById("usersControlPanel").style.display = "none";
        document.getElementById("pagesControlPanel").style.display = "none";
        if($scope.currentTab == "users") {
            getUsersGenericData();
        }
        else if($scope.currentTab == "pages"){
            getPagesGenericData();
        }
        else if($scope.currentTab == "events") {
            getEventsGenericData();
        }
    });

    $('#usersAnchor').click(function (e) {
        e.preventDefault();
        $scope.currentTab = 'users';
        if($scope.searchItem) {
            document.getElementById("noFreqSearchedUsers").style.display = "none";
            $http.get("https://graph.facebook.com/v2.8/search?q="+$scope.searchItem+"&type=user&fields=id,name,picture.width(700).height(700)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
                .success(function(data){
                    $scope.searchResult = data;
                });
        }
        else{
           getUsersGenericData(); 
        }
        $(this).tab('show');
    });

    $('#pagesAnchor').click(function (e) {
        e.preventDefault();
        $scope.currentTab = 'pages';
        if($scope.searchItem) {
            document.getElementById("noFreqSearchedPages").style.display = "none";
            $http.get("https://graph.facebook.com/v2.8/search?q="+$scope.searchItem+"&type=page&fields=id,name,picture.width(700).height(700)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
                .success(function(data){
                    console.log(data);
                    $scope.searchResult = data;
                });
        }
        else{   
            getPagesGenericData();
        }
        $(this).tab('show');
    });
    $('#eventsAnchor').click(function (e) {
        e.preventDefault();
        $scope.currentTab = 'events';
        if($scope.searchItem) {
            document.getElementById("noFreqSearchedEvents").style.display = "none";
            $http.get("https://graph.facebook.com/v2.8/search?q="+$scope.searchItem+"&type=event&fields=id,name,picture.width(700).height(700)&access_token=EAADvZBDZAts64BAKlhWqPhMbEUTPyIZBZCxJpgMBmzWhM2750pipwYmj1zq13UDZBb5Twwi5uW6PjAr4hnRW54PSXMbLCdkZBZCzk0cVxiuujpjH1o09UW1zQBVZB0zBDsZBkSTPpFNwg4SXFq8N7quabI9J2jAQC1k8ZD")
                .success(function(data){
                    console.log(data);
                    $scope.searchResult = data;
                });
        }
        else{
            getEventsGenericData();
        }
        $(this).tab('show');
    });
    $('#places a').click(function (e) {
        e.preventDefault();
        $scope.currentTab = 'places';
        $(this).tab('show');
    });
    $('#groups a').click(function (e) {
        e.preventDefault();
        $scope.currentTab = 'groups';
        $(this).tab('show');
    });
    $('#favorites a').click(function (e) {
        e.preventDefault();
        $scope.currentTab = 'favorites';
        $(this).tab('show');
    });
    $('#usersAnchor').click();


        /*$scope.displayFavouritesContent = function() {
            $scope.favouriteLegislatorsContents = [];
            $scope.favouriteBillsContents = [];
            $scope.favouriteCommitteesContents = [];
            if (localStorage.getItem('legislator') != null && localStorage.getItem('legislator') != undefined) {
                $scope.favouriteLegislatorsIds = JSON.parse(localStorage.getItem('legislator'));

                if ($scope.legislators == undefined || $scope.legislators == null) {
                    $http({
                        method: "GET",
                        url: "http://lowcost-env.tzwskpm3qp.us-west-2.elasticbeanstalk.com/",
                        params: {"type": "legislators"}
                    })
                        .then(function success(resp) {
                            var legislators = JSON.parse(resp.data);
                            legislators = legislators.results;
                            for (var i = 0; i < $scope.favouriteLegislatorsIds.length; i++) {
                                for (var j = 0; j < legislators.length; j++) {
                                    if (legislators[j].bioguide_id == $scope.favouriteLegislatorsIds[i]) {
                                        $scope.favouriteLegislatorsContents.push(legislators[j]);
                                        break;
                                    }
                                }
                            }
                        }, function failure(err) {
                            console.log(err);
                        });
                }
                else {
                    for (var i = 0; i < $scope.favouriteLegislatorsIds.length; i++) {
                        for (var j = 0; j < $scope.legislators.length; j++) {
                            if ($scope.legislators[j].bioguide_id == $scope.favouriteLegislatorsIds[i]) {
                                $scope.favouriteLegislatorsContents.push($scope.legislators[j]);
                                break;
                            }
                        }
                    }
                }
            }
            if (localStorage.getItem('bill') != null && localStorage.getItem('bill') != undefined) {
                $scope.favouriteBillsIds = JSON.parse(localStorage.getItem('bill'));
                if ($scope.activeBills == undefined || $scope.activeBills == null || $scope.newBills == undefined || $scope.newBills == null) {
                    $http({
                        method: "GET",
                        url: "http://lowcost-env.tzwskpm3qp.us-west-2.elasticbeanstalk.com/",
                        params: {"type": "activeBills"}
                    }).then(function success(activeBills) {
                        $http({
                            method: "GET",
                            url: "http://lowcost-env.tzwskpm3qp.us-west-2.elasticbeanstalk.com/",
                            params: {"type": "newBills"}
                        }).then(function success(newBills) {
                            var actbills = JSON.parse(activeBills.data);
                            var actbills = actbills.results;
                            var nbills = JSON.parse(newBills.data);
                            var nbills = nbills.results;
                            var bills = actbills.concat(nbills);
                            for (var i = 0; i < $scope.favouriteBillsIds.length; i++) {
                                for (var j = 0; j < bills.length; j++) {
                                    if (bills[j].bill_id == $scope.favouriteBillsIds[i]) {
                                        var dup = false;
                                        for (var k = 0; k < $scope.favouriteBillsContents.length; k++) {
                                            if ($scope.favouriteBillsContents[k].bill_id == bills[j].bill_id) {
                                                dup = true;
                                                break;
                                            }
                                        }
                                        if (!dup) {
                                            $scope.favouriteBillsContents.push(bills[j]);
                                        }
                                        break;
                                    }
                                }
                            }
                        });
                    }, function failure(err) {
                        console.log(err);
                    });
                }
                else {
                    var bills = $scope.activeBills.concat($scope.newBills);
                    for (var i = 0; i < $scope.favouriteBillsIds.length; i++) {
                        for (var j = 0; j < bills.length; j++) {
                            if (bills[j].bill_id == $scope.favouriteBillsIds[i]) {
                                var dup = false;
                                for (var k = 0; k < $scope.favouriteBillsContents.length; k++) {
                                    if ($scope.favouriteBillsContents[k].bill_id == bills[j].bill_id) {
                                        dup = true;
                                        break;
                                    }
                                }
                                if (!dup) {
                                    $scope.favouriteBillsContents.push(bills[j]);
                                }
                                break;
                            }
                        }
                    }
                }
            }
            if (localStorage.getItem('committeeFav') != null && localStorage.getItem('committeeFav') != undefined) {
                $scope.favouriteCommitteesIds = JSON.parse(localStorage.getItem('committeeFav'));
                if ($scope.committees == undefined || $scope.committees == null) {
                    $http({
                        method: "GET",
                        url: "http://lowcost-env.tzwskpm3qp.us-west-2.elasticbeanstalk.com/",
                        params: {"type": "committees"}
                    })
                        .then(function success(resp) {
                            var committees = JSON.parse(resp.data);
                            var committees = committees.results;
                            for (var i = 0; i < $scope.favouriteCommitteesIds.length; i++) {
                                for (var j = 0; j < committees.length; j++) {
                                    if (committees[j].committee_id == $scope.favouriteCommitteesIds[i]) {
                                        $scope.favouriteCommitteesContents.push(committees[j]);
                                        break;
                                    }
                                }
                            }
                        }, function failure(err) {
                            console.log(err);
                        });
                }
                else {
                    for (var i = 0; i < $scope.favouriteCommitteesIds.length; i++) {
                        for (var j = 0; j < $scope.committees.length; j++) {
                            if ($scope.committees[j].committee_id == $scope.favouriteCommitteesIds[i]) {
                                $scope.favouriteCommitteesContents.push($scope.committees[j]);
                                break;
                            }
                        }
                    }
                }
            }
        }*/


    }
]);
