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
 * FILE NAME: FilterTreeAttributesMixin.js
 * 
 * CREATED: 2016年6月13日 下午3:09:11
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/declare'
], function(declare) {
    return declare('app.widget.tree.FilterTreeAttributesMixin', null, {

        idProperty : 'id',

        /**
         * this is the data array
         */
        data : null,

        /**
         * queryExpr: String This specifies what query is sent to the data
         * store, based on what the user has typed. Changing this expression
         * will modify whether the results are only exact matches, a "starting
         * with" match, etc. `${0}` will be substituted for the user text. `*`
         * is used for wildcards. `${0}*` means "starts with", `*${0}*` means
         * "contains", `${0}` means "is"
         */
        queryExpr : "*${0}*",

        /**
         * ignoreCase: Boolean Set true if the query should ignore case when
         * matching possible items
         */
        ignoreCase : true,

        /**
         * searchAttr: String Search for items in the data store where this
         * attribute (in the item) matches what the user typed
         */
        searchAttr : "name",

        sortAttribute : 'orderIndex',

        sortOrder : 'asc'

    });
});