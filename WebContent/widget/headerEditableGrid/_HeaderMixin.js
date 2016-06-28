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
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(_Header, arrayUtil, lang, declare) {

    return declare(null, {
        // summary:
        // This is class will add renderHeaderCell function to dgrid columns
        // We use another widget to render dgrid header, so we can add
        // additional
        // functions

        _headerInstances : null,

        /**
         * Override
         */
        postMixInProperties : function() {

            // save original columns, so dgrid's changes on columns will not
            // affect original columns passed by user
            this.originalColumns = this.columns;
            this.columns = lang.clone(this.originalColumns);

            if (this.columns && this.columns.length > 0) {

                // 
                this._headerInstances = [];

                // 
                var _headerMixin = this;

                // loop to add sortable & renderHeaderCell function
                for (var i = 0; i < this.columns.length; i++) {
                    var col = this.columns[i];
                    col.originalCol = this.originalColumns[i];

                    // disable sort because the sort arrow can mess up the
                    // editor style
                    col.sortable = false;

                    // add renderHeaderCell function
                    col.renderHeaderCell = function(node) {
                        var thisCol = this;
                        // create _Header
                        var h = new _Header({
                            headerContent : thisCol.label,
                            onChange : function(v) {
                                thisCol.label = v;
                                thisCol.originalCol.label = v;
                            }
                        });

                        // add to _headerMixin header instances so can be
                        // destroyed
                        _headerMixin._headerInstances.push(h);

                        // use _Header to render header
                        return h.domNode;
                    };
                }
            }

            // call parent
            this.inherited(arguments);
        },

        /**
         * Override, in order to clean up editor when grid was destroyed.
         * 
         */
        destroy : function() {
            // clean up header
            this._headerCleanup();

            // call parent
            this.inherited(arguments);
        },

        /**
         * clean up _header
         */
        _headerCleanup : function() {
            // destroy _header in header instances
            arrayUtil.forEach(this._headerInstances, function(h) {
                if (h.destroy) {
                    h.destroy();
                } else {
                    console.error('no destory method found in header: ', h);
                }
            }, this);

        }

    });
});