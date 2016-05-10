/* global angular */

(function () {

    var service = function () {

        var self = this;


        self.findOffsetInArray = function (arr, capacity, searchIn, searchBy) {

            var offset = {};

            var searchIn = searchIn || '';
            var searchBy = searchBy || 'name';

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
            console.log(offset);

            return offset;
        };

        return self;
    };

    angular
        .module('mVash', [])
        .service('$vash', service);

})();