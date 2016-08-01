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
 * FILE NAME: PercentagePie.js
 * 
 * CREATED: 2016年7月14日 上午10:47:51
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojox/charting/Chart',
    'dojox/charting/axis2d/Default',
    'dojox/charting/plot2d/Pie',
    'dojox/charting/plot2d/common',
    'dojox/charting/themes/Harmony',
    "dojox/charting/action2d/Tooltip",
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/_base/declare'
], function(Chart, Default, Pie, common, Harmony, Tooltip, domClass, domConstruct, domStyle, declare) {
    // ///////////////////////
    //
    // Percentage displayed as pie chart.
    //
    //
    return declare('app.registry.widget.PercentagePie', [], {

        /**
         * width
         */
        width : 35,

        /**
         * height
         */
        height : 35,

        /**
         * class name
         */
        className : 'percentage-indicator',

        /**
         * Override
         */
        /**
         * Override
         */
        constructor : function(options) {
            // create wrapper
            this._createWrapper();

            this.createChartPie(options.percentage);

            this._placeWrapper(options.targetDom);
        },

        /**
         * create wrapper
         */
        _createWrapper : function() {
            // initial
            var piWrapper = this.wrapper = domConstruct.create('div');
            domStyle.set(piWrapper, 'display', 'inline-block');
            domStyle.set(piWrapper, 'width', this.width + 'px');
            domStyle.set(piWrapper, 'height', this.height + 'px');
            domClass.add(piWrapper, this.className);

            // append to body to make this wrapper has width & height
            // svg need the wrapper has width & height
            domStyle.set(piWrapper, 'position', 'relative');
            domStyle.set(piWrapper, 'left', '-20000px');
            domConstruct.place(piWrapper, document.body);

        },

        /**
         * place wrapper
         */
        _placeWrapper : function(targetDom) {
            var piWrapper = this.wrapper;

            domConstruct.place(piWrapper, targetDom);

            domStyle.set(piWrapper, 'left', '0px');
        },

        /**
         * create chart pie
         */
        createChartPie : function(percentage) {
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

            c.addPlot('Pie', {
                type : Pie,
                labels : false,
                stroke : null,
                startAngle : -90,
                precision : 0
            }).setTheme(Harmony).addSeries("data", this.getData(percentage[0], percentage[1]), {
                plot : 'Pie'
            });

            // hover tool tip
            new Tooltip(c, "Pie", {
                text : function(o) {
                    // get sum
                    var sum = 0;
                    for (var i = 0; i < o.run.data.length; i++) {
                        var v = o.run.data[i];
                        sum += typeof v == "number" ? v : v.y;
                    }

                    // divide
                    var p = o.y / sum;

                    // get display
                    var d = this.plot._getLabel(p * 100) + "%";

                    return d;
                }
            });

            c.render();
        },

        /**
         * set percentage
         */
        setPercentage : function(z, m) {
            var data = this.getData(z, m);
            this.chart.updateSeries('data', data, {
                stroke : null
            });
            this.chart.render();
        },

        /**
         * get the data to render in pie chart
         */
        getData : function(z, m) {
            // m: all
            // z: completed
            // m -z: not completed

            // check both =0
            if (z === 0 && m === 0) {
                m = 1;
            }

            var data = [
                {
                    y : z,
                    color : '#7AC943'
                },
                {
                    y : m - z,
                    color : '#3FA9F5'
                }
            ];

            return data;

        }

    });
});