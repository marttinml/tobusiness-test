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
    var Directive = function ($vash) {
        var Link = function (scope, element, attrs, ngModel) {
    
            // scope.$factory = function (obj,index,last) {
            //     var x = scope.offset.x;
            //     var y = scope.offset.y;

            //     var factoryRect = function () {
            //         var xt = x - (scope.figuresWidth / 2);
            //         var yt = y;
            //         var rect = scope.svg.rect(xt, yt, scope.figuresWidth, scope.figuresHeight);
            //         rect.attr({
            //             fill: "rgb(100,100,100)",
            //             stroke: "#979797",
            //             strokeWidth: 0.5
            //         });
            //         return rect;
            //     };

            //     var factotyRombo = function () {
            //         var p1 = {x:x,y:y};
            //         var p2 = {x:x+(scope.figuresWidth/2), y:y + (scope.figuresHeight/2)};
            //         var p3 = {x:x, y:  y + scope.figuresHeight};
            //         var p4 = {x:x - (scope.figuresWidth/2) , y:y + (scope.figuresHeight / 2)};

            //         var pathStr = "M" + p1.x + " " + p1.y + " L" + p2.x + " " + p2.y + " L" + p3.x + " " + p3.y + " L" + p4.x + " " + p4.y + " Z";
            //         var path = scope.svg.path(pathStr);
                
            //         path.attr({
            //             fill: "rgb(240, 240, 240)",
            //             stroke: "#979797",
            //             strokeWidth: 1
            //         });
            //         return path;
            //     };

            //     var factoryText = function () {
            //         var text = scope.svg.multitext(x, y, scope.beforeIndex+'.'+index+' '+obj.text, scope.figuresWidth, {
            //             "text-anchor": "middle",
            //             'font-size': '10px'
            //         });
            //         console.log(text.node.clientHeight);
            //         console.log(text);
            //         var yt = (y +(scope.figuresHeight / 2) - (text.node.clientHeight / 2))+10;
            //         text.attr({ y: yt});
            //         return text;
            //     };

            //     var factoryJoinTo = function(){
            //         var xt1 = x;
            //         var yt1 = y + scope.figuresHeight;
            //         var xt2 = x;
            //         var yt2 = y + scope.figuresHeight + (scope.marginBetweenFigures - 3);
            //         var arr = [xt1,yt1,xt2,yt2];
            //         factoryPolyline(arr);
            //     };
            //     var factoryPolyline = function (arr) {
            //         if(!last){
            //             console.log(arr);
            //             var polyline = scope.svg.polyline(arr);
            //             polyline.attr({
            //                 fill: "rgb(100,100,100)",
            //                 stroke: "rgb(100,100,100)",
            //                 strokeWidth: 1
            //             });
            //             // factotyArrow();
            //             return polyline;
            //         }
            //     };

            //     switch (obj.type) {
            //         case 'activity':
            //             factoryRect();
            //             factoryJoinTo();
            //             factoryText();
            //             // factoryPolyline();
            //             scope.offset.y += (scope.figuresHeight + scope.marginBetweenFigures);
            //             break;
            //         case 'if':
            //             factotyRombo();
            //             factoryJoinTo();
            //             factoryText();
            //             // scope.coordinates.y += 85;
            //             scope.offset.y += (scope.figuresHeight + scope.marginBetweenFigures);
            //             break;
            //         case 'end':
            //             // factoryCircle();
            //             // var text = factoryTextEnd();
            //             // scope.coordinates.y += 45;
            //             break;
            //         default:
            //             break;
            //         }
            //     }

            // scope.svg = Snap(element[0]);
            // scope.figures               = ['activity','if','end'];
            // scope.figuresWidth          = scope.config.width - scope.config.marginLeft - scope.config.marginRight;
            // scope.figuresHeight          = scope.config.figuresHeight;
            // scope.marginBetweenFigures  = scope.config.marginBetweenFigures;
            // scope.offset = {
            //     x: (scope.config.width / 2),
            //     y: scope.config.marginTop
            // };

            // scope.init = function () {
            //     var longitud = scope.source.length;

            //     for (   i in scope.source) {
            //         var last = scope.source.length == (Number(i) + 1) ? true : false;
            //         scope.$factory(scope.source[i],(Number(i)+1), last);
            //     }

            //     ngModel.$setViewValue({
            //         height: scope.offset.y
            //     });
                
            //     ngModel.$render = function () {
            //         console.log(ngModel);
            //     };

            // };
            // scope.init();



            scope.svg = Snap(element[0]);
            scope.width = 2000;
            scope.height = 1000;
            scope.$factory = {
                rect : function (offset, w, h) {
                    return scope.svg.rect(offset.x, offset.y, w, h);
                },
                line : function (start, end) {
                    return scope.svg.line(start.x, start.y, end.x, end.y);
                },
                text : function (offset,w, text) {
                    var text = scope.svg.multitext(offset.x, offset.y, text, w, {
                        "text-anchor": "middle"
                    });
                    return text;
                }
            };

            scope.$paint = {
                rectApplication : function(rect){
                    rect.attr({
                        fill: "rgba(21,11,44,.65)",
                        strokeWidth: 0
                    });
                    return rect;
                },
                rectApplication : function(rect){
                    rect.attr({
                        fill: "rgba(21,11,44,.65)",
                        strokeWidth: 0
                    });
                    return rect;
                },
                lineApplication : function(line){
                    line.attr({
                        stroke: "rgb(200,200,200)",
                        strokeWidth: 0.5
                    });
                    return line;
                },
                textApplication : function(text){
                    text.attr({
                        transform: "r270",
                        fill:"rgb(255,255,255)"
                    });
                    return text;
                },
                textAreas : function(text){
                    text.attr({
                        fill:"rgb(255,255,255)"
                    });
                    return text;
                }
            };


            scope.buildLayoutInitial = function(){
                var offset = { x:0, y:0 };
                var width = 200;
                scope.config.layouts.initial = [];
                scope.layoutHorizontalGroup = scope.svg.group();
                for(i in scope.source){
                    scope.config.layouts.initial[i] = {};
                    scope.config.layouts.initial[i].offset = offset; 
                    offset.x += width;
                }
            };

            scope.buildLayoutHorizontal = function(){
                var offset = { x:0, y:0 };
                var height = 136;
                var width = 50;
                scope.layoutHorizontalGroup = scope.svg.group();
                for(i in scope.config.layouts.horizontal){
                    var rect,line,text;
                    rect = scope.$factory.rect(offset, width, height);
                    rect = scope.$paint.rectApplication(rect);
                    line = scope.$factory.line({x:offset.x , y : offset.y + (height - 1)  }, { x : scope.width, y : offset.y+ (height-1)});
                    line = scope.$paint.lineApplication(line);
                    text = scope.$factory.text({x:offset.x + (width/2) , y : offset.y + (height/2) }, (height-40), scope.config.layouts.horizontal[i].text);
                    text = scope.$paint.textApplication(text);
                    
                    var g = scope.svg.group(rect, line, text);
                    scope.layoutHorizontalGroup.append(g);
                    scope.config.layouts.horizontal[i].offset = offset; 
                    offset.y += height;
                }

            };

            
            scope.buildLayoutVertical = function(){
                  var offset = { x:0, y:0 };
                var height = 30;
                var width = 364;
                scope.layoutVerticalGroup = scope.svg.group();
                for(i in scope.config.layouts.vertical){
                    var rect,line,text;
                    rect = scope.$factory.rect(offset, width, height);
                    rect = scope.$paint.rectApplication(rect);
                    line = scope.$factory.line({x:offset.x + width, y : offset.y }, { x : offset.x + width, y : 3000});
                    line = scope.$paint.lineApplication(line);
                    text = scope.$factory.text({x:offset.x + (width/2) , y : offset.y + (height/2) + 5 }, (width-40), scope.config.layouts.vertical[i].text);
                    text = scope.$paint.textAreas(text);
                    
                    var g = scope.svg.group(rect, line, text);
                    scope.layoutVerticalGroup.append(g);

                    scope.config.layouts.vertical[i].offset = JSON.parse(JSON.stringify(offset)); 
                    offset.x += width;
                }
            };

            scope.config.changeLayoutSelect = function(layoutSelect){
                console.log(layoutSelect);
                scope.layoutVerticalGroup.attr({ visibility: "hidden" });
                scope.layoutHorizontalGroup.attr({ visibility: "hidden" });
                switch(layoutSelect){
                    case 0: break;
                    case 1: scope.layoutVerticalGroup.attr({ visibility: "visible" }); break;
                    case 2: scope.layoutHorizontalGroup.attr({ visibility: "visible" }); break;
                    default: break;
                }
            };
            scope.buildCapacidad = function(offset, capacidad){
                rect = scope.$factory.rect(offset, width, height);
                rect = scope.$paint.rectApplication(rect);
                // line = scope.$factory.line({x:offset.x , y : offset.y + (height - 1)  }, { x : scope.width, y : offset.y+ (height-1)});
                // line = scope.$paint.lineApplication(line);
                // text = scope.$factory.text({x:offset.x + (width/2) , y : offset.y + (height/2) + 5 }, (width-40), scope.config.layouts.vertical[i].text);
                // text = scope.$paint.textAreas(text);
            };
            scope.buildCapacidades = function(){
                
                var offsets = [{x:0,y:0},{x:0,y:0},{x:0,y:0}];

                for(i in scope.source){
                    

                    for(j in scope.source[i].capacidades){
                        var capacidad = scope.source[i].capacidades[j];
                        // var offset = scope.$factory.getPosition(array, capacidad);

                        capacidad.offsets = [{},{},{}];
                        capacidad.offsets[0].x = scope.config.layouts.initial[i].offset.x;
                        capacidad.offsets[0].y = offsets[0].y;
                        offsets[0].y += 100;

                        capacidad.offsets[1].x = $vash.findOffsetInArray(scope.config.layouts.vertical, capacidad,'areas').x;
                        capacidad.offsets[1].y = offsets[1].y;
                        offsets[1].y += 100;


                        capacidad.offsets[2].y = $vash.findOffsetInArray(scope.config.layouts.horizontal, capacidad,'aplicaciones').y;
                        capacidad.offsets[2].x = offsets[2].x;
                        offsets[2].x += 300;


                        //var offset2 = $vash.findOffsetInArray(scope.config.layouts.horizontal,capacidad);
                        //console.log('$vash');
                         console.log(capacidad);
                        // console.log(capacidad);
                        //console.log(offset1);
                        //console.log(offset2);
                    }

                    offsets[0].y = 0;
                }
            };
            scope.buildLayouts = function(){
                scope.buildLayoutInitial();
                scope.buildLayoutHorizontal();
                scope.buildLayoutVertical();
            };
            scope.buildProcesos = function(){
                scope.buildCapacidades();
            };

            scope.init = function(){ 
                scope.buildLayouts();
                scope.config.changeLayoutSelect(scope.config.layoutSelect);
            };
            scope.reset = function(){ 
                scope.buildProcesos();
            };

            
            scope.init();

            scope.$watch('source',function(newValue, oldValue){
                if(scope.source.length){
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
                config:'=config',

            }
        };
    };
    angular
        .module('ngWays', [])
        .directive('ngWays', Directive);
})();