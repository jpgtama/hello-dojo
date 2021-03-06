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
 * FILE NAME: CheckBoxTree.js
 * 
 * CREATED: 2016年9月1日 上午10:00:20
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    './EventedCheckBoxTreeNode',
    './_dndSelectorCheckBox',
    'dijit/Tree',
    'dojo/_base/declare',
    'xstyle/css!./style/checkbox-tree.css'
], function(CheckBoxTreeNode, _dndSelector, Tree, declare) {

    // change tree node class
    var TreeNode = CheckBoxTreeNode;
    Tree._TreeNode = TreeNode;

    /**
     * 
     * This is a tree with checkbox. The data store must be Observable.
     * 
     * There is only one way to set select status:
     * 
     * 1. add a selected attribute in data store, e.g. 'selected'.
     * 
     * 
     * 
     */
    return declare('', [
        Tree
    ], {

        /**
         * add specific class name
         */
        baseClass : 'checkBoxTree dijitTree',

        /**
         * dndController
         */
        dndController : _dndSelector,

        /**
         * Override, to use our TreeNode class.
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
            return new TreeNode(args);
        }

    });
});