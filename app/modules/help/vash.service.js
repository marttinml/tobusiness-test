/* global angular */

(function () {

    var service = function () {

        var self = this;

        /* 
            findOffsetInArray() 
            PARAMS
            - arreglo de coordenadas con nombre [{nombre, offset}]
            - capacidad que buscamos {nombre, aplicaciones, kpis, ...}
            - busqueda en determinado lugar (areas, aplicaciones, ...)
            - busqueda por determinado atributo (name, title, text, ...)
            RETURN
            - offset {x, y}
        */
        self.findOffsetInArray = function (arr, capacity, searchIn, searchBy) {

            var offset = {};

            searchIn = searchIn || '';
            searchBy = searchBy || 'name';

            var textInTheArray = '';
            var textToMatch = '';

            if (searchIn !== '') {
                if (capacity[searchIn] !== undefined && capacity[searchIn].length) {

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
                        if (capacity[searchIn]) {
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

        /* 
            intersectionFill() 
            PARAMS
            - capacidad 1 {nombre, aplicaciones, kpis, ...}
            - capacidad 2 {nombre, aplicaciones, kpis, ...}
            RETURN 
            - capacidad 1 {nombre, aplicaciones, kpis, ...} + direction:String, intersection:Array[Array]
        */
        self.intersectionFill = function (first, second, matrix) {
            var intersectionArray = [[], [], []];
            var direction = 'down';
            var positionOfArray = 1;


            //console.log(first.offsets)


            if (matrix) {
                for (var off in first.offsets) {

                    intersectionArray[off][0] = first.offsets[off];
                    intersectionArray[off][1] = {};
                    intersectionArray[off][2] = second.offsets[off];

                }
                console.log(intersectionArray);
            } else {
                intersectionArray[0] = first.offsets[positionOfArray];
                intersectionArray[1] = {};
                intersectionArray[2] = second.offsets[positionOfArray];
                var x0 = first.offsets[positionOfArray].x;
                var y0 = first.offsets[positionOfArray].y;

                var x1 = second.offsets[positionOfArray].x;
                var y1 = second.offsets[positionOfArray].y;

                // Verifica si es vertical
                if (x0 == x1) {

                    if (y0 >= y1) {
                        direction = 'down';
                    } else {
                        direction = 'up';
                    }

                    if (y0 == y1) {
                        intersectionArray[1] = {
                            x: x0,
                            y: y1
                        };
                    } else {
                        intersectionArray[1] = {
                            x: x0,
                            y: ((y1 - y0) / 2) + y0
                        };
                    }
                }
                // Verifica si es horizontal
                else {
                    if (x0 <= x1) {
                        direction = 'right';
                    } else {
                        direction = 'left';
                    }

                    if (y0 == y1) {
                        intersectionArray[1] = {
                            x: ((x1 - x0) / 2) + x0,
                            y: y0
                        };
                    } else {
                        if (y0 > y1) {
                            intersectionArray[1] = {
                                x: x0,
                                y: y1
                            };
                        } else {
                            intersectionArray[1] = {
                                x: x1,
                                y: y0
                            };
                        }
                    }
                }
            }

            first.intersection = intersectionArray;
            first.direction = direction;

            return first;
        };

        return self;
    };


    angular
        .module('mVash', [])
        .service('$vash', service);

})();