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

            // add renderHeaderCell function
            if (this.columns) {
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
        }

    });
});