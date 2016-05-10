(function(){


	var directive = function(){
		
		var link = function(scope, element, attrs, ngModelCtrl){
			scope.maskModel = '';
			scope.realValue = '';
			scope.keyDelete = false;

			scope.transformPush = function(){
				var mmLength = scope.maskModel.length;
				var vvLength = ngModelCtrl.$viewValue.length;
				scope.realValue +=  ngModelCtrl.$viewValue.substring(mmLength, vvLength);
				scope.maskModel = '';
				var ii = 0;
				for(var i = 0 ; i < ngModelCtrl.$viewValue.length; i++){
					switch(attrs.ngMask[i]){
						case '0':
							scope.maskModel += scope.realValue[ii]; 
							break;
						case ' ':
							scope.maskModel += attrs.ngMask[i+1] == '0' ? ' '+scope.realValue[ii] : ' '+attrs.ngMask[i+1];
							i++;
							break;
						case '/':
							scope.maskModel += attrs.ngMask[i+1] == '0' ? '/'+scope.realValue[ii] : '/'+attrs.ngMask[i+1];
							i++;
							break;
						default: scope.maskModel += attrs.ngMask[i]; break;
					}
					ii++;
				}

				ngModelCtrl.$setViewValue(scope.maskModel);
				ngModelCtrl.$render();
				scope.ngRealValue = scope.realValue;
			};

			scope.transformPop = function(){
				var isLast = false;
				var ii = 0;
				scope.maskModel = '';
				for(var i = 0 ; i < ngModelCtrl.$viewValue.length; i++){
					isLast = (i + 1) == ngModelCtrl.$viewValue.length ? true : false;
					switch(attrs.ngMask[i]){
						case '0':
							scope.maskModel += scope.realValue[ii];
							break;
						case ' ':
							scope.maskModel += !isLast ? ' ' : '';
							ii--;
							break;
						case '/':
							scope.maskModel += !isLast ? '/' : '';
							ii--;
							break;
						default:
							scope.maskModel += attrs.ngMask[i];
							break;
					}
					ii++;
				}

				scope.realValue = scope.realValue.substring(0,ii);
				ngModelCtrl.$setViewValue(scope.maskModel);
				ngModelCtrl.$render();
				scope.ngRealValue = scope.realValue;
			};

			scope.keydown = function(event){
				if(event.which == 8){
					scope.keyDelete = true;
				}else{
					scope.keyDelete = false;
					if(attrs.ngMask.length == ngModelCtrl.$viewValue.length){
						event.preventDefault();
					}
				}

			};
			scope.keyup = function(event){
				if(!scope.keyDelete){
					scope.transformPush();
					scope.keyDelete = false;
					console.log('typing...');
				}else{
					scope.transformPop();
				}
			};

			element.bind('keydown',scope.keydown);
			element.bind('keyup',scope.keyup);
		};

		return {
			restrict: 'A',
			require: 'ngModel',
        	replace: true,
	        link: link,
			scope:{
				ngRealValue:'=ngRealValue'
			}
		};

	};
	


	angular.module('NgMask', []).directive('ngMask',directive);
})();