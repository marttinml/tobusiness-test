/* global angular, Snap */

Snap.plugin(function (Snap, Element, Paper) {
    Paper.prototype.multitext = function (x, y, txt, max_width, attributes) {

        var svg = Snap();
        var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var temp = svg.text(0, 0, abc);
        temp.attr(attributes);
        var letter_width = temp.getBBox().width / abc.length;
        svg.remove();

        var words = txt.split(" ");
        var width_so_far = 0,
            current_line = 0,
            lines = [''];
        for (var i = 0; i < words.length; i++) {

            var l = words[i].length;
            if (width_so_far + (l * letter_width) > max_width) {
                lines.push('');
                current_line++;
                width_so_far = 0;
            }
            width_so_far += l * letter_width;
            lines[current_line] += words[i] + " ";
        }

        var t = this.text(x, y, lines).attr(attributes);
        t.selectAll("tspan:nth-child(n+2)").attr({
            dy: "1.2em",
            x: x
        });
        return t;
    };
});

(function () {
    var Directive = function ($vash, $paint, $shapes) {
        var Link = function (scope, element, attrs, ngModel) {

            scope.svg = Snap(element[0]);
            scope.width = 2000;
            scope.height = 6000;
            
            // Se configura el scope svg en $shapes
            $shapes.svg(scope.svg);
            // este factory crea cada una de las formas
            scope.$factory = $shapes.factory;
            
            // este service se encarga de decorar las formas
            scope.$paint = $paint;
            
            // Configura los procesos, agrega atributos de cada uno
            scope.settingProcesos = function (procesos) {
                var offsets = [{
                    x: 0,
                    y: 200
                }, {
                    x: 0,
                    y: 220
                }, {
                    x: 150,
                    y: 200
                }];
                var offsetsProcesos = [{
                    x: 0,
                    y: 200
                }, {
                    x: 0,
                    y: 0
                }, {
                    x: 0,
                    y: 0
                }];
                var width = 0;
                var height = 0;
                for (i in procesos) {

                    var proceso = procesos[i];
                    // offsetsProcesos[1].y = offsets[1].y - 170;
                    // offsetsProcesos[1].x = 10000;

                    for (j in procesos[i].capacidades) {
                        var capacidad = procesos[i].capacidades[j];
                        capacidad.offsets = [{
                            x: 0,
                            y: 0
                        }, {
                            x: 0,
                            y: 0
                        }, {
                            x: 0,
                            y: 0
                        }];

                        offsets[0].x = scope.config.layouts.initial[i].offset.x;
                        offsets[0].y = offsets[0].y;

                        console.log(offsets[0].x);

                        offsets[1].x = $vash.findOffsetInArray(scope.config.layouts.vertical, capacidad, 'areas').x;
                        offsets[1].y = offsets[1].y;

                        
                        offsets[2].y = $vash.findOffsetInArray(scope.config.layouts.horizontal, capacidad, 'aplicaciones').y + 40;

                        capacidad.offsets = JSON.parse(JSON.stringify(offsets));

                        offsets[0].y += 150;
                        offsets[1].y += 140;
                        offsets[2].x += 300;

                    }
                    offsets[0].y = 200;
                    offsets[1].y += 170;
                    //offsetsProcesos[0].x += 200;

                    proceso.offsets = JSON.parse(JSON.stringify(offsetsProcesos));
                    proceso = $vash.settingDimensionsToProcess(proceso,true);
                    proceso.offsets[0] = scope.config.layouts.initial[i].offset;
                    proceso.offsets[0].y = 45 + (proceso.height[0]/2);
                    //proceso.offsets[2].y += 170;
                }
            };
            
            // Crea el Layout 1
            scope.buildLayoutInitial = function () {
                var offset = {
                    x: 200,
                    y: 200
                };
                var width = 200;
                scope.config.layouts.initial = [];
                scope.layoutHorizontalGroup = scope.svg.group();
                for (i in scope.source) {
                    scope.config.layouts.initial[i] = {};
                    scope.config.layouts.initial[i].offset = JSON.parse(JSON.stringify(offset));
                    offset.x += width;
                }
            };
            
            // Crea el Layout 3
            scope.buildLayoutHorizontal = function () {
                
                var height = 250;
                var width = 50;
                var offset = {
                    x: 0,
                    y: height/2
                };
                scope.layoutHorizontalGroup = scope.svg.group();
                for (i in scope.config.layouts.horizontal) {
                    var rect, line, text;
                    rect = scope.$factory.rect(offset, width, height);
                    rect = scope.$paint.rectApplication(rect);
                    line = scope.$factory.line({
                        x: offset.x,
                        y: offset.y + ((height/2) - 1)
                    }, {
                        x: scope.width,
                        y: offset.y + ((height/2) - 1)
                    });
                    line = scope.$paint.lineApplication(line);
                    text = scope.$factory.text({
                        x: offset.x + (width / 2) - 10,
                        y: offset.y
                    }, height, scope.config.layouts.horizontal[i].text);
                    text = scope.$paint.textApplication(text);

                    var g = scope.svg.group(rect, line, text);
                    scope.layoutHorizontalGroup.append(g);
                    scope.config.layouts.horizontal[i].offset = JSON.parse(JSON.stringify(offset));;
                    offset.y += height;
                }

            };
            
            // Crear el Layout 2
            scope.buildLayoutVertical = function () {
                var height = 30;
                var width = 364;
                var offset = {
                    x: (width / 2),
                    y: (height / 2)
                };

                scope.layoutVerticalGroup = scope.svg.group();
                for (i in scope.config.layouts.vertical) {
                    var rect, line, text;
                    rect = scope.$factory.rect(offset, width, height);
                    rect = scope.$paint.rectApplication(rect);
                    line = scope.$factory.line({
                        x: offset.x + (width / 2),
                        y: offset.y - (height / 2)
                    }, {
                        x: offset.x + (width / 2),
                        y: scope.height
                    });
                    line = scope.$paint.lineApplication(line);
                    text = scope.$factory.textbox(offset, width - 40, height, scope.config.layouts.vertical[i].text, 16);
                    text = scope.$paint.textAreas(text);

                    var g = scope.svg.group(rect, line, text);
                    scope.layoutVerticalGroup.append(g);

                    var offsetCopy = JSON.parse(JSON.stringify(offset));
                    //offsetCopy.x = offsetCopy.x + (width/2);
                    scope.config.layouts.vertical[i].offset = offsetCopy;
                    offset.x += width;
                }
            };
            
            // Cambia los Layouts
            scope.config.changeLayoutSelect = function (layoutSelect) {
                scope.layoutVerticalGroup.attr({
                    visibility: "hidden"
                });
                scope.layoutHorizontalGroup.attr({
                    visibility: "hidden"
                });
                switch (layoutSelect) {
                case 0:
                    break;
                case 1:
                    scope.layoutVerticalGroup.attr({
                        visibility: "visible"
                    });
                    break;
                case 2:
                    scope.layoutHorizontalGroup.attr({
                        visibility: "visible"
                    });
                    break;
                default:
                    break;
                }
            };
            
            // Construye el diagrama de la Subcapacidad
            scope.buildSubCapacidad = function (subcapacidades, subcapacidad, offset) {

                var subCapacidadGroup = scope.svg.group();
                switch (subcapacidad.type) {
                case 'activity':
                    var activity,text;
                    activity = scope.$factory.rect(offset, 130, 80);
                    activity = scope.$paint.rectCapacidades(activity);
                    text = scope.$factory.textbox(offset, 130, 80, subcapacidad.text, 12);
                    subCapacidadGroup.append(activity).append(text);
                    activity.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    text.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    break;
                case 'if':
                    var rombo, text;
                    rombo = scope.$factory.rombo(offset, 130, 80);
                    text = scope.$factory.textbox(offset, 130, 80, subcapacidad.text, 12);
                    subCapacidadGroup.append(activity, text);
                    subCapacidadGroup.append(rombo).append(text);
                    rombo.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    text.data('offsets',[offset,offset,offset]).data('width',[130,130,130]).data('height',[80,80,80]);
                    break;
                case 'end':
                    var circle, textboxCircle;
                    circle = scope.$factory.circle(offset, 15);
                    circle = scope.$paint.circleEnd(circle);
                    textboxCircle = scope.$factory.textbox(offset, 30, 30, subcapacidad.text, 18);
                    textboxCircle = scope.$paint.fontColorWhite(textboxCircle);
                    subCapacidadGroup.append(circle).append(textboxCircle);
                    circle.data('offsets',[offset,offset,offset]).data('radio',[15,15,15]);
                    textboxCircle.data('offsets',[offset,offset,offset]).data('width',[30,30,30]).data('height',[30,30,30]);
                    break;
                default:
                    break;

                }
                return subCapacidadGroup;
            };
            
            // Construye las subcapacidades de cada capacidad
            scope.buildSubCapacidades = function (subcapacidades, offset) {

                var offsetSubcapacidad = JSON.parse(JSON.stringify(offset));
                var capacidadGroup = scope.svg.group();
                offsetSubcapacidad = {
                    x: offset.x,
                    y: (offset.y + 110)
                };

                var offsetBack = JSON.parse(JSON.stringify(offset));
                offsetBack.y += 50;
                var back = scope.$factory.rect(offsetBack, 150, 2);
                var backMask = scope.$factory.rect(offsetBack, 150, 2);

                back = scope.$paint.rectCapacidadesBack(back);
                capacidadGroup.append(back);
                capacidadGroup.attr({
                    mask: backMask
                });


                for (var i in subcapacidades) {
                    var g = scope.buildSubCapacidad(subcapacidades, subcapacidades[i], offsetSubcapacidad);
                    subcapacidades.offsets = [];
                    subcapacidades.offsets[1] = offsetSubcapacidad;
                    capacidadGroup.append(g);
                    offsetSubcapacidad.y += 100;
                }

                var height = 120;
                //back.attr({"height":height + "px"});
                backMask.attr({
                    "fill": "silver"
                });
                back.attr({
                    "height": height + "px"
                });

                if (subcapacidades.length > 1) {
                    height = (offsetSubcapacidad.y) - offsetBack.y - 50;
                    back.attr({
                        "height": height + "px"
                    });
                }

                // Setting Data
                back.data('offsets',[offset,offset,offset]).data('width',[150,150,150]).data('height',[height,height,height]);

                // backMask.animate({height: 0}, 10000);

                var obj = {
                    g: capacidadGroup,
                    height: height,
                    backMask: backMask
                };
                return obj;
            };

            // Construye la capacidad
            scope.buildCapacidad = function (capacidad, i, j) {
                var capacidadWidth = 150;
                var capacidadHeight = 100;
                var rect, textbox, rectFooterOffset, rectFooter, textboxFooter, intersection, arrow;

                var capacidadMainGroup = scope.svg.group();
                var capacidadGroup = scope.svg.group();

                if ((Number(j) + 1) < scope.source[i].capacidades.length) {
                    capacidad = $vash.intersectionFill(capacidad, scope.source[i].capacidades[(Number(j) + 1)], true);

                    var intersections = [];
                        intersections[0] = JSON.parse(JSON.stringify(capacidad.intersection[0]));
                        intersections[1] = JSON.parse(JSON.stringify(capacidad.intersection[1]));
                        intersections[2] = JSON.parse(JSON.stringify(capacidad.intersection[2]));

                    //var xys = JSON.parse(JSON.stringify(capacidad.intersection));

                    intersections[1][2].y = intersections[1][2].y - (capacidadHeight / 2) - 15;

                    var arr =  [
                            intersections[scope.config.layoutSelect][0].x, 
                            intersections[scope.config.layoutSelect][0].y, 
                            intersections[scope.config.layoutSelect][1].x, 
                            intersections[scope.config.layoutSelect][1].y, 
                            intersections[scope.config.layoutSelect][2].x, 
                            intersections[scope.config.layoutSelect][2].y, 
                            intersections[scope.config.layoutSelect][1].x, 
                            intersections[scope.config.layoutSelect][1].y, 
                            intersections[scope.config.layoutSelect][0].x, 
                            intersections[scope.config.layoutSelect][0].y
                        ];

                    
                    // var arr = [xys[0].x, xys[0].y, xys[1].x, xys[1].y, xys[2].x, xys[2].y, xys[1].x, xys[1].y, xys[0].x, xys[0].y];
                    intersection = scope.$factory.polyline(arr);
                        
                    var baseArrow = 12;
                        var offsetsArrow = [
                            intersections[0][2],
                            intersections[1][2],
                            intersections[2][2]
                        ];

                    arrow = scope.$factory.arrow(offsetsArrow[scope.config.layoutSelect], baseArrow);

                    // set intersections and offsets
                    intersection.data('intersections',intersections);
                    arrow.data('offsets',offsetsArrow).data('base',baseArrow);

                    capacidadGroup.append(intersection).append(arrow);
                }

                rect = scope.$factory.rect(capacidad.offsets[scope.config.layoutSelect], capacidadWidth, capacidadHeight);
                rect = scope.$paint.rectCapacidades(rect);
                textbox = scope.$factory.textbox(capacidad.offsets[scope.config.layoutSelect], capacidadWidth, capacidadHeight, capacidad.name, 14);


                rectFooterOffset    = {x:capacidad.offsets[scope.config.layoutSelect].x, y : capacidad.offsets[scope.config.layoutSelect].y + ((capacidadHeight/2)-10)};
                rectFooter          = scope.$factory.rect(rectFooterOffset, capacidadWidth, 20);
                rectFooter          = scope.$paint.rectCapacidadesFooter(rectFooter);
                textboxFooter       = scope.$factory.textbox(rectFooterOffset, capacidadWidth,20,capacidad.aplicaciones[0].name,12);
                textboxFooter       = scope.$paint.fontColorWhite(textboxFooter);

                // Setting data
                rect.data('offsets',capacidad.offsets).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[capacidadHeight,capacidadHeight,capacidadHeight]);
                textbox.data('offsets',capacidad.offsets).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[capacidadHeight,capacidadHeight,capacidadHeight]);
                rectFooter.data('offsets',rectFooterOffset).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[20,20,20]);
                textboxFooter.data('offsets',rectFooterOffset).data('width',[capacidadWidth,capacidadWidth,capacidadWidth]).data('height',[20,20,20]);

                capacidadGroup.append(rect).append(textbox).append(rectFooter).append(textboxFooter);
                capacidadMainGroup.append(capacidadGroup);
                var obj = {};

                if (capacidad.subcapacidades.length) {
                    obj = scope.buildSubCapacidades(capacidad.subcapacidades, capacidad.offsets[scope.config.layoutSelect]);
                    capacidadMainGroup.append(obj.g);

                }
                obj.rect = rect;
                obj.gCapacidad = capacidadMainGroup;

                return obj;
            };
            
            // Construye las capacidades de cada proceso
            scope.buildProcesses = function () {

                scope.procesosGroup = scope.svg.group();
                scope.objss = [];
                scope.prccessArr = [];

                for (i in scope.source) {
                    var intersection;
                    var proceso = scope.source[i];
                    var procesoGroup = scope.svg.group();
                    var procesoTituloGroup = scope.svg.group();
                    var procesoCapacidadesGroup = scope.svg.group();

                    if ((Number(i) + 1) < scope.source.length) {
                        proceso = $vash.intersectionFill(proceso, scope.source[Number(i) + 1],true);

                        var intersections = [];
                        intersections[0] = JSON.parse(JSON.stringify(proceso.intersection[0]));
                        intersections[1] = JSON.parse(JSON.stringify(proceso.intersection[1]));
                        intersections[2] = JSON.parse(JSON.stringify(proceso.intersection[2]));

                        //setting last arrow 1
                        intersections[1][2].y = intersections[1][2].y - (scope.source[Number(i) + 1].height[scope.config.layoutSelect] / 2) - 15;

                        var arr =  [
                            intersections[scope.config.layoutSelect][0].x, 
                            intersections[scope.config.layoutSelect][0].y, 
                            intersections[scope.config.layoutSelect][1].x, 
                            intersections[scope.config.layoutSelect][1].y, 
                            intersections[scope.config.layoutSelect][2].x, 
                            intersections[scope.config.layoutSelect][2].y, 
                            intersections[scope.config.layoutSelect][1].x, 
                            intersections[scope.config.layoutSelect][1].y, 
                            intersections[scope.config.layoutSelect][0].x, 
                            intersections[scope.config.layoutSelect][0].y
                        ];
                        
                        intersection = scope.$factory.polyline(arr);
                        
                        var baseArrow = 12;
                        var offsetsArrow = [
                            intersections[0][2],
                            intersections[1][2],
                            intersections[2][2]
                        ];

                        arrow = scope.$factory.arrow(offsetsArrow[scope.config.layoutSelect], baseArrow);
                        
                        // set intersections and offsets
                        intersection.data('intersections',intersections);
                        arrow.data('offsets',offsetsArrow).data('base',baseArrow);

                        procesoGroup.append(intersection).append(arrow);
                    }

                    // proceso figures
                    var rectProceso, rectProcesoHeader, textbox, circle, textboxCircle; 
                    
                    rectProceso = scope.$factory.rect(proceso.offsets[scope.config.layoutSelect], proceso.width[scope.config.layoutSelect], proceso.height[scope.config.layoutSelect]);
                    rectProceso = scope.$paint.rectProceso(rectProceso);
                    var offsetHeader = [];
                    offsetHeader[0] = {
                        x: proceso.offsets[0].x,
                        y: proceso.offsets[0].y - (proceso.height[0] / 2) + 45
                    };
                    offsetHeader[1] = {
                        x: proceso.offsets[1].x,
                        y: proceso.offsets[2].y - (proceso.height[1] / 2) + 45
                    };
                    offsetHeader[2] = {
                        x: proceso.offsets[2].x,
                        y: proceso.offsets[2].y - (proceso.height[2] / 2) + 45
                    };

                    rectProcesoHeader = scope.$factory.rect(offsetHeader[scope.config.layoutSelect], proceso.width[scope.config.layoutSelect], 90);
                    rectProcesoHeader = scope.$paint.rectProcesoHeader(rectProcesoHeader);


                    var offsetHeaderText = [];
                    offsetHeaderText[0] = {
                        x: offsetHeader[0].x - (proceso.width[0] / 2) + 45,
                        y: offsetHeader[0].y
                    };
                    offsetHeaderText[1] = {
                        x: offsetHeader[1].x - (proceso.width[1] / 2) + 45,
                        y: offsetHeader[1].y
                    };
                    offsetHeaderText[2] = {
                        x: offsetHeader[2].x - (proceso.width[2] / 2) + 45,
                        y: offsetHeader[2].y
                    };

                    var textboxWidth = proceso.width[scope.config.layoutSelect] - 50;
                    textbox = scope.$factory.textbox(offsetHeaderText[scope.config.layoutSelect], textboxWidth, 90, proceso.name, 14);
                    textbox = scope.$paint.textLeft(textbox);

                    var offsetHeaderCircle = JSON.parse(JSON.stringify(offsetHeaderText));
                    offsetHeaderCircle[0].x -= 20;
                    offsetHeaderCircle[1].x -= 20;
                    offsetHeaderCircle[2].x -= 20;

                    circle = scope.$factory.circle(offsetHeaderCircle[scope.config.layoutSelect], 15);
                    circle = scope.$paint.circleEnd(circle);
                    textboxCircle = scope.$factory.textbox(offsetHeaderCircle[scope.config.layoutSelect], 30, 30, (Number(i) + 1) + "", 18);
                    textboxCircle = scope.$paint.fontColorWhite(textboxCircle);


                    // Setting data
                    rectProceso.data('offsets',proceso.offsets).data('width',proceso.width).data('height',proceso.height);
                    rectProcesoHeader.data('offsets',offsetHeader).data('width',proceso.width).data('height',[90,90,90]);
                    textbox.data('offsets',offsetHeaderText).data('width',proceso.width).data('height',[90,90,90]);
                    circle.data('offsets',offsetHeaderCircle).data('radio',[15,15,15]);
                    textboxCircle.data('offsets',offsetHeaderCircle).data('width',[30,30,30]).data('height',[30,30,30]);

                    procesoGroup.append(rectProceso);
                    procesoTituloGroup.append(rectProcesoHeader).append(textbox).append(circle).append(textboxCircle);

                    var objs = [];
                    for (j in scope.source[i].capacidades) {
                        var obj = {};
                        var capacidad = scope.source[i].capacidades[j];
                        obj = scope.buildCapacidad(capacidad, i, j);
                        procesoCapacidadesGroup.append(obj.gCapacidad);


                        // Event
                        if (capacidad.subcapacidades.length) {
                            obj.rect.data("flag", false);
                            obj.rect.data("i", i);
                            obj.rect.data("j", j);
                            obj.rect.click(scope.capacidadClick);
                        }

                        objs[j] = obj;
                    }

                    scope.prccessArr.push(procesoGroup);
                    scope.objss[i] = objs;
                    procesoGroup.append(procesoTituloGroup).append(procesoCapacidadesGroup);
                    scope.procesosGroup.append(procesoGroup);
                }

            };
            
            // Agrega el evento click a cada capacidad
            scope.capacidadClick = function () {
                var i = this.data("i");
                var j = this.data("j");
                var flag = this.data("flag");
                var thisProcess = scope.procesosGroup.children()[i].children()[2];
                var processLength = scope.procesosGroup.children().length;

                console.log(scope.procesosGroup.children()[i].children()[2]);

                if (flag) {
                    scope.objss[i][j].backMask.animate({
                        height: 0
                    }, 300);
                    thisProcess.animate({
                        height: thisProcess.data("height")
                    }, 300);

                    for (var x = Number(i) + 1; x < processLength; x++) {
                        console.log(x);
                        scope.prccessArr[x].animate({transform:"t0,0"},300);
                    }

                } else {
                    scope.objss[i][j].backMask.animate({
                        height: scope.objss[i][j].height
                    }, 300);
                    var baseHeight = thisProcess.node.height.baseVal.value;
                    var heightTransform = baseHeight + scope.objss[i][j].height;
                    thisProcess.data("height", baseHeight);
                    thisProcess.animate({
                        height: heightTransform
                    }, 300);

                    for (var x = Number(i) + 1; x < processLength; x++) {
                        console.log(x);
                        scope.prccessArr[x].animate({transform:"t0,"+scope.objss[i][j].height},300);
                    }


                }
                this.data("flag", !flag);
            };
            
            // Router de Layouts
            scope.buildLayouts = function () {
                scope.buildLayoutInitial();
                scope.buildLayoutHorizontal();
                scope.buildLayoutVertical();
            };
            
            // Construye los procesos
            scope.buildProcesos = function () {
                scope.buildProcesses();
            };
            
            // Inicializa la pantalla
            scope.init = function () {
                scope.buildLayouts();
                scope.config.changeLayoutSelect(scope.config.layoutSelect);
            };
            
            // Cambia el JSON que cambia el contenido del SVG
            scope.reset = function () {
                scope.settingProcesos(scope.source);
                scope.buildProcesos();
            };

            scope.init();

            scope.$watch('source', function (newValue, oldValue) {
                if (scope.source.length) {
                    scope.reset();
                }
            });
            

        };
        return {
            restrict: 'A',
            link: Link,
            require: '?ngModel',
            scope: {
                source: '=set',
                config: '=config',

            }
        };
    };
    angular
        .module('ngWays', [])
        .directive('ngWays', Directive);
})();