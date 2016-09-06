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
 * FILE NAME: TreeMemory.js
 * 
 * CREATED: 2016年9月5日 下午3:39:48
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/store/Memory',
    'dojo/_base/declare'
], function(Memory, declare) {
    return declare('app.widget.store.TreeMemory', [
        Memory
    ], {

        /**
         * root id
         */
        rootId : 'root',

        /**
         * property for label displayed on tree
         */
        labelProperty : 'name',

        /**
         * label format function
         */
        labelFormatter : null,

        /**
         * parentProperty: used to getChildren
         */
        parentProperty : 'parent',

        /**
         * sort attribute
         */
        sortProperty : null,

        /**
         * sort order
         */
        sortOrder : 'asc',

        /**
         * add getChildren function to store
         */
        getChildren : function(object) {
            var condition = {};
            condition[this.parentProperty] = object[this.idProperty];

            var options = {};

            // add sort if has
            if (this.sortProperty) {
                options.sort = [
                    {
                        attribute : this.sortProperty,
                        descending : this.sortOrder === 'desc'
                    }
                ];
            }

            return this.query(condition, options);
        }
    });
});