(function () {
    'use strict';

    angular.module('app.ui.form.register')
        .controller('RegisterCtrl', ['$scope', RegisterCtrl]);



    function RegisterCtrl ($scope) {
        var original;

        $scope.user = {
            name: '',
            email: '',
            passowrd: ''
        }   

        original = angular.copy($scope.user);
        $scope.revert = function() {
            $scope.user = angular.copy(original);
            $scope.material_signup_form.$setPristine();
            $scope.material_signup_form.$setUntouched();
            return;
        };
        $scope.canRevert = function() {
            return !angular.equals($scope.user, original) || !$scope.material_signup_form.$pristine;
        };
        $scope.canSubmit = function() {
            return $scope.material_signup_form.$valid && !angular.equals($scope.user, original);
        };    
        $scope.submitForm = function() {
            $scope.showInfoOnSubmit = true;
            return $scope.revert();
        };           
    }


})(); 