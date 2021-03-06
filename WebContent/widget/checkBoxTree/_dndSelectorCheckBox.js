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
 * FILE NAME: _dndSelectorCheckBox.js
 * 
 * CREATED: 2016年3月4日 上午10:05:51
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/a11yclick',
    'dijit/tree/_dndSelector',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(a11yclick, _dndSelector, on, lang, declare) {

    return declare('_dndSelectorCheckBox', [
        _dndSelector
    ], {

        /**
         * Override
         */
        singular : true,

        /**
         * Override
         */
        constructor : function() {
            var events = this.events;
            // remove the 9th element
            // remove this -> on(this.tree.domNode, a11yclick.press,
            // lang.hitch(this,"onClickPress")),
            events[8].remove();

            // only allowed to click checkbox & label
            events.push(on(this.tree.domNode, on.selector(".dijitTreeRow .dijitTreeContent", a11yclick.press), lang.hitch(this, "onClickPress")));
        },

        /**
         * Override
         */
        setSelection : function(/* dijit/Tree._TreeNode[] */newSelection) {
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
         * update selection recursively, specifically for checkbox tree, in any
         * case of consistency
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