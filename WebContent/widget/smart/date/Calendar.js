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
 * FILE NAME: DateTimeBox.js
 * 
 * CREATED: 2016年1月12日 上午11:35:36
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_CssStateMixin',
    'dijit/Calendar',
    'dijit/form/Select',
    'dojo/date',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/on',
    'dojo/sniff',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/calendar.html'
], function(_CssStateMixin, Calendar, Select, dojoDate, domAttr, domClass, domConstruct, domStyle, on, has, array, lang, declare, template) {
    var CalendarCustomer = declare('app.widget.smart.date.Calendar', [
        Calendar
    ], {

        /**
         * templateString
         */
        templateString : template,

        /**
         * startYear
         */
        startYear : 1900,

        /**
         * endYear
         */
        endYear : null,

        /**
         * Override
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);
            if (!this.endYear) {
                this.endYear = new Date().getFullYear() + 100;
            }
        },

        /**
         * Override
         */
        buildRendering : function() {
            this.inherited(arguments);
        },

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);
        },

        /**
         * Override
         */
        _populateControls : function() {
            // summary:
            // Fill in localized month, and prev/current/next years
            // tags:
            // protected
            this.inherited(arguments);
            this.fillYear();
        },

        /**
         * fillYear
         */
        fillYear : function() {
            if (this.yearWidget) {
                var year = new this.dateClassObj(this.currentFocus);
                year.setDate(1);
                this.yearWidget.set('year', year);
            }
        },

        /**
         * onYearSelect
         */
        _onYearSelect : function(/* Number */newYear) {
            var date = new this.dateClassObj(this.currentFocus);
            date.setYear(newYear);
            this._setCurrentFocusAttr(date);
        },

        /**
         * Override
         */
        _createMonthWidget : function() {
            // summary:
            // Creates the drop down button that displays the current month and
            // lets user pick a new one
            this.yearWidget = this._createYearWidget();
            return new CalendarCustomer._MonthSelect({
                id : this.id + '_mddb',
                tabIndex : -1,
                onChange : lang.hitch(this, '_onMonthSelect'),
                lang : this.lang,
                dateLocaleModule : this.dateLocaleModule,
            }, this.monthNode);
        },

        /**
         * _createYearWidget
         */
        _createYearWidget : function() {

            return new CalendarCustomer._YearSelect({
                id : this.id + '_yddb',
                tabIndex : -1,
                onChange : lang.hitch(this, '_onYearSelect'),
                lang : this.lang,
                dateLocaleModule : this.dateLocaleModule,
                startYear : this.startYear,
                endYear : this.endYear
            }, this.yearNode);
        },
    });

    CalendarCustomer._YearSelect = declare('app.widget.smart.date.Calendar._YearSelect', Select, {
        /**
         * style
         */
        style : 'width:60px;text-align:center;',

        /**
         * maxHeight
         */
        maxHeight : 256,

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);
        },

        /**
         * _setYearAttr
         */
        _setYearAttr : function(year) {
            var yearOptions = [];
            for (var i = this.startYear; i <= this.endYear; i++) {
                var str = i + '';
                yearOptions.push({
                    label : str,
                    value : str
                });
            }
            this.options = yearOptions;
            // summary:
            // Set the current month to display as a label
            this.set('value', year.getFullYear())
        }
    });

    CalendarCustomer._MonthSelect = declare("app.widget.smart.date.Calendar._MonthSelect", Select, {
        /**
         * style
         */
        style : 'width:60px;overflow:hidden;text-align:center;',

        /**
         * maxHeight
         */
        maxHeight : 256,

        /**
         * Override
         */
        postCreate : function() {
            /*
             * var yearNames = []; for (var i = this.startYear; i <=
             * this.endYear; i++) { var str = i + ''; yearNames.push({label :
             * str,value : str}); } this.options = yearNames;
             */
            this.inherited(arguments);
        },

        /**
         * _setMonthAttr
         */
        _setMonthAttr : function(month) {
            var monthOptions = [];
            var monthNames = this.dateLocaleModule.getNames('months', 'wide', 'standAlone', this.lang, month);
            for (var i = 0; i <= monthNames.length; i++) {
                var str = i + '';
                monthOptions.push({
                    label : monthNames[i],
                    value : str
                });
            }
            this.options = monthOptions;
            // summary:
            // Set the current month to display as a label
            this.set('value', month.getMonth());
        }
    });

    return CalendarCustomer;
});