var app = angular.module("myContactApp", [])

app.controller("myContactController", ["$scope","$http", function($scope, $http){
	
	refresh()

	$scope.createContact = function(){
		$http.post("/", $scope.contact)
			 .then(function(response){
			 	console.log(response.data)
			 	$scope.contact = {};
			 	refresh()
			 })
	}

	 function refresh(){
		$http.get("/")
			 .then(function(respone){
			 	console.log(respone)
			 	$scope.contactList = respone.data
			 })
	}
}])

	