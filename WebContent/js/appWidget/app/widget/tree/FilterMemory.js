define([
    'app/widget/_WidgetSearchMixin',
    'dojo/string',
    'dojo/_base/array',
    'dojo/_base/lang',
    "dojo/store/Memory",
    "dojo/store/util/QueryResults",
    'dojo/_base/declare',
], function(_WidgetSearchMixin, string, arrayUtil, lang, Memory, QueryResults, declare) {

    var FM = declare('app.widget.tree.FilterMemory', [
        Memory,
        _WidgetSearchMixin
    ], {
        // searchAttr: String
        // Search for items in the data store where this attribute (in the item)
        // matches what the user typed
        searchAttr : "name",

        /**
         * Override, we make a copy of the data to originalData
         */
        constructor : function(options) {
            // summary:
            // Creates a memory object store.
            // options: dojo/store/Memory
            // This provides any configuration information that will be mixed
            // into the store.
            // This should generally include the data property to provide the
            // starting set of data.
            for ( var i in options) {
                this[i] = options[i];
            }

            // copy original data
            this.originalData = this.data.slice(0);

            // index data
            this.setData(this.data || []);
        },

        /**
         * filter tree, using the same pattern as ComboBox:
         */
        setFilter : function(filterText) {
            // convert to regex
            var queryReg = this._convertToRegExp(filterText);

            // query object which will be passed to store
            var query = {};
            query[this.searchAttr] = queryReg;

            // find out filtered data, including parent
            var filteredData = this.queryEngine(query)(this.originalData);

            // parent id
            var parentIds = this.getAllParentIds();

            // only leaf
            var idProperty = this.idProperty;
            filteredData = arrayUtil.filter(filteredData, function(obj) {
                return parentIds.indexOf(obj[idProperty]) === -1;
            });

            // find out parent
            var parentData = {};
            for (var i = 0; i < filteredData.length; i++) {
                lang.mixin(parentData, this.getParentData(filteredData[i]));
            }

            // data to display = leaf + parent
            var dataDisplay = filteredData;
            for ( var i in parentData) {
                dataDisplay.push(parentData[i]);
            }

            var dataDisplayIds = arrayUtil.map(dataDisplay, function(obj) {
                return obj[idProperty];
            });

            // find out elements need to be removed
            var dataToRemove = arrayUtil.filter(this.originalData, function(obj) {
                return dataDisplayIds.indexOf(obj[idProperty]) === -1;
            });

            var dataToRemoveIds = arrayUtil.map(dataToRemove, function(obj) {
                return obj[idProperty];
            });

            // remove elements
            for (var i = 0; i < dataToRemoveIds.length; i++) {
                var id = dataToRemoveIds[i];
                if (this.get(id)) {
                    // console.log('remove: ', id);
                    this.remove(id);
                }
            }

            // put elements
            for (var i = 0; i < dataDisplay.length; i++) {
                var id = dataDisplay[i][idProperty];

                if (!this.get(id)) {
                    // console.log('put: ', id);
                    this.put(dataDisplay[i]);
                }
            }
        },

        /**
         * helper function
         */
        isThereChildren : function(obj) {
            // check if this object has children
            return this.getAllParentIds().indexOf(obj[this.idProperty]) !== -1;
        },

        /**
         * helper function
         */
        getAllParentIds : function() {
            // find out parent id
            var parentIds = [];

            for (var i = 0; i < this.originalData.length; i++) {
                var d = this.originalData[i];
                if (d.parent && parentIds.indexOf(d.parent) === -1) {
                    parentIds.push(d.parent);
                }
            }

            return parentIds;
        },

        /**
         * helper function
         */
        getParentData : function(child) {

            var parentData = {};

            var query = {};
            query[this.idProperty] = child.parent;
            var p = this.queryEngine(query)(this.originalData);

            if (p && p.length > 0) {
                p = p[0];
                parentData[p[this.idProperty]] = p;

                if (p.parent) {
                    lang.mixin(parentData, this.getParentData(p));
                }
            }

            return parentData;
        }

    });

    return FM;
});