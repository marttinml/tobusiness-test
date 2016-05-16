/* global angular */

(function () {

    var service = function () {

        var self = this;

        //filter: scope.svg.filter(Snap.filter.shadow(0, 3, 3, '#000', 0.3))

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
            var x0, y0, x1, y1;

            if (matrix) {
                for (var off in first.offsets) {

                    intersectionArray[off][0] = first.offsets[off];
                    intersectionArray[off][1] = {};
                    intersectionArray[off][2] = second.offsets[off];

                    x0 = first.offsets[off].x;
                    y0 = first.offsets[off].y;

                    x1 = second.offsets[off].x;
                    y1 = second.offsets[off].y;

                    // Verifica si es vertical
                    if (x0 == x1) {

                        if (y0 >= y1) {
                            direction = 'down';
                        } else {
                            direction = 'up';
                        }

                        if (y0 == y1) {
                            intersectionArray[off][1] = {
                                x: x0,
                                y: y1
                            };
                        } else {
                            intersectionArray[off][1] = {
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
                            intersectionArray[off][1] = {
                                x: ((x1 - x0) / 2) + x0,
                                y: y0
                            };
                        } else {
                            if (y0 > y1) {
                                intersectionArray[off][1] = {
                                    x: x0,
                                    y: y1
                                };
                            } else {
                                intersectionArray[off][1] = {
                                    x: x1,
                                    y: y0
                                };
                            }
                        }
                    }

                }

            } else {
                intersectionArray[0] = first.offsets[positionOfArray];
                intersectionArray[1] = {};
                intersectionArray[2] = second.offsets[positionOfArray];
                x0 = first.offsets[positionOfArray].x;
                y0 = first.offsets[positionOfArray].y;

                x1 = second.offsets[positionOfArray].x;
                y1 = second.offsets[positionOfArray].y;

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



        self.settingDimensionsToProcess = function (proceso, matrix) {
            if (matrix) {
                if (proceso.capacidades !== undefined && proceso.capacidades.length) {
                    
                    // Encuentra el primero y el último
                    var first, last;
                    for (var i in proceso.capacidades) {
                        if (i == 0) {
                            first = proceso.capacidades[i].offsets[1];
                        }
                        if (i == (proceso.capacidades.length - 1)) {
                            last = proceso.capacidades[i].offsets[1];
                        }
                    }
                    
                    var first0, last0;
                    for (var i0 in proceso.capacidades) {
                        if (i0 == 0) {
                            first0 = proceso.capacidades[i0].offsets[0];
                        }
                        if (i0 == (proceso.capacidades.length - 1)) {
                            last0 = proceso.capacidades[i0].offsets[0];
                        }
                    }
                    
                    var first2, last2;
                    for (var i2 in proceso.capacidades) {
                        if (i2 == 0) {
                            first2 = proceso.capacidades[i2].offsets[2];
                        }
                        if (i2 == (proceso.capacidades.length - 1)) {
                            last2 = proceso.capacidades[i2].offsets[2];
                        }
                    }

                    // Alto y ancho
                    var height = last.y - first.y + 220;
                    var width = last.x - first.x + 182;
                    
                    var height0 = last0.y - first0.y + 220;
                    var width0 = last0.x - first0.x + 182;
                    
                    var height2 = last2.y - first2.y + 220;
                    var width2 = last2.x - first2.x + 182;


                    // Extremos Y
                    var extremosY = {
                        first: first.y + 160,
                        last: last.y + 70
                    };
                    
                    var extremosY0 = {
                        first: first0.y + 160,
                        last: last0.y + 70
                    };
                    
                    var extremosY2 = {
                        first: first2.y + 160,
                        last: last2.y + 70
                    };
                    
                    // Offset Y
                    var offsetY = first.y + ((extremosY.last - extremosY.first) / 2);
                    
                    var offsetY0 = first0.y + ((extremosY0.last - extremosY0.first) / 2);
                    
                    var offsetY2 = first2.y + ((extremosY2.last - extremosY2.first) / 2);


                    // Extremos X, Offset X
                    var offsetX, extremosX;
                    
                    var offsetX0, extremosX0;
                    
                    var offsetX2, extremosX2;

                    if (last.x != first.x) {
                        if (last.x > first.x) {
                            extremosX = {
                                first: first.x + 95,
                                last: last.x + 95
                            };
                            offsetX = first.x + ((extremosX.last - extremosX.first) / 2);
                        } else {
                            extremosX = {
                                first: first.x + 95,
                                last: last.x + 95
                            };
                            offsetX = first.x + ((extremosX.first - extremosX.last) / 2);
                        }
                    } else {
                        offsetX = last.x;
                    }
                    
                    
                    if (last0.x != first0.x) {
                        if (last0.x > first0.x) {
                            extremosX0 = {
                                first: first0.x + 95,
                                last: last0.x + 95
                            };
                            offsetX0 = first0.x + ((extremosX0.last - extremosX0.first) / 2);
                        } else {
                            extremosX0 = {
                                first: first0.x + 95,
                                last: last0.x + 95
                            };
                            offsetX0 = first0.x + ((extremosX0.first - extremosX0.last) / 2);
                        }
                    } else {
                        offsetX0 = last0.x;
                    }
                    
                    
                    
                    if (last2.x != first2.x) {
                        if (last2.x > first2.x) {
                            extremosX2 = {
                                first: first2.x + 95,
                                last: last2.x + 95
                            };
                            offsetX2 = first2.x + ((extremosX2.last - extremosX2.first) / 2);
                        } else {
                            extremosX2 = {
                                first: first2.x + 95,
                                last: last2.x + 95
                            };
                            offsetX2 = first2.x + ((extremosX2.first - extremosX2.last) / 2);
                        }
                    } else {
                        offsetX2 = last2.x;
                    }

                    // Offset Principal
                    var mainOffset = {
                        x: offsetX,
                        y: offsetY
                    };
                    
                    var mainOffset0 = {
                        x: offsetX0,
                        y: offsetY0
                    };
                    
                    var mainOffset2 = {
                        x: offsetX2,
                        y: offsetY2
                    };
                    

                    
                    proceso.offsets[1] = mainOffset;
                    proceso.offsets[0] = mainOffset0;
                    proceso.offsets[2] = mainOffset2;
                    proceso.width = [width0, width, width2];
                    proceso.height = [height0, height, height2];
                    

                    return proceso;
                }
            } else {
                if (proceso.capacidades !== undefined && proceso.capacidades.length) {

                    // Encuentra el primero y el último
                    var first, last;

                    for (var i in proceso.capacidades) {
                        if (i == 0) {
                            first = proceso.capacidades[i].offsets[1];
                        }
                        if (i == (proceso.capacidades.length - 1)) {
                            last = proceso.capacidades[i].offsets[1];
                        }
                    }

                    // Alto y ancho
                    var height = last.y - first.y + 220;
                    var width = last.x - first.x + 182;


                    // Extremos Y
                    var extremosY = {
                        first: first.y + 160,
                        last: last.y + 70
                    };
                    // Offset Y
                    var offsetY = first.y + ((extremosY.last - extremosY.first) / 2);


                    // Extremos X, Offset X
                    var offsetX, extremosX;

                    if (last.x != first.x) {
                        if (last.x > first.x) {
                            extremosX = {
                                first: first.x + 95,
                                last: last.x + 95
                            };
                            offsetX = first.x + ((extremosX.last - extremosX.first) / 2);
                        } else {
                            extremosX = {
                                first: first.x + 95,
                                last: last.x + 95
                            };
                            offsetX = first.x + ((extremosX.first - extremosX.last) / 2);
                        }
                    } else {
                        offsetX = last.x;
                    }

                    // Offset Principal
                    var mainOffset = {
                        x: offsetX,
                        y: offsetY
                    };

                    proceso.offsets[1] = mainOffset;
                    proceso.width = width;
                    proceso.height = height;

                    return proceso;
                }
            }

        };


        self.getElementsTransformY = function (arrayProcesos, capacidad) {

            var indexProcesoComienzo = 0;
            var indexCapacidadComienzo = 0;

            //Buscamos el index en procesos y capacidades respecto a la capacidad elegida

            for (var i in arrayProcesos) {
                var proceso = arrayProcesos[i];
                for (var j in proceso.capacidades) {

                    var capacidadElegida = capacidad.name;
                    var capacidadEncontrada = proceso.capacidades[j].name;

                    if (capacidadEncontrada == capacidadElegida) {
                        indexProcesoComienzo = (Number(i));
                        indexCapacidadComienzo = (Number(j));
                    }
                }
            }


            // Se crea el objeto a regresar, vacío por defecto

            var arrayRetorno = {
                procesos: [],
                capacidades: [],
                index: [indexProcesoComienzo, indexCapacidadComienzo],
                indexProceso: indexProcesoComienzo,
                indexCapacidad: indexCapacidadComienzo
            };

            for (var k = (indexProcesoComienzo + 1); k < arrayProcesos.length; k++) {
                arrayRetorno.procesos.push(arrayProcesos[k]);
            }

            for (var l = (indexCapacidadComienzo + 1); l < arrayProcesos[(indexProcesoComienzo)].capacidades.length; l++) {
                arrayRetorno.capacidades.push(arrayProcesos[(indexProcesoComienzo)].capacidades[l]);
            }

            return arrayRetorno;
        };


        return self;
    };


    angular
        .module('mVash', [])
        .service('$vash', service);

})();