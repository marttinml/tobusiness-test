(function(){
	var service = function($appService){
		// API REST methods
		var mainMethod;
		// properties
		this.data = {};
		this.carriers = [];
		// constructor
        this.init = function(){
        	mainMethod 			= 'tiempoaire';
        	this.data.carrier 		= null;
			this.data.amount 		= null;
			this.data.phoneNumber 	= '';
			this.data.phoneNumberComfirm = '';
	        this.carriers[0] 		= {name:'Iusacell',montos:[{monto:1},{monto:20},{monto:30},{monto:50},{monto:100},{monto:200},{monto:300},{monto:500},{monto:1000}]};
	        this.carriers[1] 		= {name:'Unefon'  ,montos:[{monto:2},{monto:20},{monto:30},{monto:50},{monto:100},{monto:200},{monto:300},{monto:500},{monto:1000}]};
	        this.carriers[2] 		= {name:'Telcel'  ,montos:[{monto:3},{monto:20},{monto:30},{monto:50},{monto:100},{monto:200},{monto:300},{monto:500},{monto:1000}]};
	        this.carriers[3] 		= {name:'Movistar',montos:[{monto:4},{monto:20},{monto:30},{monto:50},{monto:100},{monto:200},{monto:300},{monto:500},{monto:1000}]};
	        this.carriers[4] 		= {name:'Virgin'  ,montos:[{monto:5},{monto:20},{monto:30},{monto:50},{monto:100},{monto:200},{monto:300},{monto:500},{monto:1000}]};
        };
        // parser
        this.parseData = function(){
        	var data = {};
			data.carrier 		= this.carriers[this.data.carrier];
			data.amount  		= this.carriers[this.data.carrier].montos[this.data.amount];
			data.phoneNumber  	= this.data.phoneNumber;
			return data;
        };
        // validation
		this.isValid = function(){
			return true;
		};
		this.isValidPhoneNumber = function(){
			return (this.data.phoneNumber !== null &&
			 		this.data.phoneNumber.length === 10 &&
			 		this.data.phoneNumber === this.data.phoneNumberComfirm);
		};
		// Do
		this.do = function(){
			console.log(this.parseData());
			this.init();
			//return isValid() && $appService.post(mainMethod,this.data);
		};
		// ejecute constructor
		this.init();

		return this;
	};
	angular.module('Tiempoaire').service('$tiempoaire',service);
})();