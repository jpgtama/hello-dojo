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
 * FILE NAME: _HeaderMixin.js
 * 
 * CREATED: 2016年6月16日 下午2:41:59
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    './_Header',
    'dojo/_base/array',
    'dojo/_base/declare'
], function(_Header, arrayUtil, declare) {

    return declare(null, {
        // summary:
        // This is class will add renderHeaderCell function to dgrid columns
        // We use another widget to render dgrid header, so we can add
        // additional
        // functions

        /**
         * Override
         */
        postMixInProperties : function() {

            if (this.columns && this.columns.length > 0) {

                // get column properties
                this._getOriginalColumnProperties();

                // add sortable & renderHeaderCell function
                arrayUtil.forEach(this.columns, function(col) {
                    // disable sort because the sort arrow can mess up the
                    // editor style
                    col.sortable = false;

                    // add renderHeaderCell function
                    col.renderHeaderCell = function(node) {
                        // create _Header, pass this as column
                        var h = new _Header({
                            column : this
                        });

                        // use _Header to render header
                        return h.domNode;
                    };
                }, this);
            }

            // call parent
            this.inherited(arguments);
        },

        /**
         * get original columns properties and save it to dgrid
         */
        _getOriginalColumnProperties : function() {
            this.originalColumnProperties = [];
            for ( var p in this.columns[0]) {
                this.originalColumnProperties.push(p);
            }
        },

        /**
         * get columns like original
         */
        getOriginalColumns : function() {
            // use this._columns here because this.colummns was converted to
            // object by dgrid
            // and arrayUtil.map can't loop an object.
            return arrayUtil.map(this._columns, function(col) {
                // the returned column, which will have the original properties
                // passed to dgrid
                var retCol = {};

                // fill properties according to the original column properties
                arrayUtil.forEach(this.originalColumnProperties, function(p) {
                    retCol[p] = col[p];
                });

                return retCol;
            }, this);
        }

    });
});