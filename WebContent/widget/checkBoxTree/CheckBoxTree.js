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
    './CheckBoxTreeNode',
    './_dndSelectorCheckBox',
    'dijit/Tree',
    'dijit/tree/ObjectStoreModel',
    'dojo/_base/array',
    'dojo/_base/declare',
    'xstyle/css!./style/checkbox-tree.css'
], function(CheckBoxTreeNode, _dndSelector, Tree, ObjectStoreModel, array, declare) {

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
    return declare('CheckBoxTree', [
        Tree
    ], {

        /**
         * Override, add specific class name
         */
        baseClass : 'checkBoxTree dijitTree',

        /**
         * Override
         */
        showRoot : false,

        /**
         * Override, dndController
         */
        dndController : _dndSelector,

        /**
         * Override
         */
        autoExpand : true,

        /**
         * Override, to use our TreeNode class.
         */
        _createTreeNode : function(/* Object */args) {
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
         * Override
         */
        _store2model : function() {
            this.model = new ObjectStoreModel({
                store : this.store,
                labelAttr : this.store.labelProperty || 'name',
                query : {
                    id : this.store.rootId
                },
                mayHaveChildren : function(item) {
                    return this.store.getChildren(item).length > 0;
                },
                getLabel : function(item) {
                    var label = item[this.labelAttr];

                    if (this.store.labelFormatter) {
                        label = this.store.labelFormatter(label);
                    }

                    return label;
                }
            });
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