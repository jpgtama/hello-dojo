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
    './_dndSelector',
    'dijit/registry',
    'dijit/Tree',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/on',
    'dojo/query',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'dojo/touch',
    'dojo/_base/declare'
], function(_dndSelector, registry, dijitTree, lang, domClass, on, query, Memory, Observable, touch, declare) {
    var Tree = declare('app.registry.widget.tree.Tree', [
        dijitTree
    ], {

        _nodePixelIndent : 38,
        /**
         * 叶子节点disabled标识符
         */
        formDisabled : false,

        /**
         * set formDisabled Attr
         */
        _setFormDisabledAttr : function(val) {
            this.formDisabled = val;
            if (val) {
                this.disabledAllNode();
            } else {
                this.enabledAllNode();
            }
        },
        /**
         * on select switch
         */
        onSelectSwitch : function() {
            return true;
        },
        /**
         * dndController
         */
        dndController : _dndSelector,

        /**
         * override
         */
        postCreate : function() {
            this.inherited(arguments);
        },

        /**
         * override
         */
        _onClick : function(/* TreeNode */nodeWidget, /* Event */e) {
            /** Override Segment Start 加切换时的callback和非叶子节点不能选中 */
            var isSwitch = this.onSelectSwitch();

            if (!isSwitch || nodeWidget._iconClass != 'dijitLeaf') {
                return;
            }
            // call dndController click press manually
            this.dndController.onClickPress(e);
            /** Override Segment End */

            // summary:
            // Translates click events into commands for the controller to
            // process
            this.__click(nodeWidget, e, this.openOnClick, 'onClick');
        },

        /**
         * override
         */
        getRowClass : function(item, opened) {
            // summary:
            // Overridable function to return CSS class name to display row
            // item: dojo/data/Item
            // opened: Boolean
            // returns: String
            // CSS class name
            // tags:
            // extension
            /** Override Segment Start 给节点添加class */
            var cls = '';
            if (item.type) {
                cls = item.type + 'Node';
            }

            if (this.formDisabled && item.type != 'parent' && item.id != (this.selectedItem || {}).id) {
                cls = cls + ' disabledNode'
            }
            return cls;
            /** Override Segment End */
        },

        /**
         * disabled All Node
         */
        disabledAllNode : function() {
            query('.formNode', this.domNode).forEach(function(item, i) {
                if (!domClass.contains(item, 'dijitTreeRowSelected')) {
                    domClass.add(item, 'disabledNode')
                }
            });
        },

        /**
         * enabled All Node
         */
        enabledAllNode : function() {
            query('.formNode', this.domNode).forEach(function(item, i) {
                domClass.remove(item, 'disabledNode')
            });
        },

        /**
         * selected patient
         */
        selectedPatient : function() {
            var nodes = [];
            var node = this._getNextFocusableChild(null, 2);
            var firstNode = registry.byNode(node.containerNode.children[0]);
            this.focusNode(firstNode);
            nodes.push(firstNode);
            this.dndController.setSelection(nodes);
            this.rmoveDisabledCls(firstNode);
        },

        /**
         * override
         */
        getIconClass : function(/* dojo/data/Item */item, /* Boolean */opened) {
            return item.type == 'parent' ? 'dijitFolderOpened' : "dijitLeaf";
        },
        
        /**
         * override
         */
        getTooltip : function(/* dojo/data/Item */item) {
            return item.name;
        },
        
        /**
         * selected patient
         */
        getNodeByItem : function(item) {
            var firstNode = this._getRootOrFirstNode()
            var nextNode = this._getNext(firstNode);
            while (nextNode.item != item) {
                nextNode = this._getNext(nextNode);
            }

            return nextNode;
        },

        /**
         * selected patient by Item
         */
        selectedPatientByItem : function(item) {
            var nodes = [];
            var firstNode = this.getNodeByItem(item);
            this.focusNode(firstNode);
            nodes.push(firstNode)
            this.dndController.setSelection(nodes);
            this.rmoveDisabledCls(firstNode);
        },
        
        /**
         * getAllParentNodes
         */
        getParentItems : function(query) {
            query = query || {};
            // override parent
            return this.get('model').store.query(lang.mixin(query, {
                parent : "root"
            }));
        },

        /**
         * getParentItem
         */
        getParentItem : function(node) {
            if (node) {
                return this.get('model').store.query({
                    id : node.parent
                })[0];
            }
        },

        /**
         * 
         */
        getSelectedItem : function() {
            return this.selectedItem;
        },

        /**
         * rmoveDisabledCls
         */
        rmoveDisabledCls : function(node) {
            domClass.remove(node.rowNode, 'disabledNode')
        },
        
        /**
         * reload the tree.
         */
        reload: function() {
            // destroy all tree node
            if(this.rootNode){
                this.rootNode.destroyRecursive();
            }
            
            // remove root in model
            if(this.model.root){
                this.model.root = null;
            }
            
            // remove childrenCache
            this.model.childrenCache = {};
            
            // clear item nodes map
            this._itemNodesMap = {}
            
            // reload
            this._load();
        }

    });
    return Tree;
});