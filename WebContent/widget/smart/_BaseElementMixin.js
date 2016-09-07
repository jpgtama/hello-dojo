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
 * FILE NAME: _BaseElementMixin.js
 * 
 * CREATED: 2016年2月18日 上午10:47:18
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/smart/_BaseOperationMixin',
    'dojo/json',
    'dojo/_base/declare'
], function(_BaseOperationMixin, JSON, declare) {
    return declare('app.widget.smart._BaseElementMixin', _BaseOperationMixin, {

        /**
         * type
         */
        _type : null,

        /**
         * key
         */
        _key : null,

        /**
         * label
         */
        _label : null,

        /**
         * desc
         */
        _desc : null,

        /**
         * required
         */
        _required : false,

        /**
         * hidden
         */
        _hidden : false,

        /**
         * predefined
         */
        _predefined : false,

        /**
         * defaultvalue
         */
        _defaultvalue : null,

        /**
         * permission
         */
        _permission : null,

        /**
         * groupby
         */
        _groupby : null,

        /**
         * chains, but has some problems
         */
        '-chains-' : {
            // getJson : 'before',
            setJson : 'after'
        },

        /**
         * Override, General Properties
         */
        getJson : function() {
            var _this = this;
            var obj = {
                uuid : _this._uuid,// it will be removed before saving DB
                type : _this._type,
                key : _this._key,
                label : _this._label,
                desc : _this._desc,
                required : _this._required,
                hidden : _this._hidden,
                predefined : _this._predefined,
                defaultvalue : _this._defaultvalue,
                permission : _this._permission,
                groupby : _this._groupby
            };
            return JSON.stringify(obj);
        },

        /**
         * Override, Do something before Elements call this set JSON method
         */
        setJson : function(json) {
            var obj = JSON.parse(json);
            for (key in obj) {
                if (obj[key] !== undefined) {
                    this['_' + key] = obj[key];
                }
            }
        },

        /**
         * Do something for Element initializing After Created
         */
        initElement : function(/* Object */options) {

        },

        /**
         * Default return true to display label, Element can change this by
         * return Boolean value
         */
        hasLabel : function(/* Object */options) {
            return true;
        }

    });
});