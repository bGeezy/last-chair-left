angular.module('chairs', []).controller('chair-remover',['$scope', '$interval', '$timeout' ,function($scope, $interval, $timeout) {
    $scope.range = 300;
    $scope.initChairs = function () {
      $interval.cancel(stop);
      $scope.chairs = [];
      $scope.skip = 0;
    	$scope.count = 0;
      for(var i=1;i<101;i++){
        $scope.chairs.push(i)
      }
      $timeout($scope.positionChairs,500)
    }
    $scope.positionChairs = function (){
			var timer = $timeout(function(){
         var items = document.getElementsByClassName('chair');
         $scope.items = items;
         for(var i = 0; i < items.length; i++) {
          items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/100)*i*Math.PI)).toFixed(4) + "%";
          items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/100)*i*Math.PI)).toFixed(4) + "%";
        }
        },1000);
    }
    $scope.initChairs()
    $scope.positionChairs()
    $scope.removeNextChairs = function() {
    	var stop = $interval(function(){
        if ($scope.chairs.length > 1) {
            $scope.chairs.splice($scope.skip, 1);
            $scope.skip = ($scope.skip + 1 + $scope.count) % $scope.chairs.length;
            $scope.count= $scope.count + 1;
        }else{
        	$scope.lastChair = $scope.chairs[0];
        }
      },$scope.range)
      $scope.stop = function() {
      	$interval.cancel(stop)
      }
		}
}]);