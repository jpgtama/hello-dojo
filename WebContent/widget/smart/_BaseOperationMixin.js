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
 * FILE NAME: _BaseOperationMixin.js
 * 
 * CREATED: 2016年2月18日 下午1:10:31
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/declare'
], function(declare) {
    return declare('app.widget.smart._BaseOperationMixin', null, {

        /**
         * getJson
         */
        getJson : function() {
            // Do something for get JSON
        },

        /**
         * setJson
         */
        setJson : function(json) {
            // Do something after set JSON
        },

        /**
         * getData
         */
        getData : function() {
            // Do something for get DATA
        },

        /**
         * setData
         */
        setData : function(data) {
            // Do something after set DATA
        },

        /**
         * getStyle
         */
        getStyle : function() {

        },

        /**
         * validate
         */
        validate : function() {
            // Do something about every elements validate
            if (this.getInherited(arguments))
                return this.inherited(arguments);
            return true;
        }

    });
});