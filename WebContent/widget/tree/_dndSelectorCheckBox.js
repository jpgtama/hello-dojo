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
 * FILE NAME: Tree.js
 * 
 * CREATED: 2016年3月4日 上午10:05:51
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/array', // array.filter array.forEach array.map
    'dojo/_base/declare', // declare
    'dojo/_base/kernel', // global
    'dojo/_base/lang', // lang.hitch
    'dojo/dnd/common',
    'dojo/dom', // isDescendant
    'dojo/mouse', // mouse.isLeft
    'dojo/on',
    'dojo/touch',
    'dijit/tree/_dndSelector',
    'dojo/_base/declare'
], function(array, declare, kernel, lang, dndCommon, dom, mouse, on, touch, _dndSelector, declare) {

    return declare('app.widget.tree._dndSelector', [
        _dndSelector
    ], {

        singular : true,

        /**
         * Override
         */
        constructor : function() {
            /** Override Segment Start remove onClickPress */
            // var events = this.events;
            // // remove the 9th element
            // // remove this -> on(this.tree.domNode, a11yclick.press,
            // // lang.hitch(this,"onClickPress")),
            // events[8].remove();
            /** Override Segment End */
        },

        /**
         * override
         */
        // selection related events
        // onClickPress : function(e) {
        // // summary:
        // // Event processor for onmousedown/ontouchstart/onkeydown
        // // corresponding to a click event
        // // e: Event
        // // onmousedown/ontouchstart/onkeydown event
        // // tags:
        // // protected
        //
        // // ignore mouse or touch on expando node
        // if (this.current && this.current.isExpandable &&
        // this.tree.isExpandoNode(e.target, this.current)) {
        // return;
        // }
        //
        // if (e.type == "mousedown" && mouse.isLeft(e)) {
        // // Prevent text selection while dragging on desktop, see #16328.
        // // But don't call preventDefault()
        // // for mobile because it will break things completely, see
        // // #15838. Also, don't preventDefault() on
        // // MSPointerDown or pointerdown events, because that stops the
        // // mousedown event from being generated,
        // // see #17709.
        // // TODO: remove this completely in 2.0. It shouldn't be needed
        // // since dojo/dnd/Manager already
        // // calls preventDefault() for the "selectstart" event. It can
        // // also be achieved via CSS:
        // //
        // http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting
        // e.preventDefault();
        // }
        //
        // var treeNode = e.type == "keydown" ? this.tree.focusedChild :
        // this.current;
        //
        // if (!treeNode) {
        // // Click must be on the Tree but not on a TreeNode, happens
        // // especially when Tree is stretched to fill
        // // a pane of a BorderContainer, etc.
        // return;
        // }
        //
        // var copy = dndCommon.getCopyKeyState(e), id = treeNode.id;
        //
        // // if shift key is not pressed, and the node is already in the
        // // selection,
        // // delay deselection until onmouseup so in the case of DND,
        // // deselection
        // // will be canceled by onmousemove.
        // /** Override Segment Start */
        // this._doDeselect = false;
        // /** Override Segment End */
        // this.userSelect(treeNode, copy, e.shiftKey);
        // },
        /**
         * setSelection
         */
        // setSelection : function(/* dijit/Tree._TreeNode[] */newSelection) {
        // // summary:
        // // set the list of selected nodes to be exactly newSelection. All
        // // changes to the
        // // selection should be passed through this function, which ensures
        // // that derived
        // // attributes are kept up to date. Anchor will be deleted if it has
        // // been removed
        // // from the selection, but no new anchor will be added by this
        // // function.
        // // newSelection: Node[]
        // // list of tree nodes to make selected
        // array.forEach(newSelection, lang.hitch(this, function(node) {
        // var selected = !(node.labelNode.getAttribute("aria-selected") ==
        // 'true');
        // node.setSelected(selected);
        // this.selection[node.id] = node;
        // this.checkChildrenNodes(node, selected);
        // this.checkParentNodes(node, selected);
        // }));
        // this._updateSelectionProperties();
        // },
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
                    // node.setSelected(true);
                    node.toggleSelected();
                    if (node.isSelected()) {
                        this.selection[node.id] = node;
                    } else {
                        delete this.selection[node.id];
                    }
                }

            } else {
                var oldSelection = this.getSelectedTreeNodes();
                array.forEach(this._setDifference(oldSelection, newSelection), lang.hitch(this, function(node) {
                    node.setSelected(false);
                    if (this.anchor == node) {
                        delete this.anchor;
                    }
                    delete this.selection[node.id];
                }));
                array.forEach(this._setDifference(newSelection, oldSelection), lang.hitch(this, function(node) {
                    node.setSelected(true);
                    this.selection[node.id] = node;
                }));
            }

            this._updateSelectionProperties();
        },

        /**
         * checkChildrenNodes
         */
        checkChildrenNodes : function(/* dijit/Tree._TreeNode */node, /* Boolean */checked) {

            var _this = this;
            var childBranches = node.getChildren();

            return array.map(childBranches, lang.hitch(this, function(item) {
                item.setSelected(checked);
                if (checked) {
                    this.selection[item.id] = item;
                } else {
                    delete this.selection[item.id];
                }
                _this.checkChildrenNodes(item, checked);
            }));
        },

        /**
         * checkParentNodes
         */
        checkParentNodes : function(/* dijit/Tree._TreeNode */node, /* Boolean */checked) {
            var parent = node.getParent();
            if (parent && parent.item) {
                if (checked) {
                    this.selection[parent.id] = parent;
                } else {
                    delete this.selection[parent.id];
                }

                var noSelected = true;
                if (!checked) {
                    var childBranches = parent.getChildren();
                    // 如果取消时，要判断同级目录下还有没有选中的，如果有，就不执行反选操作
                    noSelected = !array.some(childBranches, function(item) {
                        return item.labelNode.getAttribute("aria-selected") == 'true';
                    });
                }
                // parent 不是node，说明已经到最顶层了，不执行操作
                if (parent.setSelected) {
                    if (noSelected) {
                        parent.setSelected(checked);
                    }
                    this.checkParentNodes(parent, checked);
                }
            }
        }

    // userSelect : function(node, multi, range) {
    // // summary:
    // // Add or remove the given node from selection, responding
    // // to a user action such as a click or keypress.
    // // multi: Boolean
    // // Indicates whether this is meant to be a multi-select action (e.g.
    // // ctrl-click)
    // // range: Boolean
    // // Indicates whether this is meant to be a ranged action (e.g.
    // // shift-click)
    // // tags:
    // // protected
    //
    // this.setSelection([
    // node
    // ]);
    // this.anchor = node;
    // }
    });
});