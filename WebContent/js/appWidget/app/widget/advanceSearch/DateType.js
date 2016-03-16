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
 * FILE NAME: DateType.js
 * 
 * CREATED: 2015年7月13日 上午11:15:57
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/Stateful',
    'app/util/ResourceUtil',
    'app/widget/_HiddenMixin',
    'app/widget/advanceSearch/_SearchCriteriaMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dojo/date',
    'dojo/date/stamp',
    'dojo/dom',
    'dojo/on',
    'dojo/_base/declare',
    'dojo/text!./templates/date.html'
], function(Stateful, i18n,_HiddenMixin, _SearchCriteriaMixin, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, lang, dateUtil, stamp, dom, on, declare, template) {
    return declare('app.widget.advanceSearch.DateType', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchCriteriaMixin,
        _HiddenMixin
    ], {
        /**
         * template
         */
        templateString : template,


        /**
         * base Class
         */
        baseClass : "dateType",
        /**
         * data model
         */
        dataModel : '',

        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);

            // intial value
            this.dataModel = new Stateful();

            // set search field
            this.searchField = this.field;

            // set field display
            this.dataModel.fieldDisplay = i18n.getText(this.fieldDispalyKey);

            this.dataModel.fieldValueList = [
                {
                    label : i18n.getText('all'),
                    value : _SearchCriteriaMixin.allValue
                },
                {
                    label : i18n.getText('today'),
                    value : 'today'
                },
                {
                    label : i18n.getText('one_week_ago'),
                    value : '-1w'
                },
                {
                    label : i18n.getText('two_weeks_ago'),
                    value : '-2w'
                },
                {
                    label : i18n.getText('four_weeks_ago'),
                    value : '-4w'
                },
                {
                    label : i18n.getText('one_year_ago'),
                    value : '-1y'
                },
                {
                    label : i18n.getText('next_one_week'),
                    value : '1w'
                },
                {
                    label : i18n.getText('next_two_weeks'),
                    value : '2w'
                },
                {
                    label : i18n.getText('next_four_weeks'),
                    value : '4w'
                },
                {
                    label : i18n.getText('next_one_year'),
                    value : '1y'
                },
                {
                    label : i18n.getText('custom'),
                    value : 'custom'
                }
            ];

        },

        /**
         * Override
         */
        postCreate : function() {
            // watch selectedFieldValue
            this.dataModel.watch('selectedFieldValue', lang.hitch(this, function(name, oldValue, value) {
                // update date
                this._updateDate(value);
                // set search value
                this._setSearchValue(value);
            }));

            // disable date text box
            this.dataModel.watch('dateTextBoxDisabled', lang.hitch(this, function(name, oldValue, value) {
                this.startDateNode.set('disabled', value);
                this.endDateNode.set('disabled', value);
            }));

            // default field value
            this.setDefaultValue();
            
            // watch start date & end date
            this.dataModel.watch('startDateValue', lang.hitch(this, function(name, oldValue, value) {
                this._setSearchValue();
            }));
            this.dataModel.watch('endDateValue', lang.hitch(this, function(name, oldValue, value) {
                this._setSearchValue();
            }));
        },

        /**
         * setDefaultValue
         */
        setDefaultValue : function() {
            this.dataModel.set('selectedFieldValue', _SearchCriteriaMixin.allValue);
            // remove all operations
            this._removeAllOperation();
        },
        /**
         * set search value
         */
        _setSearchValue : function(/* String */value) {
            // get date
            var startDate = this.dataModel.get('startDateValue');
            var endDate = this.dataModel.get('endDateValue');

            // add operation
            if(startDate){
                this._addOperation(this.operationType.GREATER_EQUALS, stamp.toISOString(startDate));
            }else{
                this._removeOperation(this.operationType.GREATER_EQUALS);
            }
            
            if(endDate){
                this._addOperation(this.operationType.LESS_EQUALS, stamp.toISOString(endDate));
            }else{
                this._removeOperation(this.operationType.LESS_EQUALS);
            }

        },

        /**
         * _updateDate
         */
        _updateDate : function(value) {
            // undefined value
            if (!value) {
                return;
            }

            // custom or all
            if (value === 'custom') {
                this.dataModel.set('startDateValue', null);
                this.dataModel.set('endDateValue', null);
                // enable date text box
                this.dataModel.set('dateTextBoxDisabled', false);
            } else {

                // all
                if (value === _SearchCriteriaMixin.allValue) {
                    this.dataModel.set('startDateValue', null);
                    this.dataModel.set('endDateValue', null);
                }

                // today
                if (value === 'today') {
                    var today = new Date();
                    this.dataModel.set('startDateValue', today);
                    this.dataModel.set('endDateValue', today);
                }

                // week
                if (/\d+w/.test(value)) {
                    this._setDate(value, 'week');
                }

                // year
                if (/\d+y/.test(value)) {
                    this._setDate(value, 'year');
                }

                // disable date text box
                this.dataModel.set('dateTextBoxDisabled', true);
            }

        },

        /**
         * set date for week and year
         */
        _setDate : function(value, interval) {
            var today = new Date();
            
            // 对于未来的计算，从明天开始
            if(/^[^-].+/.test(value)){
                today = dateUtil.add(today, 'day', 1);
            }
                    
            // 
            var amount = parseInt(value);
            //
            var anotherDate = dateUtil.add(today, interval, amount);

            // 调整天数：对于未来-1， 对于过去+1
            if(/^[^-].+/.test(value)){
                // for future, minus one day
                anotherDate = dateUtil.add(anotherDate, 'day', -1);
            }else{
                anotherDate = dateUtil.add(anotherDate, 'day', 1);
            }
            
            // 找出最大最小值
            var min = Math.min(anotherDate, today);
            var max = Math.max(anotherDate, today);

            this.dataModel.set('startDateValue', new Date(min));
            this.dataModel.set('endDateValue', new Date(max));
        },
        
        /**
         * Set query value using saved query
         */
        setQueryValue: function(queryValue){
            // for normal value
            if(typeof queryValue == 'string'){
                this.dataModel.set('selectedFieldValue', queryValue);
            }else if(typeof queryValue == 'object'){
                // for custom value
                // set custom
                this.dataModel.set('selectedFieldValue', 'custom');
                // set value
                if(queryValue.startDateValue){
                    this.dataModel.set('startDateValue', new Date(queryValue.startDateValue));
                }
                if(queryValue.endDateValue){
                    this.dataModel.set('endDateValue', new Date(queryValue.endDateValue));
                }
            }
        },
        
        /**
         * Get query value to save, if all options are selected then return undefined.
         */
        getQueryValue: function(){
            var queryValue = {};
            queryValue.field = this.field;
            queryValue.value = this.dataModel.get('selectedFieldValue');
            
            // special case for custom, save the date
            if(queryValue.value == 'custom'){
                queryValue.value = {
                    startDateValue: this.dataModel.get('startDateValue').getTime(),
                    endDateValue: this.dataModel.get('endDateValue').getTime() 
                };
            }
            
            // if not select all, then return queryValue
            if(queryValue.value !== _SearchCriteriaMixin.allValue){
                return queryValue;
            }
        },
        
        /**
         * get the search criteria to display, if all options are selected then return undefined.
         * 
         * The searchCriteriaDisplay format is: "fieldName: startDate - endDate"
         * 
         */
        getSearchCriteriaDisplay: function(){
            if(this.getQueryValue()){
                var searchCriteriaDisplay = this.dataModel.fieldDisplay + ': ' + this.startDateNode.displayedValue + ' - ' + this.endDateNode.displayedValue;
                return searchCriteriaDisplay;
            }
        }
    });
});