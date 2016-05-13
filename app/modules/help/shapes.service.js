/* global angular */

(function () {

    var service = function () {

        var scope = this;

        scope.svg = null;

        return {
            svg: function (value) {
                scope.svg = value;
            },
            imprimeValor: function () {
                console.log(scope.svg);
            },
            factory: {
                rect: function (offset, w, h) {
                    var x = offset.x - (w / 2);
                    var y = offset.y - (h / 2);
                    return scope.svg.rect(x, y, w, h);
                },
                line: function (start, end) {
                    return scope.svg.line(start.x, start.y, end.x, end.y);
                },
                text: function (offset, w, text) {
                    var text = scope.svg.multitext(offset.x, offset.y, text, w, {
                        "text-anchor": "middle"
                    });
                    return text;
                },
                textbox: function (offset, w, h, text, fontSize) {
                    var text = scope.svg.multitext(offset.x, offset.y, text, w, {
                        "text-anchor": "middle",
                        'font-size': fontSize + 'px'
                    });
                    // var yt = offset.y - (text.node.clientHeight / 2);
                    // //var yt = (offset.y +(h / 2) - (text.node.clientHeight / 2))+10;
                    var yt = offset.y - (text.node.clientHeight / 2) + fontSize;
                    text.attr({
                        y: yt
                    });
                    return text;
                },
                polyline: function (arr) {
                    var polyline = scope.svg.polyline(arr);
                    polyline.attr({
                        fill: "rgb(100,100,100)",
                        stroke: "rgb(100,100,100)",
                        strokeWidth: 1
                    });
                    // factotyArrow();
                    return polyline;
                },
                arrow: function (offset, b) {
                    var x = offset.x;
                    var y = offset.y;
                    var pathStr = "M" + (x - (b / 2)) + " " + y + " L" + (x + (b / 2)) + " " + y + " L" + x + " " + (y + b) + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "#757575",
                        stroke: "#757575",
                        strokeWidth: 0
                    });
                    return path;
                },
                rombo: function (offset, w, h) {
                    var p1 = {
                        x: offset.x,
                        y: offset.y - (h / 2)
                    };
                    var p2 = {
                        x: offset.x + (w / 2),
                        y: offset.y
                    };
                    var p3 = {
                        x: offset.x,
                        y: offset.y + (h / 2)
                    };
                    var p4 = {
                        x: offset.x - (w / 2),
                        y: offset.y
                    };

                    var pathStr = "M" + p1.x + " " + p1.y + " L" + p2.x + " " + p2.y + " L" + p3.x + " " + p3.y + " L" + p4.x + " " + p4.y + " Z";
                    var path = scope.svg.path(pathStr);

                    path.attr({
                        fill: "rgb(240, 240, 240)",
                        stroke: "#979797",
                        strokeWidth: 1
                    });
                    return path;
                },
                circle: function (offset, r) {
                    var x = offset.x;
                    var y = offset.y;
                    var circle = scope.svg.circle(x, y, r);
                    return circle;
                }
            }

        };
    };

    angular
        .module('mVash')
        .service('$shapes', service);

})();