/* global angular */

(function () {

    var service = function () {

        var self = this;
        

        self.findOffsetInArray = function (arr, capacity, searchBy) {
            
            this.offset = {};
            this.searchBy = searchBy || 'name';
            
            for (var i in arr) {
                var text = arr[i].text;
                var ctext = capacity[this.searchBy];
                
                if (ctext !== undefined &&
                    ctext.toUpperCase() == text.toUpperCase()) {
                    this.offset = arr[i].offset;
                }
                
            }
            
            return this.offset;
        };
        
        
        

        return self;
    };

    angular
        .module('mVash', [])
        .service('$vash', service);

})();