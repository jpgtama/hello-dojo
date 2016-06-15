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
    'app/widget/_WidgetSearchMixin',
    './FilterMemory',
    './FilterTreeAttributesMixin',
    './_dndSelector',
    'dijit/registry',
    'dijit/Tree',
    'dijit/tree/ObjectStoreModel',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/on',
    'dojo/query',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'dojo/touch',
    'dojo/_base/declare'
], function(_WidgetSearchMixin, FilterMemory, FilterTreeAttributesMixin, _dndSelector, registry, dijitTree, ObjectStoreModel, arrayUtil, lang, domClass, on,
        query, Memory, Observable, touch, declare) {
    var Tree = declare('app.registry.widget.tree.Tree', [
        dijitTree,
        FilterTreeAttributesMixin,
        _WidgetSearchMixin
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
         * Override.
         * 
         * Currently we support array data & dojo.store API.
         * 
         * We don't support dijit.tree.Model because we don't have effort to
         * research it.
         * 
         * So users must pass an array data or a dojo.store, otherwise an error
         * will be thrown.
         * 
         * The attribute name for the array data and dojo.store is: originalData &
         * originalStore.
         * 
         * Because the attribute name 'store' was already used widely by
         * dijit/Tree. So we have to change the name to 'originalStore' and in
         * order to keep consistency we also change 'data' to 'originalData'.
         * 
         */
        postMixInProperties : function() {

            // check originalStore & originalData:
            // if originalStore is null, then check originalData
            // if originalData is null, then we throw an error
            // if originalData is not null, then create a store using data
            // if originalStore is not null, then use it directly
            if (!this.originalStore) {

                // if (this.originalData === null) {
                // throw new Error('no data provided for Tree.');
                // } else if (!lang.isArray(this.originalData)) {
                // throw new Error('data is not array.');
                // } else {
                // // create memory store
                // // var memoryStore =
                // // this._createMemoryStore(this.originalData);
                //
                // // set store
                // // this._createObservableStore(memoryStore);
                //
                // }
                this._setupStoreByData(this.originalData);

            } else {
                // this._createObservableStore(this.originalStore);

                this._setupStoreByStore(this.originalStore);
            }

            this.inherited(arguments);
        },

        /**
         * this function will create two stores: originalStore & store. Also
         * will create a tree model.
         * 
         * originalStore - is the store will interact with users.
         * 
         * store - will be used by tree, and data will be filtered from
         * originalStore to this store.
         * 
         * model - ObjectStoreModel, a connector between tree and store.
         * 
         */
        _setupStoreByData : function(/* Array */arrayData) {
            // check if data is null or not array
            if (!arrayData) {
                throw new Error('no data provided for Tree.');
            } else if (!lang.isArray(arrayData)) {
                throw new Error('data is not array.');
            } else {
                // original store which hold original data passed by user
                this.originalStore = this._createMemoryStore(arrayData);

                // set up store & model
                this._setupStoreByStore(this.originalStore);
            }
        },

        /**
         * this function will create the store which is used by the Tree and the
         * tree model.
         * 
         */
        _setupStoreByStore : function(originalStore) {
            // add getChildren function to original store
            // so users don't need to add this function
            originalStore.getChildren = this._getChildrenFunction();

            // store used by Tree, wrapped by Observable
            this.store = new Observable(lang.clone(originalStore));

            // create Tree model
            // query to get root node
            var rootQuery = {};
            rootQuery[this.idProperty] = this.rootId;

            this.model = new ObjectStoreModel({
                store : this.store,
                query : rootQuery,
                mayHaveChildren : function(item) {
                    // this function determine if a node is a branch, we search
                    // original store here
                    // because if we search the filtered store, the children may
                    // not come before parent.
                    return originalStore.getChildren(item).length > 0;
                }
            });
        },

        /**
         * create memory store
         * 
         */
        _createMemoryStore : function(arrayData) {
            // get attributes which will be passed to store
            var delegateAttrs = {
                idProperty : this.idProperty,
                sortAttribute : this.sortAttribute,
                sortOrder : this.sortOrder,
            };

            // create store
            var memoryStore = new Memory(lang.mixin({
                data : arrayData,
                getChildren : this._getChildrenFunction()
            }, delegateAttrs));

            return memoryStore;
        },

        /**
         * offer getChildren function to store
         */
        _getChildrenFunction : function() {
            return function(object) {
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
            };
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
            this._lastFilterText = text;
            this._filterStore(this.originalStore, text, this.store);
        },

        /**
         * filter store, from original store to tree store.
         * 
         * This function is used internally.
         */
        _filterStore : function(originalStore, filterText, treeStore) {
            // check filterText
            if (filterText === null || filterText === undefined) {
                filterText = '';
            }

            // convert to regex
            var queryReg = this._convertToRegExp(filterText);

            // query object which will be passed to store
            var query = {};
            query[this.searchAttr] = queryReg;

            // find out filtered data, including parent
            var filteredData = originalStore.query(query);

            // remove parent node
            filteredData = arrayUtil.filter(filteredData, function(obj) {
                return originalStore.getChildren(obj).length === 0;
            });

            // find out parent till to root
            var parentData = {};
            for (var i = 0; i < filteredData.length; i++) {
                lang.mixin(parentData, this.getParentData(originalStore, filteredData[i]));
            }

            // data to display = leaf + parent
            var dataDisplay = filteredData;
            for ( var i in parentData) {
                dataDisplay.push(parentData[i]);
            }

            // data to display ids
            var dataDisplayIds = arrayUtil.map(dataDisplay, function(obj) {
                return obj[this.idProperty];
            }, this);

            // data to remove
            var dataToRemove = originalStore.query(function(obj) {
                return dataDisplayIds.indexOf(obj[this.idProperty]) === -1;
            });

            // data to remove ids
            var dataToRemoveIds = arrayUtil.map(dataToRemove, function(obj) {
                return obj[this.idProperty];
            }, this);

            // remove elements from treeStore
            for (var i = 0; i < dataToRemoveIds.length; i++) {
                var id = dataToRemoveIds[i];
                if (treeStore.get(id)) {
                    // console.log('remove: ', id);
                    treeStore.remove(id);
                }
            }

            // put elements to treeStore
            for (var i = 0; i < dataDisplay.length; i++) {
                var id = dataDisplay[i][this.idProperty];

                if (!treeStore.get(id)) {
                    // console.log('put: ', id);
                    treeStore.put(dataDisplay[i]);
                }
            }
        },

        /**
         * find all the parents of a child in a store till to root.
         * 
         * There is a recursive in this function.
         * 
         */
        getParentData : function(store, child) {
            // use map to remove duplicate parent
            var parentData = {};

            // query parent
            var query = {};
            query[this.idProperty] = child.parent;
            var p = store.query(query);

            // if got, then recursively get upper parent
            if (p && p.length > 0) {
                p = p[0];
                // put to map, using id as key
                parentData[p[this.idProperty]] = p;

                // recursively find upper parent
                if (p.parent) {
                    lang.mixin(parentData, this.getParentData(store, p));
                }
            }

            return parentData;
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