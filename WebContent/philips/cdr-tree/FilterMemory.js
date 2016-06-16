//require([
//    'dojo/aspect',
//    'dojo/query',
//    'dojo/_base/array',
//    'dojo/Stateful',
//    'dijit/registry',
//    "dojo/_base/window",
//    'dojo/_base/lang',
//    "dojo/store/Memory",
//    "dojo/store/util/QueryResults",
//    "dijit/tree/ObjectStoreModel",
//    "dijit/Tree",
//    'js/appWidget/app/widget/tree/Tree',
//    'dojo/store/Observable',
//    'dojo/_base/declare',
//    "dojo/domReady!"
//], function(aspect, query, arrayUtil, Stateful, registry, win, lang, Memory, QueryResults, ObjectStoreModel, Tree, AppTree, Observable, declare) {
//    return declare(null, [
//        Memory
//    ], {
//
//        constructor : function(options) {
//            // summary:
//            // Creates a memory object store.
//            // options: dojo/store/Memory
//            // This provides any configuration information that will be mixed
//            // into the store.
//            // This should generally include the data property to provide the
//            // starting set of data.
//            for ( var i in options) {
//                this[i] = options[i];
//            }
//
//            // original data
//            this.originalData = this.data.slice(0);
//
//            // find out leaf id
//            var parentIds = arrayUtil.map(this.originalData, function(obj) {
//                return obj.parent;
//            });
//            parentIds = arrayUtil.filter(parentIds, function(id) {
//                return id;
//            });
//
//            var idProperty = this.idProperty;
//            var leafIds = arrayUtil.filter(this.originalData, function(obj) {
//                return parentIds.indexOf(obj[idProperty]) === -1;
//            });
//            leafIds = arrayUtil.map(leafIds, function(obj) {
//                return obj[idProperty];
//            });
//
//            // copy data
//            // this.data = this.originalData.slice(0);
//
//            // index data
//            this.setData(this.data || []);
//
//        },
//
//        query : function(query, options) {
//            // summary:
//            // Queries the store for objects.
//            // query: Object
//            // The query to use for retrieving objects from the store.
//            // options: dojo/store/api/Store.QueryOptions?
//            // The optional arguments to apply to the resultset.
//            // returns: dojo/store/api/Store.QueryResults
//            // The results of the query, extended with iterative methods.
//            //
//            // example:
//            // Given the following store:
//            //
//            // | var store = new Memory({
//            // | data: [
//            // | {id: 1, name: "one", prime: false },
//            // | {id: 2, name: "two", even: true, prime: true},
//            // | {id: 3, name: "three", prime: true},
//            // | {id: 4, name: "four", even: true, prime: false},
//            // | {id: 5, name: "five", prime: true}
//            // | ]
//            // | });
//            //
//            // ...find all items where "prime" is true:
//            //
//            // | var results = store.query({ prime: true });
//            //
//            // ...or find all items where "even" is true:
//            //
//            // | var results = store.query({ even: true });
//
//            // sort first
//            var qr = QueryResults(this.queryEngine(query, options)(this.data));
//
//            console.log('query: ', query, qr);
//
//            return qr;
//        },
//
//        // only for console query result
//        // put: function(object, options){
//        // // summary:
//        // // Stores an object
//        // // object: Object
//        // // The object to store.
//        // // options: dojo/store/api/Store.PutDirectives?
//        // // Additional metadata for storing the data. Includes an "id"
//        // // property if a specific id is to be used.
//        // // returns: Number
//        // var data = this.data,
//        // index = this.index,
//        // idProperty = this.idProperty;
//        // var id = object[idProperty] = (options && "id" in options) ?
//        // options.id : idProperty in object ? object[idProperty] :
//        // Math.random();
//        // if(id in index){
//        // // object exists
//        // if(options && options.overwrite === false){
//        // throw new Error("Object already exists");
//        // }
//        // // replace the entry in data
//        // data[index[id]] = object;
//        // }else{
//        // // add the new object
//        // index[id] = data.push(object) - 1;
//        // }
//
//        // // sort data
//        // this.setData(this.data);
//
//        // return id;
//        // },
//
//        // set data, with sorting
//        // setData: function(data){
//        // // summary:
//        // // Sets the given data as the source for this store, and indexes it
//        // // data: Object[]
//        // // An array of objects to use as the source of data.
//        // if(data.items){
//        // // just for convenience with the data format IFRS expects
//        // this.idProperty = data.identifier || this.idProperty;
//        // data = this.data = data.items;
//        // }else{
//        // this.data = data;
//        // }
//
//        // // sort
//        // if(this.order){
//        // this.data.sort(this.order);
//        // }
//
//        // // index
//        // this.index = {};
//        // for(var i = 0, l = data.length; i < l; i++){
//        // this.index[data[i][this.idProperty]] = i;
//        // }
//        // },
//
//        // filter data
//        setFilter : function(filter) {
//            // find out filtered data, including parent
//            var filteredData = this.queryEngine(filter)(this.originalData);
//
//            // parent id
//            var parentIds = this.getAllParentIds();
//
//            // only leaf
//            var idProperty = this.idProperty;
//            filteredData = arrayUtil.filter(filteredData, function(obj) {
//                return parentIds.indexOf(obj[idProperty]) === -1;
//            });
//
//            // find out parent
//            var parentData = {};
//            for (var i = 0; i < filteredData.length; i++) {
//                lang.mixin(parentData, this.getParentData(filteredData[i]));
//            }
//
//            // data to display = leaf + parent
//            var dataDisplay = filteredData;
//            for ( var i in parentData) {
//                dataDisplay.push(parentData[i]);
//            }
//
//            var dataDisplayIds = arrayUtil.map(dataDisplay, function(obj) {
//                return obj[idProperty];
//            });
//
//            // find out elements need to be removed
//            var dataToRemove = arrayUtil.filter(this.originalData, function(obj) {
//                return dataDisplayIds.indexOf(obj[idProperty]) === -1;
//            });
//
//            var dataToRemoveIds = arrayUtil.map(dataToRemove, function(obj) {
//                return obj[idProperty];
//            });
//
//            // remove elements
//            for (var i = 0; i < dataToRemoveIds.length; i++) {
//                console.log('remove: ', dataToRemoveIds[i]);
//                this.remove(dataToRemoveIds[i]);
//            }
//
//            // put elements
//            for (var i = 0; i < dataDisplay.length; i++) {
//                var id = dataDisplay[i][idProperty];
//
//                if (!this.get(id)) {
//                    console.log('put: ', id);
//                    this.put(dataDisplay[i]);
//                }
//            }
//        },
//
//        // order tree node
//        // order: function(a, b){
//        // return a.orderIndex - b.orderIndex;
//        // },
//
//        // check if this object has children
//        isThereChildren : function(obj) {
//            return this.getAllParentIds().indexOf(obj[this.idProperty]) !== -1;
//        },
//
//        getAllParentIds : function() {
//            // find out parent id
//            var parentIds = [];
//
//            for (var i = 0; i < this.originalData.length; i++) {
//                var d = this.originalData[i];
//                if (d.parent && parentIds.indexOf(d.parent) === -1) {
//                    parentIds.push(d.parent);
//                }
//            }
//
//            return parentIds;
//        },
//
//        getParentData : function(child) {
//
//            var parentData = {};
//
//            var query = {};
//            query[this.idProperty] = child.parent;
//            var p = this.queryEngine(query)(this.originalData);
//
//            if (p && p.length > 0) {
//                p = p[0];
//                parentData[p[this.idProperty]] = p;
//
//                if (p.parent) {
//                    lang.mixin(parentData, this.getParentData(p));
//                }
//            }
//
//            return parentData;
//        }
//
//    });
//});