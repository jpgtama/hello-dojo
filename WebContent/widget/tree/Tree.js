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
    'app/util/ResourceUtil',
    'app/widget/tree/_dndSelector',
    'app/widget/tree/_FilterTreeAttributesMixin',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/aspect',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/query',
    'dijit/Tree',
    'dijit/tree/ObjectStoreModel',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'dojo/_base/declare',
    'xstyle/css!./style/tree.css'
], function(i18n, _dndSelector, _FilterTreeAttributesMixin, arrayUtil, lang, aspect, domConstruct, domStyle, domQuery, dijitTree, ObjectStoreModel, Memory,
        Observable, declare) {
    var Tree = declare('app.widget.tree.Tree', [
        dijitTree,
        _FilterTreeAttributesMixin
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
         * original store
         */
        originalStore : null,

        /**
         * dndController
         */
        dndController : _dndSelector,

        /**
         * _nodePixelIndent
         */
        _nodePixelIndent : 38,

        /**
         * noDataMesage
         */
        noDataMesage : null,

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
            // if originalStore is null, then use originalData
            // else use it directly
            if (!this.originalStore) {
                this._setupStoreByData(this.originalData);
            } else {
                this._setupStoreByStore(this.originalStore);
            }

            this.inherited(arguments);
        },

        /**
         * override
         */
        startup : function() {
            this.inherited(arguments);

            this._createNoDataMessage();
        },

        /**
         * _createNoDataMessage
         */
        _createNoDataMessage : function() {
            // no data message
            var htmlString = lang.replace(
                    '<div class="noDataMessage" style="display: none;color: #aaa;font-size: 3em;padding-top: 3em;text-align: center;">{0}</div>', [
                        this.noDataMesage ? i18n.getText(this.noDataMesage) : ''
                    ]);
            var dom = domConstruct.toDom(htmlString);
            domQuery(".dijitTreeNode", this.domNode)[0].appendChild(dom);
        },

        /**
         * override
         */
        _onClick : function(/* TreeNode */nodeWidget, /* Event */e) {
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
        getTooltip : function(/* dojo/data/Item */item) {
            return item.label;
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
                cls = 'leafNode';
            } else {
                cls = 'parentNode';
            }

            return cls;
            /** Override Segment End */
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
                // first original store which hold original data passed by user
                // and then set up store & model
                this._setupStoreByStore(this._createMemoryStore(arrayData));
            }
        },

        /**
         * this function will create the store which is used by the Tree and the
         * tree model.
         * 
         * We wrap original store with Observable, because we need to observe
         * the changes in original store so that the tree store can be changed
         * by it.
         * 
         * We then mixin delegate attributes and add getChildren function to
         * store.
         * 
         */
        _setupStoreByStore : function(originalStore) {
            // Don't wrap with Observable
            this.originalStore = originalStore;

            // get attributes which will be passed to store
            var delegateAttrs = this._getStoreDelegateAttrs();
            lang.mixin(originalStore, delegateAttrs);

            // add getChildren function to original store
            // so users don't need to add this function
            this._addGetChildrenFunctionToStore(originalStore);

            // store used by Tree, DON'T wrap by Observable because
            // Observable has a very low performance
            this.store = lang.clone(originalStore);

            // query to get root node
            var rootQuery = {};
            rootQuery[this.idProperty] = this.rootId;

            // create Tree model
            this.model = new ObjectStoreModel({
                labelAttr : this.labelAttr,
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
         * batch remove data from tree, leaving items parent still there.
         */
        batchRemove : function(items) {
            this._batchRemoveStore(this.originalStore, items);
            this._batchRemoveStore(this.store, items);

            // MUST refresh when batch remove, need to keep parent
            this.refresh();
        },

        /**
         * batch add data back to tree
         */
        batchAdd : function(items) {
            this._batchAddStore(this.originalStore, items);
            this._batchAddStore(this.store, items);

            // MUST reload when batch add, need to show the data & their parents
            this.reload();
        },

        /**
         * batch remove data from a store
         */
        _batchRemoveStore : function(store, items) {
            if (lang.isArray(items)) {

                var idToRemove = [];
                for (var i = 0; i < items.length; i++) {
                    idToRemove.push(items[i][this.idProperty]);
                }

                // new data
                var newData = [];

                // find out any data which id is not in the inToRemove array
                for (var i = 0; i < store.data.length; i++) {
                    if (idToRemove.indexOf(store.data[i][this.idProperty]) === -1) {
                        newData.push(store.data[i]);
                    }
                }

                // set data
                store.setData(newData);
            }
        },

        /**
         * batch add data to a store
         */
        _batchAddStore : function(store, items) {
            if (lang.isArray(items)) {
                // new data
                var newData = store.data.concat(items);

                // set data
                store.setData(newData);
            }
        },

        /**
         * create memory store
         * 
         */
        _createMemoryStore : function(arrayData) {
            // get attributes which will be passed to store
            var delegateAttrs = this._getStoreDelegateAttrs();

            // create store
            var memoryStore = new Memory(lang.mixin({
                data : arrayData
            }, delegateAttrs));

            // add getChildren function
            this._addGetChildrenFunctionToStore(memoryStore);

            return memoryStore;
        },

        /**
         * get delegate attrs for store
         */
        _getStoreDelegateAttrs : function() {
            return {
                idProperty : this.idProperty,
                sortAttribute : this.sortAttribute,
                sortOrder : this.sortOrder,
                parentAttr : this.parentAttr
            };
        },

        /**
         * offer getChildren function to store, override any previous
         * getChildren method, because we use 'parent' & sort.
         */
        _addGetChildrenFunctionToStore : function(store) {
            store.getChildren = function(object) {
                var condition = {};
                condition[this.parentAttr] = object[this.idProperty];

                return this.query(condition, {
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

            // remove parent node because we only search leaf node
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

            // set tree store data
            treeStore.setData(dataDisplay);

            // set no data message
            var noDataMessageNode = domQuery('.noDataMessage', this.domNode)[0];
            domStyle.set(noDataMessageNode, 'display', filteredData.length == 0 ? '' : 'none')

            // refresh tree
            this.refresh();

        },

        /**
         * refresh tree by this.store
         */
        refresh : function() {
            // clear model children cache to fix bug #357973
            this.model.childrenCache = {};

            // make sure root is defined
            var root = this.store.get(this.rootId);
            if (!root) {
                this.store.put({
                    id : this.rootId
                });
            }
            root = this.store.get(this.rootId);

            // we use breadth first search(BFS) to search data, so need a queue
            var itemQ = [
                root
            ];

            while (itemQ.length > 0) {
                var item = itemQ.shift();

                var children = this.store.getChildren(item);

                this._onItemChildrenChange(item, children);

                if (children.length > 0) {
                    itemQ = itemQ.concat(children);
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

            // get parent
            var p = store.get(child[this.parentAttr]);

            // if got, then recursively get upper parent
            if (p) {
                // put to map, using id as key
                parentData[p[this.idProperty]] = p;

                // recursively find upper parent
                if (p[this.parentAttr]) {
                    lang.mixin(parentData, this.getParentData(store, p));
                }
            }

            return parentData;
        },

        /**
         * reload the tree. We use setFilter to do the job currently.
         */
        reload : function() {
            this.setFilter(this._lastFilterText);
        }

    });
    return Tree;
});