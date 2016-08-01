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
 * FILE NAME: PercentageDonut.js
 * 
 * CREATED: 2016年7月14日 上午10:47:51
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    './Donut',
    'dojox/charting/Chart',
    'dojox/charting/axis2d/Default',
    'dojox/charting/plot2d/common',
    'dojox/charting/themes/Harmony',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Donut, Chart, Default, common, Harmony, dom, domClass, domConstruct, domStyle, lang, declare) {
    // ///////////////////////
    //
    // Percentage displayed as Donut.
    //
    //
    return declare('app.registry.widget.percentageIndicator.percentageDonut.PercentageDonut', [], {

        /**
         * the display data, [complete, incomplete]. Default is [0, 1].
         */
        data : null,

        /**
         * the place to hold chart. If not provided, an error will be thrown.
         */
        targetDom : null,

        /**
         * the size of chart, width & height are the same. Default is 35.
         */
        size : null,

        /**
         * the color of the complete part. Default is #7395FB(like royal blue).
         */
        completeColor : null,

        /**
         * the color of the incomplete part. Default is #C5C4C4(like light
         * gray).
         */
        incompleteColor : null,

        /**
         * the center circle color. Default is #CCC(like gray).
         */
        centerColor : null,

        /**
         * the precision of chart. Default is 0 (no fraction).
         */
        precision : null,

        /**
         * class name
         */
        className : 'percentage-indicator',

        /**
         * Override
         */
        constructor : function(options) {
            // validate options
            if (!options.targetDom || !dom.byId(options.targetDom)) {
                throw 'targetDom is not provided.';
            }

            // mixin options
            lang.mixin(this, lang.mixin(this._defaultOptions(), options));

            // create wrapper
            this._createWrapper();
            this.createChartDonut();
            this._placeWrapper();
        },

        /**
         * provide default options
         */
        _defaultOptions : function() {
            return {
                size : 35,
                data : [
                    0,
                    1
                ],
                completeColor : '#7395FB',
                incompleteColor : '#C5C4C4',
                precision : 0
            };
        },

        /**
         * create wrapper
         */
        _createWrapper : function() {
            // initial
            var wrapper = this.wrapper = domConstruct.create('div');
            domStyle.set(wrapper, 'display', 'inline-block');
            domStyle.set(wrapper, 'width', this.size + 'px');
            domStyle.set(wrapper, 'height', this.size + 'px');
            domClass.add(wrapper, this.className);

            // append to body to make this wrapper has width & height
            // svg need the wrapper that has width & height
            domStyle.set(wrapper, 'position', 'relative');
            domStyle.set(wrapper, 'left', '-20000px');
            domConstruct.place(wrapper, document.body);

        },

        /**
         * place wrapper
         */
        _placeWrapper : function() {
            domConstruct.place(this.wrapper, dom.byId(this.targetDom));
            domStyle.set(this.wrapper, 'left', '0px');
        },

        /**
         * create chart donut
         */
        createChartDonut : function() {
            var data = this.data;
            var c = this.chart = new Chart(this.wrapper, {
                margins : {
                    l : 1,
                    t : 1,
                    r : 1,
                    b : 1
                },
                fill : null
            });

            // remove background
            Harmony.plotarea.fill = null;

            c.addPlot('Donut', {
                type : Donut,
                labels : false,
                stroke : null,
                startAngle : -90,
                precision : this.precision, 
                centerColor: this.centerColor
            }).setTheme(Harmony).addSeries("data", this.getData(data[0], data[1]), {
                plot : 'Donut'
            });

            c.render();
        },

        /**
         * update
         */
        update : function(complete, incomplete) {
            var data = this.getData(complete, incomplete);
            this.chart.updateSeries('data', data, {
                stroke : null
            });
            this.chart.render();
        },

        /**
         * get the data to render in pie chart
         */
        getData : function(complete, incomplete) {
            // check both =0
            if (complete === 0 && incomplete === 0) {
                incomplete = 1;
            }

            var data = [
                {
                    y : complete,
                    color : this.completeColor
                },
                {
                    y : incomplete,
                    color : this.incompleteColor
                }
            ];

            return data;
        }

    });
});