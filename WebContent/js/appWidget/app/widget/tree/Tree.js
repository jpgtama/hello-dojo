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
    './FilterMemory',
    './FilterTreeAttributesMixin',
    './_dndSelector',
    'dijit/registry',
    'dijit/Tree',
    'dijit/tree/ObjectStoreModel',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/on',
    'dojo/query',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'dojo/touch',
    'dojo/_base/declare'
], function(FilterMemory, FilterTreeAttributesMixin, _dndSelector, registry, dijitTree, ObjectStoreModel, lang, domClass, on, query, Memory, Observable, touch,
        declare) {
    var Tree = declare('app.registry.widget.tree.Tree', [
        dijitTree,
        FilterTreeAttributesMixin
    ], {

        /**
         * hide root
         */
        showRoot : false,

        /**
         * auto expand
         */
        autoExpand : true,

        /**
         * 
         */
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
         * Override
         */
        postMixInProperties : function() {

            // check data/store/model
            if (this.model === null) {

                if (this.store === null) {

                    if (this.data === null) {
                        throw new Error('no data provided for Tree.');
                    } else if (!lang.isArray(this.data)) {
                        throw new Error('data is not array.');
                    } else {
                        // create memory store
                        var memoryStore = this._createMemoryStore(this.data);

                        // set store
                        this._createObservableStore(memoryStore);
                    }

                } else {
                    this._createObservableStore(this.store);
                }
            }

            this.inherited(arguments);
        },

        /**
         * create memory store
         */
        _createMemoryStore : function(arrayData) {
            // get attributes which will be passed to store
            var delegateAttrs = {
                idProperty : this.idProperty,
                searchAttr : this.searchAttr,
                sortAttribute : this.sortAttribute,
                sortOrder : this.sortOrder,
                queryExpr: this.queryExpr,
                ignoreCase: this.ignoreCase
            };

            // create store
            var memoryStore = new FilterMemory(lang.mixin({
                data : arrayData,
                getChildren : function(object) {
                    return this.query({
                        parent : object[this.idProperty]
                    }, {
                        sort : [
                            {
                                attribute : this.sortAttribute,
                                descending : this.sortOrder === 'desc'
                            }
                        ]
                    });
                }
            }, delegateAttrs));

            return memoryStore;
        },

        /**
         * create observable store
         */
        _createObservableStore : function(store) {
            // check store
            if (!store) {
                throw new Error('store is not defined.')
            } else if (!store.declaredClass) {
                throw new Error('store declaredClass is not defined.')
            } else if (this._getDeclaredClassName(store.declaredClass) !== 'FilterMemory') {
                throw new Error('you must use FilterMemory store.')
            }

            // set store
            this.store = new Observable(store);

            // set model
            this.model = new ObjectStoreModel({
                store : this.store,
                query : {
                    id : 'root'
                },
                mayHaveChildren : function(item) {
                    return this.store.isThereChildren(item);
                }
            });
        },

        /**
         * get decalred class simple name
         */
        _getDeclaredClassName : function(declaredClass) {
            return declaredClass.substr(declaredClass.lastIndexOf('.') + 1);
        },

        /**
         * filter tree with user input
         */
        setFilter : function(text) {
            this.store.setFilter(text);
        },

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);
        },

        /**
         * Override
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
        reload : function() {
            // destroy all tree node
            if (this.rootNode) {
                this.rootNode.destroyRecursive();
            }

            // remove root in model
            if (this.model.root) {
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