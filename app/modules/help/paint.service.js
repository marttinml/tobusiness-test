/* global angular */

(function () {

    var service = function () {


        return {
            rectApplication: function (rect) {
                rect.attr({
                    fill: "rgba(21,11,44,.65)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectCapacidades: function (rect) {
                rect.attr({
                    fill: "rgba(255,255,255,1)",
                    stroke: "rgb(150,150,150)",
                    strokeWidth: 0.5
                });
                return rect;
            },
            rectCapacidadesFooter: function (rect) {
                rect.attr({
                    fill: "rgba(21,11,44,.65)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectCapacidadesBack: function (rect) {
                rect.attr({
                    fill: "rgba(144, 99, 205, 0.3)",
                    strokeWidth: 0
                });
                return rect;
            },
            rectProceso: function (rect) {
                rect.attr({
                    stroke: "rgb(144,99,205)",
                    fill: "rgb(255,255,255)",
                    strokeWidth: 1
                });
                return rect;
            },
            rectProcesoHeader: function (rect) {
                rect.attr({
                    stroke: "rgb(144,99,205)",
                    fill: "rgba(234,234,234,.85)",
                    strokeWidth: 0
                });
                return rect;
            },
            lineApplication: function (line) {
                line.attr({
                    stroke: "rgb(200,200,200)",
                    strokeWidth: 0.5
                });
                return line;
            },
            textApplication: function (text) {
                text.attr({
                    transform: "r270",
                    fill: "rgb(255,255,255)"
                });
                return text;
            },
            textAreas: function (text) {
                text.attr({
                    fill: "rgb(255,255,255)"
                });
                return text;
            },
            fontColorWhite: function (text) {
                text.attr({
                    fill: "rgb(255,255,255)"
                });
                return text;
            },
            textLeft: function (text) {
                text.attr({
                    'text-anchor': "initial"
                });
                return text;
            },
            circleEnd: function (circle) {
                circle.attr({
                    fill: "#9063CD",
                    strokeWidth: 0
                });
                return circle;
            }

        };
    };


    angular
        .module('mVash')
        .service('$paint', service);

})();