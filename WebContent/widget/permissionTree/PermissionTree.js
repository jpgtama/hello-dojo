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
 * FILE NAME: PermissionTree.js
 * 
 * CREATED: 2016年8月31日 下午1:23:52
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/Tree',
    'dojo/_base/declare'
], function(Tree, declare) {
    return declare('PermissionTree', [
        Tree
    ], {

        treeNode : null,

        constructor : function(options) {
        },

        /**
         * Override
         */
        _createTreeNode : function(/* Object */args) {
            // summary:
            // creates a TreeNode
            // description:
            // Developers can override this method to define their own TreeNode
            // class;
            // However it will probably be removed in a future release in favor
            // of a way
            // of just specifying a widget for the label, rather than one that
            // contains
            // the children too.
            var TreeNode = this.treeNode;

            var tn = new TreeNode(args);

            return tn;
        }

    });
});