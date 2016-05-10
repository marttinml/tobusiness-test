(function(){


	var directive = function($swipe){
		
		var link = function(scope, element, attrs){

		};

		return {
			restrict: 'E',
	        templateUrl: 'app/shared/components/al-menu/al-menu.template.html',
	        link: link,
			scope:{
				options:'=?source'
			}
		};

	};
	


	angular.module('alMenu', []).directive('alMenu',directive);
})();