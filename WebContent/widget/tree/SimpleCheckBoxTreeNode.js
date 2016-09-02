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
 * FILE NAME: SimpleCheckBoxTreeNode.js
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
    return declare('SimpleCheckBoxTreeNode', [
        Tree._TreeNode
    ], {

        /**
         * selected attribute in data item
         */
        selectAttr : 'selected',

        /**
         * is selected
         */
        isSelected : function() {
            return this.item[this.selectAttr];
        },

        /**
         * toggle selected status
         */
        userToggleSelect : function() {
            // this.setSelected(!this.item[this.selectAttr]);
            var selAttr = this.selectAttr

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
         * Added, update selected status by listening to changes in store.
         */
        // _setItemAttr : function(val) {
        // this._set("item", val);
        //
        // // set selected status
        // if (this.selectAttr in this.item) {
        // this.setSelected(this.item[this.selectAttr]);
        // }
        // },
        // constructor : function(options) {
        //
        // this._initialSelect = this.selectAttr in this.item ?
        // this.item[this.selectAttr] : false;
        // },
        /**
         * Override
         */
        // postCreate : function() {
        // this.inherited(arguments);
        //
        // //
        // on(this.containerNode, 'EventedCheckBoxTreeNode', lang.hitch(this,
        // function(e) {
        // var s = e.selected;
        // this._childSelectedCount += s;
        // this.updateSelectStatusByChildren();
        // }));
        //
        // // initial selected status
        // var selectedStatus = this.selectAttr in this.item ?
        // this.item[this.selectAttr] : false;
        //
        // this.tree.expandChildrenDeferred.then(lang.hitch(this, function() {
        // this.setSelected(selectedStatus);
        // // this.updateParentSelectStatus();
        // }));
        // // if (selectedStatus) {
        // // }
        //
        // },
        // setChildItems : function(/* Object[] */items) {
        // this.inherited(arguments);
        //
        // this._childCount = items.length;
        // this._childSelectedCount = items.length;
        // },
        /**
         * Override
         */
        // setSelected : function(/* Boolean */selected, /* Boolean
        // */notUpdateAll) {
        // this.inherited(arguments);
        // this.item[this.selectAttr] = selected;
        //
        // if (!notUpdateAll) {
        // this.tree.updateSelectStatus();
        // }
        //
        // // this.visualStatus = visualStatus ? visualStatus : selected ? 'S'
        // // : 'D';
        //
        // // update children
        // // if (this.visualStatus !== 'I') {
        // // this.updateChildrenSelectStatus(selected);
        // // }
        // // // if (!notUpdateChildren) {
        // // // }
        // //
        // // // update parent
        // // // this.updateParentSelectStatus();
        // // if (!fromParent) {
        // // on.emit(this.domNode, 'EventedCheckBoxTreeNode', {
        // // bubbles : true,
        // // selected : this.visualStatus
        // // });
        // // }
        // },
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

    /**
     * update children select status
     */
    // updateChildrenSelectStatus : function(selected) {
    // var childNodes = this.getChildren();
    // array.forEach(childNodes, function(node) {
    // node.setSelected(selected, true);
    // });
    // },
    //
    // /**
    // * update parent selected status
    // */
    // updateParentSelectStatus : function() {
    // var parent = this.getParent();
    // if (parent && parent.updateSelectStatusByChildren) {
    // parent.updateSelectStatusByChildren();
    // }
    // },
    //
    // /**
    // * update status by children status
    // */
    // updateSelectStatusByChildren : function() {
    // // visual status for this node
    // var visualStatus;
    //
    // // check child nodes status
    // // var isAllSelected = true;
    // // var isAllDisselected = true;
    // // var childNodes = this.getChildren();
    // // for (var i = 0; i < childNodes.length; i++) {
    // // var node = childNodes[i];
    // // if (node.visualStatus === 'I') {
    // // isAllDisselected = false;
    // // isAllSelected = false;
    // // break;
    // // }
    // // if (node.visualStatus === 'S') {
    // // isAllDisselected = false;
    // // } else if (node.visualStatus === 'D') {
    // // isAllSelected = false;
    // // } else {
    // // throw 'Should not have any other state except [S, D, I]';
    // // }
    // // }
    //
    // // get visual status for this node
    // // if (isAllSelected) {
    // // visualStatus = 'S';
    // // } else if (isAllDisselected) {
    // // visualStatus = 'D';
    // // } else {
    // // visualStatus = 'I';
    // // }
    // if (this._childSelectedCount === 0) {
    // visualStatus = -1;
    // } else if (this._childSelectedCount === this._childCount) {
    // visualStatus = 1;
    // } else {
    // visualStatus = 0;
    // }
    //
    // // set status
    // if (visualStatus === 1) {
    // this.setSelected(true, true);
    // domClass.remove(this.rowNode, 'indeterminate');
    // } else if (visualStatus === -1) {
    // this.setSelected(false, true);
    // domClass.remove(this.rowNode, 'indeterminate');
    // } else if (visualStatus === 0) {
    // this.setSelected(true, true, 'I');
    // domClass.add(this.rowNode, 'indeterminate');
    // }
    // }
    });
});