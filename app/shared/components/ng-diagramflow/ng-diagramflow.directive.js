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
    var Directive = function () {
        var Link = function (scope, element, attrs, ngModel) {
            // scope.svg = Snap(element[0]);
            // scope.coordinates = {
            //     x: 10,
            //     y: 10
            // };
            // scope.figs

            // var count = 0;
            // scope.$factory = function (obj,index,last) {
            //     var x = scope.coordinates.x;
            //     var y = scope.coordinates.y;

            //     var factoryPolyline = function () {
            //         // var polyline = scope.svg.polyline((x + 60), (y + 66), (x + 60), (y + 80));

            //         if(last){
            //             var polyline = scope.svg.rect((x + 59), (y + 66), 1, 15);
            //             polyline.attr({
            //                 fill: "#757575",
            //                 stroke: "rgb(100,100,100)",
            //                 strokeWidth: 0
            //             });
            //             factotyArrow();
            //             return polyline;
            //         }
            //     };

            //     var factoryRect = function () {
            //         var rect = scope.svg.rect(x, y, 118, 66);
            //         rect.attr({
            //             fill: "rgb(255,255,255)",
            //             stroke: "#979797",
            //             strokeWidth: 0.5
            //         });
            //         return rect;
            //     };

            //     var factotyPath = function () {
            //         var pathStr = "M" + (x + 60) + " " + y + " L" + (x + 120) + " " + (y + 33) + " L" + (x + 60) + " " + (y + 66) + " L" + x + " " + (y + 33) + " Z";
            //         var path = scope.svg.path(pathStr);
                
            //         path.attr({
            //             fill: "rgb(240, 240, 240)",
            //             stroke: "#979797",
            //             strokeWidth: 1
            //         });
            //         return path;
            //     };

            //     var factotyArrow = function () {
            //         var xp = x + 60;
            //         var yp = y + 75;
            //         var pathStr = "M" + (xp - 4) + " " + yp + " L" + (xp + 4) + " " + yp + " L" + xp + " " + (yp + 8) + " Z";
            //         var path = scope.svg.path(pathStr);
                
            //         path.attr({
            //             fill: "#757575",
            //             stroke: "#757575",
            //             strokeWidth: 0
            //         });
            //         return path;
            //     };

            //     var factoryText = function () {
            //         // var text = scope.svg.text( (x + 40), (y + 50), obj.text);
            //         var text = scope.svg.multitext((x + 58), (y + 15), scope.beforeIndex+'.'+index+' '+obj.text, 100, {
            //             "text-anchor": "middle",
            //             'font-size': '10px'
            //         });
            //         return text;
            //     };
            //     var factoryTextEnd = function () {
            //         // var text = scope.svg.text( (x + 40), (y + 50), obj.text);
            //         var text = scope.svg.multitext((x + 55), (y + 15), obj.text, 100, {
            //             "text-anchor": "middle",
            //             'font-size': '10px'
            //         });
            //         return text;
            //     };
            //     var factoryTextIndex = function () {
            //         // var text = scope.svg.text( (x + 40), (y + 50), obj.text);
            //         var text = scope.svg.multitext((x + 55), (y + 15), scope.beforeIndex+'.'+index, 50, {
            //             'font-size': '10px'
            //         });
            //         return text;
            //     };


            //     var factoryCircle = function () {
            //         var circle = scope.svg.circle(x + 60, y + 15 , 15);
            //         circle.attr({
            //             fill: "#9063CD",
            //             strokeWidth: 0
            //         });
            //         return circle;
            //     };

            //     switch (obj.type) {
            //     case 'activity':
            //         factoryRect();
            //         factoryText();
            //         factoryPolyline();
            //         scope.coordinates.y += 85;
            //         break;
            //     case 'if':
            //         factotyPath();
            //         y += 0;
            //         factoryPolyline();
            //         y += 20;
            //         x += 5;
            //         factoryText();
            //         scope.coordinates.y += 85;
            //         break;
            //     case 'end':
            //         factoryCircle();
            //         y += 5;
            //         x += 5;
            //         var text = factoryTextEnd();
            //         text.attr({
            //             'font-size': '21px',
            //             'fill': '#ffffff'
            //         });
            //         scope.coordinates.y += 45;
            //         break;
            //     default:
            //         break;
            //     }

            //     count++;

            // };



            scope.$factory = function (obj,index,last) {
                var x = scope.offset.x;
                var y = scope.offset.y;

                var factoryRect = function () {
                    var xt = x - (scope.figuresWidth / 2);
                    var yt = y;
                    var rect = scope.svg.rect(xt, yt, scope.figuresWidth, scope.figuresHeight);
                    rect.attr({
                        fill: "rgb(100,100,100)",
                        stroke: "#979797",
                        strokeWidth: 0.5
                    });
                    return rect;
                };

                var factotyRombo = function () {
                    var p1 = {x:x,y:y};
                    var p2 = {x:x+(scope.figuresWidth/2), y:y + (scope.figuresHeight/2)};
                    var p3 = {x:x, y:  y + scope.figuresHeight};
                    var p4 = {x:x - (scope.figuresWidth/2) , y:y + (scope.figuresHeight / 2)};

                    var pathStr = "M" + p1.x + " " + p1.y + " L" + p2.x + " " + p2.y + " L" + p3.x + " " + p3.y + " L" + p4.x + " " + p4.y + " Z";
                    var path = scope.svg.path(pathStr);
                
                    path.attr({
                        fill: "rgb(240, 240, 240)",
                        stroke: "#979797",
                        strokeWidth: 1
                    });
                    return path;
                };

                var factoryText = function () {
                    var text = scope.svg.multitext(x, y, scope.beforeIndex+'.'+index+' '+obj.text, scope.figuresWidth, {
                        "text-anchor": "middle",
                        'font-size': '10px'
                    });
                    console.log(text.node.clientHeight);
                    console.log(text);
                    var yt = (y +(scope.figuresHeight / 2) - (text.node.clientHeight / 2))+10;
                    text.attr({ y: yt});
                    return text;
                };

                var factoryJoinTo = function(){
                    var xt1 = x;
                    var yt1 = y + scope.figuresHeight;
                    var xt2 = x;
                    var yt2 = y + scope.figuresHeight + (scope.marginBetweenFigures - 3);
                    var arr = [xt1,yt1,xt2,yt2];
                    factoryPolyline(arr);
                };
                var factoryPolyline = function (arr) {
                    if(!last){
                        console.log(arr);
                        var polyline = scope.svg.polyline(arr);
                        polyline.attr({
                            fill: "rgb(100,100,100)",
                            stroke: "rgb(100,100,100)",
                            strokeWidth: 1
                        });
                        // factotyArrow();
                        return polyline;
                    }
                };

                switch (obj.type) {
                    case 'activity':
                        factoryRect();
                        factoryJoinTo();
                        factoryText();
                        // factoryPolyline();
                        scope.offset.y += (scope.figuresHeight + scope.marginBetweenFigures);
                        break;
                    case 'if':
                        factotyRombo();
                        factoryJoinTo();
                        factoryText();
                        // scope.coordinates.y += 85;
                        scope.offset.y += (scope.figuresHeight + scope.marginBetweenFigures);
                        break;
                    case 'end':
                        // factoryCircle();
                        // var text = factoryTextEnd();
                        // scope.coordinates.y += 45;
                        break;
                    default:
                        break;
                    }
                }

            scope.svg = Snap(element[0]);
            scope.figures               = ['activity','if','end'];
            scope.figuresWidth          = scope.config.width - scope.config.marginLeft - scope.config.marginRight;
            scope.figuresHeight          = scope.config.figuresHeight;
            scope.marginBetweenFigures  = scope.config.marginBetweenFigures;
            scope.offset = {
                x: (scope.config.width / 2),
                y: scope.config.marginTop
            };

            scope.init = function () {
                var longitud = scope.source.length;

                for (   i in scope.source) {
                    var last = scope.source.length == (Number(i) + 1) ? true : false;
                    scope.$factory(scope.source[i],(Number(i)+1), last);
                }

                ngModel.$setViewValue({
                    height: scope.offset.y
                });
                
                ngModel.$render = function () {
                    console.log(ngModel);
                };

            };
            scope.init();
        };
        return {
            restrict: 'A',
            link: Link,
            require: '?ngModel',
            scope: {
                source: '=set',
                beforeIndex:'=beforeIndex',
                config:'=config'
            }
        };
    };
    angular
        .module('ngDiagramflow', [])
        .directive('ngDiagramflow', Directive);
})();