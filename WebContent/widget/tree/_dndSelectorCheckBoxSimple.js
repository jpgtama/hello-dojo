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
 * FILE NAME: _dndSelectorCheckBoxSimple.js
 * 
 * CREATED: 2016年3月4日 上午10:05:51
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/tree/_dndSelector',
    'dojo/_base/declare'
], function(_dndSelector, declare) {

    return declare('_dndSelectorCheckBoxSimple', [
        _dndSelector
    ], {

        singular : true,

        /**
         * Override
         */
        setSelection : function(/* dijit/Tree._TreeNode[] */newSelection) {
            // summary:
            // set the list of selected nodes to be exactly newSelection. All
            // changes to the
            // selection should be passed through this function, which ensures
            // that derived
            // attributes are kept up to date. Anchor will be deleted if it has
            // been removed
            // from the selection, but no new anchor will be added by this
            // function.
            // newSelection: Node[]
            // list of tree nodes to make selected
            if (this.singular) {
                var node = newSelection[0];

                if (node) {
                    // update data item
                    node.userToggleSelect();
                    // mvc to render view
                    this.tree.updateSelectStatus();

                    // update selection
                    this.updateSelection(node);
                    this._updateSelectionProperties();
                }

            } else {
                this.inherited(arguments);
            }

        },

        /**
         * update selection recursively, specifically for checkbox tree
         */
        updateSelection : function(node) {
            var _this = this;
            function update(node) {
                if (node.isSelected()) {
                    _this.selection[node.id] = node;
                } else {
                    delete _this.selection[node.id];
                }
            }

            function dfs(node) {
                update(node);

                var childrenNode = node.getChildren();
                for (var i = 0; i < childrenNode.length; i++) {
                    var c = childrenNode[i];
                    update(c);
                    dfs(c);
                }
            }

            dfs(node);
        }

    });
});