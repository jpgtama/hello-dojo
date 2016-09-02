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
 * FILE NAME: SimpleCheckBoxTree.js
 * 
 * CREATED: 2016年9月1日 上午10:00:20
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    './SimpleCheckBoxTreeNode',
    './_dndSelectorCheckBoxSimple',
    'dijit/Tree',
    'dojo/_base/array',
    'dojo/_base/declare',
    'xstyle/css!./style/checkbox-tree.css'
], function(CheckBoxTreeNode, _dndSelector, Tree, array, declare) {

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
    return declare('SimpleCheckBoxTree', [
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
        },

        /**
         * Override
         */
        onLoad : function() {
            // handle select
            this.updateSelectStatus();
        },

        /**
         * update select status using Depth First Search
         * 
         * S - selected, D - disselect, I - indeterminate
         * 
         */
        updateSelectStatus : function() {
            var root = this.model.root;
            var store = this.model.store;
            var tree = this;

            // DFS
            function dfs(item) {
                var children = store.getChildren(item);
                var S, D, I, status;
                if (children.length > 0) {
                    var cs = [];
                    for (var i = 0; i < children.length; i++) {
                        var c = children[i];
                        var childStatus = dfs(c);
                        cs.push(childStatus);
                    }

                    // set item status
                    S = array.every(cs, function(s) {
                        return s === 'S';
                    });
                    D = array.every(cs, function(s) {
                        return s === 'D';
                    });

                    I = !S && !D;

                    if (S) {
                        status = 'S';
                    } else if (D) {
                        status = 'D';
                    } else if (I) {
                        status = 'I';
                    } else {
                        throw 'should not be any other status.';
                    }

                } else {
                    status = 'selected' in item ? item.selected ? 'S' : 'D' : 'D';
                }

                // set status
                item.selected = [
                    'S',
                    'I'
                ].indexOf(status) !== -1;

                // render view
                var node = tree.getNodesByItem(item)[0];
                node.updateSelected(status);

                return status;
            }

            dfs(root);

            // update dndController selection, in any case of consistency
            this.dndController.updateSelection(tree.getNodesByItem(root)[0]);

        }

    });
});