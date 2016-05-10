(function(){


	var directive = function($swipe){
		
		var link = function(scope, element, attrs){
			element.addClass('disable-select');
		};

		return {
			restrict: 'E',
	        templateUrl: 'app/shared/components/al-footer/al-footer.template.html',
	        link: link,
			scope:{
				options:'=?source'
			}
		};

	};
	


	angular.module('alFooter', []).directive('alFooter',directive);
})();