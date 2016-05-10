(function(){


	var directive = function($swipe){
		
		var link = function(scope, element, attrs){

			scope.options = scope.options || {};
			scope.options.back = scope.options.back || false;
			scope.options.title = scope.options.title || '';
			scope.options.footer = scope.options.footer || [];

			scope.back = scope.options.back ? true : false;

			scope.onBack = function(){	
				if(scope.options.back){
					window.location = scope.options.back;
				}
			};

		};

		return {
			restrict: 'E',
	        templateUrl: 'app/shared/components/al-header/al-header.template.html',
	        link: link,
			scope:{
				options:'=?source'
			}
		};

	};
	


	angular.module('alHeader', []).directive('alHeader',directive);
})();