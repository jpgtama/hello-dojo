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
 * FILE NAME: Date.js
 * 
 * CREATED: 2016年1月12日 上午11:35:36
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/smart/_BaseElementMixin',
    'app/widget/smart/date/BaseDate',
    'dojo/date',
    'dojo/json',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(_BaseElementMixin, BaseDate, dojoDate, JSON, on, lang, declare) {
    return declare('app.registry.widget.date.Date', [
        BaseDate,
        _BaseElementMixin
    ], {

        /**
         * baseClass
         */
        baseClass : 'dijitTextBox dijitComboBox dijitDateTextBox date',

        /**
         * pattern
         */
        _pattern : 'yyyy/MM/dd',

        /**
         * Override
         */
        setJson : function(json) {
            var minDate = new Date(-2209017600000);// 1900-1-1 00:00:00 000
            var maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() + 100);

            // set constraints
            this.set('constraints', {
                datePattern : this._pattern,
                min : minDate,
                max : maxDate
            });

            if (this._pattern) {
                // set placeHolder
                this.set('placeHolder', this._pattern.toUpperCase());
            }

            // json parse
            var defObject = JSON.parse(json);

            // set default value
            if (defObject.defaultvalue !== null) {
                this.set('value', new Date(defObject.defaultvalue));
            }
        },

        /**
         * Override
         */
        getData : function() {
            var data = {};
            var val = this.get('value');
            if (val) {
                data[this._key] = this.get('value').getTime();
            } else {
                data[this._key] = null;
            }
            return data;
        },

        /**
         * Override
         */
        setData : function(data) {
            if (data == null) {
                data = {};
            }
            var value = data[this._key];
            if (value === undefined) {
                value = this._defaultvalue;
            }

            if (value || value === 0) {
                this.set('value', new Date(value));
            } else {
                // if there is not default value, set null to avoid 1970 date
                this.set('value', null);
            }
        }

    });
});