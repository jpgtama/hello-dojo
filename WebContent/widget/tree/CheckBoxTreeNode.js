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
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Tree, domClass, array, lang, declare) {
    return declare('CheckBoxTreeNode', [
        Tree._TreeNode
    ], {

        /**
         * selected attribute in data item
         */
        selectAttr : 'selected',

        /**
         * S - selected, D - disselect, I - indeterminate
         */
        visualStatus : null,

        /**
         * is selected
         */
        isSelected : function() {
            return this.item.selected;
        },

        /**
         * toggle selected status
         */
        toggleSelected : function() {
            this.setSelected(!this.item.selected);
        },

        /**
         * Added, update selected status
         */
        _setItemAttr : function(val) {
            this._set("item", val);

            // set selected status
            if (this.selectAttr in this.item) {
                this.setSelected(this.item[this.selectAttr]);
            }
        },

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);

            // initial selected status
            if (this.selectAttr in this.item) {
                this.tree.expandChildrenDeferred.then(lang.hitch(this, function() {
                    this.setSelected(this.item[this.selectAttr], true);
                    this.updateParentSelectStatus();
                }));
            }
        },

        /**
         * Override
         */
        setSelected : function(/* Boolean */selected, /* Boolean */notUpdateChildren, visualStatus) {
            this.inherited(arguments);
            // this.selected = selected;
            this.item.selected = selected;
            this.visualStatus = visualStatus ? visualStatus : selected ? 'S' : 'D';

            // update children
            if (!notUpdateChildren) {
                this.updateChildrenSelectStatus(selected);
            }

            // update parent
            this.updateParentSelectStatus();

        },

        /**
         * update children select status
         */
        updateChildrenSelectStatus : function(selected) {
            var childNodes = this.getChildren();
            array.forEach(childNodes, function(node) {
                node.setSelected(selected);
            });
        },

        /**
         * update parent selected status
         */
        updateParentSelectStatus : function() {
            var parent = this.getParent();
            if (parent && parent.updateSelectStatusByChildren) {
                parent.updateSelectStatusByChildren();
            }
        },

        /**
         * update status by children status
         */
        updateSelectStatusByChildren : function() {
            // visual status for this node
            var visualStatus = '';

            // check child nodes status
            var isAllSelected = true;
            var isAllDisselected = true;
            var childNodes = this.getChildren();
            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i];
                if (node.visualStatus === 'I') {
                    isAllDisselected = false;
                    isAllSelected = false;
                    break;
                }
                if (node.visualStatus === 'S') {
                    isAllDisselected = false;
                } else {
                    isAllSelected = false;
                }
            }

            // set visual status for this node
            if (isAllSelected) {
                visualStatus = 'S';
            } else if (isAllDisselected) {
                visualStatus = 'D';
            } else {
                visualStatus = 'I';
            }

            // set status
            if (visualStatus === 'S') {
                this.setSelected(true, true);
                domClass.remove(this.rowNode, 'indeterminate');
            } else if (visualStatus === 'D') {
                this.setSelected(false, true);
                domClass.remove(this.rowNode, 'indeterminate');
            } else if (visualStatus === 'I') {
                this.setSelected(true, true, 'I');
                domClass.add(this.rowNode, 'indeterminate');
            }

        },

    });
});