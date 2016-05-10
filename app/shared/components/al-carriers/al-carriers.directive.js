(function(){


	var directive = function(){
		
		var link = function(scope, element, attrs, ngModelCtrl){
			scope.onSelect = function($index){
				scope.select($index);
				ngModelCtrl.$setViewValue($index);
				ngModelCtrl.$render();
			};

			scope.select = function(index){
				for(i in scope.options){
					scope.options[i].active = false;
				}
				scope.options[index].active = true;
			};

			ngModelCtrl.$render = function(){
				if(ngModelCtrl.$modelValue !== null){
					if(ngModelCtrl.$modelValue < scope.options.length){
						scope.select(ngModelCtrl.$modelValue);
					}
				}
			};
			
			

		};

		return {
			restrict: 'E',
			require: '?ngModel',
	        templateUrl: 'app/shared/components/al-carriers/al-carriers.template.html',
	        link: link,
			scope:{
				options:'=?source'
			}
		};

	};
	


	angular.module('alCarriers', []).directive('alCarriers',directive);
})();