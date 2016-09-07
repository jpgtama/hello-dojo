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
 * FILE NAME: BaseDateTime.js
 * 
 * CREATED: 2016年6月8日 下午2:00:16
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/date',
    'dojo/date/locale',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/date-time.html'
], function(_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, dojoDate, dateLocale, domClass, domStyle, on, lang, declare, template) {
    return declare('app.widget.smart.date.BaseDateTime', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * baseClass
         */
        templateString : template,

        /**
         * datePattern
         */
        datePattern : 'yyyy/MM/dd',

        /**
         * timePattern
         */
        timePattern : 'HH:mm',

        /**
         * datePlaceHolder
         */
        datePlaceHolder : null,

        /**
         * timePlaceHolder
         */
        timePlaceHolder : null,

        /**
         * required
         */
        required : false,

        /**
         * value
         */
        value : null,

        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
        },

        /**
         * postCreate
         */
        postCreate : function() {
            this.inherited(arguments);
            // add watch
            this.addWatch();
        },

        /**
         * _setDatePatternAttr
         */
        _setDatePatternAttr : function(pattern) {
            if (pattern) {
                this.datePattern = pattern;
            }
            this.dateNode.constraints.datePattern = this.datePattern;
        },

        /**
         * _setDatePlaceHolderAttr
         */
        _setDatePlaceHolderAttr : function(placeHolder) {
            this.datePlaceHolder = placeHolder;
            this.dateNode.set('placeHolder', placeHolder);
        },

        /**
         * _setTimePatternAttr
         */
        _setTimePatternAttr : function(pattern) {
            if (pattern) {
                this.timePattern = pattern;
            }
            this.timeNode.constraints.timePattern = this.timePattern;
        },

        /**
         * _setTimePlaceHolderAttr
         */
        _setTimePlaceHolderAttr : function(placeHolder) {
            this.timePlaceHolder = placeHolder;
            this.timeNode.set('placeHolder', placeHolder);
        },

        /**
         * _setRequiredAttr
         */
        _setRequiredAttr : function(required) {
            this.required = required;
        },

        /**
         * _setValueAttr
         */
        _setValueAttr : function(value) {
            this.value = value;
            this.dateNode.set('value', value);
            this.timeNode.set('value', value);
        },

        /**
         * addWatch
         */
        addWatch : function() {
            this.own(this.dateNode.watch('value', lang.hitch(this, function(newValue) {
                this.modifyValue();
            })), this.timeNode.watch('value', lang.hitch(this, function(newValue) {
                this.modifyValue();
            })));
        },

        /**
         * modifyValue
         */
        modifyValue : function() {
            var dateValue = this.dateNode.get('value');
            var timeValue = this.timeNode.get('value');
            if (dateValue && timeValue) {
                var dateStr = dateLocale.format(dateValue, {
                    selector : 'date',
                    datePattern : this.datePattern
                });
                var timeStr = dateLocale.format(timeValue, {
                    selector : 'time',
                    timePattern : this.timePattern
                });
                this.value = new Date(dateStr + ' ' + timeStr);
            } else {
                this.value = null;
            }
        }
    });
});