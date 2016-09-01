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
    // this class provide a few default attributes
    return declare('app.widget.tree._FilterTreeAttributesMixin', null, {

        /**
         * id property
         */
        idProperty : 'id',

        /**
         * root id
         */
        rootId : 'root',

        /**
         * this is the data array
         */
        data : null,

        /**
         * labelAttr: String Get label for tree node from this attribute
         */
        labelAttr : 'name',

        /**
         * parentAttr: used to getChildren
         */
        parentAttr : 'parent',

        /**
         * searchAttr: String Search for items in the data store where this
         * attribute (in the item) matches what the user typed
         */
        searchAttr : 'name',

        /**
         * sort attribute
         */
        sortAttribute : 'orderIndex',

        /**
         * sort order
         */
        sortOrder : 'asc'

    });
});