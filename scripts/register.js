(function () {
    'use strict';
    angular.module('register', ['ngMaterial','ngMessages'])
    .controller('RegisterCtrl', ['$scope','$http','$timeout', RegisterCtrl])
        // .config(function($mdThemingProvider) {
    //    $mdThemingProvider.theme('default')
    //       .primaryPalette('green')
    //       .accentPalette('red')
    //  })
;

    function RegisterCtrl ($scope,$http,$timeout) {
        var original;

        $scope.user = {
            user_name: '',
            name: '',
            phone: '',
            address: '',
            describe: '',
            verify_code: ''   
        }   

        original = angular.copy($scope.user);
        $scope.canSubmit = function() {
            return $scope.material_signup_form.$valid && !angular.equals($scope.user, original);
        };    

        $scope.bindBtn = function() {

            // 定义按钮btn
            var btn = $("#send-captcha");
                 
            // 定义发送时间间隔(s)
            var SEND_INTERVAL = 30;
            var timeLeft = SEND_INTERVAL;
            
            if($scope.user.phone){
              $scope.validation = true;
              $.ajax({
                  // ajax接口调用...
                   type: "POST",
                   url: "http://101.201.198.27:8080/user/getverify",
                   data: {"phone":$scope.user.phone},
                   dataType: "json",
                   success: function(data){
                      console.log(data);
                   },    
                   error :function(e){
                      console.log(e);
                   }
              })
            }else{
              alert("请输入手机号");
              return;
            }          
            var timeCount = function() {
                $timeout(function() {
                    if(timeLeft > 0) {
                        timeLeft -= 1;
                        btn.html(timeLeft + "秒后重新发送");
                        timeCount();
                    } else {
                        // console.log('ok');
                       $scope.validation = false;
                       btn.html("发送短信验证码");
                    }
                }, 1000);
            }
            timeCount();
            
        }; 
       
        $scope.submitForm = function() {
            $scope.showInfoOnSubmit = true;
            $.ajax({
                 type: "POST",
                 url: "http://101.201.198.27:8080/studio/apply",
                 data: {"user_name":$scope.user.user_name,"name":$scope.user.name,"tel":$scope.user.phone,"address":$scope.user.address,"describe":$scope.user.describe,"verify_code":$scope.user.verify_code,},
                 dataType: "json",
                 success: function(data){
                    console.log(data);
                    window.location.href="http://101.201.198.27/";
                 },    
                 error :function(e){
                    console.log(e);
                 }
            });
        } 
    }


})(); 