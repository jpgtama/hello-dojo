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
 * FILE NAME: CheckBoxTreeNode.js
 * 
 * CREATED: 2016年9月1日 上午10:53:16
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/Tree',
    'dojo/dom-class',
    'dojo/on',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Tree, domClass, on, array, lang, declare) {
    /**
     * This tree node has 3 visual states: S, D, I
     * 
     * S - selected
     * 
     * D - disselcted
     * 
     * I - indeterminate(has children partially selected or all children are
     * indeterminate)
     * 
     * 
     * For checkbox, there are only two states: selected or disselected. For
     * 'I', it's state is also selected in checkbox, but has a different visual
     * display.
     * 
     * 
     */
    return declare('app.widget.checkBoxTree.CheckBoxTreeNode', [
        Tree._TreeNode
    ], {

        /**
         * is selected
         */
        isSelected : function() {
            return this.item[this.tree.selectedAttr];
        },

        /**
         * toggle selected status when user clicks
         */
        userToggleSelect : function() {
            var selAttr = this.tree.selectedAttr;

            // this.item[selAttr] = !this.item[selAttr];
            var selected = !this.item[selAttr];

            // set children
            function dfs(node) {
                node.item[selAttr] = selected;
                var childrenNode = node.getChildren();
                for (var i = 0; i < childrenNode.length; i++) {
                    var c = childrenNode[i];
                    c.item[selAttr] = selected;

                    dfs(c);
                }
            }

            dfs(this);
        },

        /**
         * update visual selected status
         */
        updateSelected : function(visualStatus) {
            if (visualStatus == 'S') {
                this.setSelected(true);
                domClass.remove(this.rowNode, 'indeterminate');
            }
            if (visualStatus == 'D') {
                this.setSelected(false);
                domClass.remove(this.rowNode, 'indeterminate');
            }
            if (visualStatus == 'I') {
                this.setSelected(true);
                domClass.add(this.rowNode, 'indeterminate');
            }
        }

    });
});