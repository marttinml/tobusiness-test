/* global angular */

(function () {

    var service = function () {

        var self = this;


        self.findOffsetInArray = function (arr, capacity, searchIn, searchBy) {

            this.offset = {};
            this.searchIn = searchIn || '';
            this.searchBy = searchBy || 'name';

            var textInTheArray = '';
            var textToMatch = '';

            if (this.searchIn !== '') {
                if (capacity[this.searchIn].length) {
                    // Search In: Array
                    for (var k in arr) {
                        textInTheArray = arr[k].text;
                        for (var l in capacity[this.searchIn]) {
                            textToMatch = capacity[this.searchIn][l][this.searchBy];
                            if (textToMatch !== undefined &&
                                textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                                this.offset = arr[k].offset;
                            }
                        }
                    }
                } else {
                    // Search In: Object
                    for (var j in arr) {
                        textInTheArray = arr[j].text;
                        textToMatch = capacity[this.searchIn][this.searchBy];
                        if (textToMatch !== undefined &&
                            textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                            this.offset = arr[j].offset;
                        }
                    }
                }
            } else {
                // Search By
                for (var i in arr) {
                    textInTheArray = arr[i].text;
                    textToMatch = capacity[this.searchBy];

                    if (textToMatch !== undefined &&
                        textToMatch.toUpperCase() == textInTheArray.toUpperCase()) {
                        this.offset = arr[i].offset;
                    }
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