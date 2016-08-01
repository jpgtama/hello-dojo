/*******************************************************************************
 * $Id: philipscicodetemplates.xml 276 2012-12-26 02:16:03Z wei.hu $
 * *****************************************************************************
 * 
 * <pre>
 *                         Philips Medical Systems
 *                © 2010 Koninklijke Philips Electronics N.V.
 * 
 * All rights are reserved. Reproduction in whole or in part is
 * prohibited without the written consent of the copyright owner.
 * 
 * 
 * FILE NAME: Donut.js
 * 
 * CREATED: 2016年7月28日 下午2:03:31
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    "dojox/charting/plot2d/Pie",
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Pie, domC, domG, style, lang, declare) {
    return declare('', [
        Pie
    ], {
        
        /**
         * circle ratio
         */
        circleRatio: 0.85,
        
        /**
         * percentage label margin 
         */
        percentageLabelMargin: 0,
        
        /**
         * the color of the center circle. Default is '#CCC'(gray).
         */
        centerColor: '#CCC',

        /**
         * Override
         */
        constructor: function(chart, options){
            // centerColor
            if(options.centerColor){
                this.centerColor = options.centerColor;
            }
        },
        
        /**
         * get percentage label
         */
        _getPercentageLabel : function() {
            // get sum
            var data = this.run.data;
            var sum = 0;
            var firstData = 0;
            for (var i = 0; i < data.length; i++) {
                var v = data[i];
                var y = typeof v == "number" ? v : v.y;
                sum += y;
                if (i == 0) {
                    firstData = y;
                }
            }

            // divide
            var p = firstData / sum;

            // get display
            var d = this._getLabel(p * 100) + "%";

            return d;
        },

        /**
         * get percentage label margin box
         */
        _getPiMarginBox : function() {
            var computedStyle = style.getComputedStyle(this.pi);
            var mgb = domG.getMarginBox(this.pi, computedStyle);
            return mgb;
        },

        /**
         * get percentage label content box
         */
        _getPiContentBox : function() {
            var computedStyle = style.getComputedStyle(this.pi);
            var ctb = domG.getContentBox(this.pi, computedStyle);
            return ctb;
        },

        /**
         * get percentage label content box diagonal
         */
        _getPiDiagonal : function() {
            var pi = this.pi;

            var ctb = this._getPiContentBox();
            var w = ctb.w, h = ctb.h;
            var diagonal = Math.sqrt(w * w + h * h);

            return diagonal;
        },

        /**
         * update percentage label 
         */
        _updatePi : function() {
            // update number
            this.pi.innerHTML = this._getPercentageLabel();
        },

        /**
         * resize percentage label
         */
        _fixPiFontSize : function() {
            var diagonal = this._getPiDiagonal();
            var r = this.circle.shape.r;

            if (diagonal > r * 2) {
                this._narrowPi();
            } else if (diagonal < r * 2) {
                this._expandPi();
            }
        },

        /**
         * narrow percentage label
         */
        _narrowPi : function() {
            var pi = this.pi;
            var dim = this.chart.dim;
            var r = this.circle.shape.r;

            var fs = parseInt(pi.style.fontSize) || 100;
            for (var i = 0; i < 2000; i++) {
                pi.style.fontSize = (fs--) + 'px';

                //console.log(i, '_smallPi: ', this._getPiMarginBox());
                var diagonal = this._getPiDiagonal();
                if (diagonal <= r * 2 - this.percentageLabelMargin ) {
                    break;
                }
            }
        },

        /**
         * expand percentage label, make it large
         */
        _expandPi : function() {
            var pi = this.pi;
            var dim = this.chart.dim;
            var r = this.circle.shape.r;

            var fs = parseInt(pi.style.fontSize) || 1;

            for (var i = 0; i < 2000; i++) {
                pi.style.fontSize = (fs++) + 'px';

                //console.log(i, '_largePi: ', this._getPiMarginBox());
                var diagonal = this._getPiDiagonal();
                if (diagonal >= r * 2 - this.percentageLabelMargin ) {
                    break;
                }
            }
        },
        
        
        _repositionPi: function(){
            var pi = this.pi;
            var dim = this.chart.dim;
            var ctb = this._getPiContentBox();
            var w = ctb.w, h = ctb.h;
            pi.style.left = (dim.width - w - 1) / 2 + 'px';
            pi.style.top = (dim.height - h) / 2 + 'px';
        },

        /**
         * Override, draw donut
         */
        render : function(dim, offsets) {
            // Call the Pie's render method
            this.inherited(arguments);

            // Draw a white circle in the middle
            var rx = (dim.width - offsets.l - offsets.r) / 2, ry = (dim.height - offsets.t - offsets.b) / 2, r = Math.min(rx, ry) * this.circleRatio, circle = {
                cx : offsets.l + rx,
                cy : offsets.t + ry,
                r : r
            }, s = this.group;

            this.circle = s.createCircle(circle).setFill(this.centerColor).setStroke(null);

            // use div to display percentage label
            if (!this.pi) {
                var pi = this.pi = domC.create("div", {
                    innerHTML : this._getLabel(100) + '%',
                    style : 'display: inline-block; line-height: normal; position: absolute; top: ' + (dim.height / 2) + 'px;left: -20000px;'
                });
                
                this.chart.surface.rawNode.parentElement.appendChild(pi);
                this.chart.surface.rawNode.parentElement.style.position = 'relative';
                this._fixPiFontSize();
                this._repositionPi();
            }
            
            this._updatePi();

            // re-position pi
            this._repositionPi();
            
            // TODO: do we need animation?
        }
    });
});