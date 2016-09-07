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
 * FILE NAME: _BaseContainerMixin.js
 * 
 * CREATED: 2016年2月18日 下午2:07:12
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
    return declare('app.widget.smart._BaseContainerMixin', _BaseOperationMixin, {

        /**
         * name
         */
        _name : null,

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
                name : _this._name
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
         * Set the Container's name
         */
        putName : function(/* String */name) {

        },

        /**
         * Do something for Container initializing After Created
         */
        initContainer : function(/* Object */options) {

        }

    });
});