(function () {
    'use strict';
    angular.module('register', ['ngMaterial','ngMessages'])
     .config(function($mdThemingProvider) {
       $mdThemingProvider.theme('default')
          .primaryPalette('green')
          .accentPalette('red');
     });

    angular.module('register')
        .controller('RegisterCtrl', ['$scope','$http', RegisterCtrl]);


    function RegisterCtrl ($scope,$http) {
        var original;

        $scope.user = {
            name: '',
            studioName: '',
            phoneNum: '',
            address: '',
            studioDescribe: ''   
        }   

        original = angular.copy($scope.user);
        $scope.canSubmit = function() {
            return $scope.material_signup_form.$valid && !angular.equals($scope.user, original);
        };    
        $scope.submitForm = function() {
            $scope.showInfoOnSubmit = true;
            $.ajax({
                 type: "POST",
                 url: "./test.php",
                 data: $scope.user,
                 dataType: "json",
                 success: function(data){
                    console.log(data);
                 },    
                 error :function(e){
                    console.log(e);
                 }
            });
        } 
    }


})(); 