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

        $scope.bindBtn = function() {

            // 定义按钮btn  
            var btn = $("#send-captcha");
            btn.attr('disabled', 'disabled'); 

            // 定义发送时间间隔(s)
            var SEND_INTERVAL = 6;
            var timeLeft = SEND_INTERVAL;
            var timeId = window.setInterval(function() {
                if(timeLeft > 0) {
                    timeLeft -= 1;
                    btn.html(timeLeft + "秒后重新发送");
                    //console.log(timeLeft);
                } else {
                    btn.html("重新发送短信");
                    btn.attr("disabled",false);
                    // console.log(timeLeft);
                    // console.log(timeId);
                    clearInterval(timeId);
                }
            }, 1000);
            $.ajax({
              // ajax接口调用...

            })
            .done(function () {
                // alert('发送成功');
                // do something 
                                
            })
            .fail(function () {
                // alert('发送失败');
                // do something 
            });
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