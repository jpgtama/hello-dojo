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
 * FILE NAME: DateTime.js
 * 
 * CREATED: Jun 6, 2016 9:31:42 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/smart/_BaseElementMixin',
    'app/widget/smart/date/BaseDateTime',
    'dojo/aspect',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(_BaseElementMixin, BaseDateTime, aspect, lang, declare) {
    return declare('app.widget.date.DateTime', [
        BaseDateTime,
        _BaseElementMixin
    ], {

        /**
         * baseClass
         */
        baseClass : 'datetime',

        /**
         * date input box valid status
         */
        datevalid : true,

        /**
         * time input box valid status
         */
        timevalid : true,

        /**
         * pattern
         */
        _pattern : [
            'yyyy/MM/dd',
            'HH:mm'
        ],

        /**
         * set TooltipPosition
         */
        _setTooltipPositionAttr : function(position) {
            if (this.dateNode) {
                this.dateNode.set('tooltipPosition', position);
            }
            if (this.timeNode) {
                this.timeNode.set('tooltipPosition', position);
            }
        },

        /**
         * Override
         */
        validate : function() {
            return this.datevalid && this.timevalid;
        },

        /**
         * Override
         */
        setJson : function(json) {
            if (this._pattern) {
                // set pattern
                this.set('datePattern', this._pattern[0]);
                this.set('timePattern', this._pattern[1]);

                // set placeHolder
                this.set('datePlaceHolder', this._pattern[0].toUpperCase());
                this.set('timePlaceHolder', this._pattern[1].toUpperCase());
            }

            // json parse
            var defObject = JSON.parse(json);

            // set default value
            if (defObject.defaultvalue !== null) {
                this.set('value', new Date(defObject.defaultvalue));
            }

            // watch data box validate
            if (this.dateNode) {
                aspect.after(this.dateNode, 'validate', lang.hitch(this, function(result, args) {
                    this.datevalid = result;
                    return this.validate();
                }));
            }

            // watch time box validate
            if (this.timeNode) {
                aspect.after(this.timeNode, 'validate', lang.hitch(this, function(result, args) {
                    this.timevalid = result;
                    return this.validate();
                }));
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
            var dateValue = data[this._key];
            if (dateValue) {
                this.set('value', new Date(data[this._key]));
            } else if (!this._defaultvalue) {
                // if there is not default value, set null to avoid 1970 date
                this.set('value', null);
            }
        }

    });
});