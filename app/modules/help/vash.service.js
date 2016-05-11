/* global angular */

(function () {

    var service = function () {

        var self = this;


        self.findOffsetInArray = function (arr, capacity, searchIn, searchBy) {

            var offset = {};

            searchIn = searchIn || '';
            searchBy = searchBy || 'name';

            var textInTheArray = '';
            var textToMatch = '';

            if (searchIn !== '') {
                if ( capacity[searchIn] !== undefined && capacity[searchIn].length) {
                    
                    // Search In: Array
                    for (var k in arr) {
                        textInTheArray = arr[k].text;
                        for (var l in capacity[searchIn]) {
                            textToMatch = capacity[searchIn][l][searchBy];
                            if (textToMatch !== undefined &&
                                textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {

                                offset = arr[k].offset;
                            }
                        }
                    }
                } else {
                    // Search In: Object
                    for (var j in arr) {
                        textInTheArray = arr[j].text;
                        if(capacity[searchIn]){
                            textToMatch = capacity[searchIn][searchBy];
                            if (textToMatch !== undefined &&
                                textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                                offset = arr[j].offset;
                            }
                        }

                    }
                }
            } else {
                // Search By
                for (var i in arr) {
                    textInTheArray = arr[i].text;
                    textToMatch = capacity[searchBy];

                    if (textToMatch !== undefined &&
                        textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                        offset = arr[i].offset;
                    }
                }

            }

            return offset;
        };
        
        
        self.intersectionFill = function(first, second) {
            var intersectionArray = [];
            
            intersectionArray[0] = first.offsets[0];
            intersectionArray[1] = {};
            intersectionArray[2] = second.offsets[0];
            
            
            var x0 = first.offsets[0].x;
            var y0 = first.offsets[0].y;
            
            var x1 = second.offsets[0].x;
            var y1 = second.offsets[0].y;
            
            // Verifica si es vertical
            
            if (x0 == x1) {
                if (y0 == y1) {
                    intersectionArray[1] = {
                        x: x0,
                        y: y1
                    };
                } else {
                    intersectionArray[1] = {
                        x: x0,
                        y: y1 / 2
                    };
                }
            } 
            // Verifica si es horizontal
            else {
                // Verifica si es horizontal a la derecha
                if (y0 == y1) {
                    intersectionArray[1] = {
                        x: x1 / 2,
                        y: y0
                    };
                }
                // Verifica si es horizontal y hacia abajo
                else {
                    intersectionArray[1] = {
                        x:x0,
                        y:y1
                    };
                }
            }
            
            first.intersection = intersectionArray;
            
            return first;
        };

        return self;
    };
    

    angular
        .module('mVash', [])
        .service('$vash', service);

})();