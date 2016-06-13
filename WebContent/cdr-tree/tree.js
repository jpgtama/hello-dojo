require([
    'js/appWidget/app/widget/tree/FilterMemory',
    'dojo/aspect',
    'dojo/query',
    'dojo/_base/array',
    'dojo/Stateful',
    'dijit/registry',
    "dojo/_base/window",
    'dojo/_base/lang',
    "dojo/store/Memory",
    "dojo/store/util/QueryResults",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree",
    'js/appWidget/app/widget/tree/Tree',
    'dojo/store/Observable',
    'dojo/_base/declare',
    "dojo/domReady!"
], function(FilterMemory, aspect, query, arrayUtil, Stateful, registry, win, lang, Memory, QueryResults, ObjectStoreModel, Tree, AppTree, Observable, declare) {

    // data
    var data = [
        {
            "name" : "US Government",
            "id" : "root",
            "orderIndex" : 1
        },
        {
            "name" : "Congress",
            "id" : "congress",
            "parent" : "root",
            "orderIndex" : 2
        },
        {
            "name" : "House of Representatives",
            "id" : "house",
            "parent" : "congress",
            "orderIndex" : 3
        },
        {
            "name" : "Senate",
            "id" : "senate",
            "parent" : "congress",
            "orderIndex" : 4
        },
        {
            "name" : "Executive",
            "id" : "exec",
            "parent" : "root",
            "orderIndex" : 5
        },
        {
            "name" : "President",
            "id" : "pres",
            "parent" : "exec",
            "orderIndex" : 6
        },
        {
            "name" : "Vice President",
            "id" : "vice-pres",
            "parent" : "exec",
            "orderIndex" : 7
        },
        {
            "name" : "Secretary of State",
            "id" : "state",
            "parent" : "exec",
            "orderIndex" : 8
        },
        {
            "name" : "Cabinet",
            "id" : "cabinet",
            "parent" : "exec",
            "orderIndex" : 9
        },
        {
            "name" : "National Security Council",
            "id" : "security",
            "parent" : "cabinet",
            "orderIndex" : 10
        },
        {
            "name" : "Council of Economic Advisers",
            "id" : "economic",
            "parent" : "cabinet",
            "orderIndex" : 11
        },
        {
            "name" : "Office of Management and Budget",
            "id" : "budget",
            "parent" : "cabinet",
            "orderIndex" : 12
        },
        {
            "name" : "Judicial",
            "id" : "judicial",
            "parent" : "root",
            "orderIndex" : 13
        }
    ];

    window.registry = registry;
    window.switchForm = true;
    window.data = data;
    window.arrayUtil = arrayUtil;

    // var FilterMemory = declare([
    // Memory
    // ], {
    // filter : null,
    //
    // constructor : function(options) {
    // // summary:
    // // Creates a memory object store.
    // // options: dojo/store/Memory
    // // This provides any configuration information that will be mixed
    // // into the store.
    // // This should generally include the data property to provide the
    // // starting set of data.
    // for ( var i in options) {
    // this[i] = options[i];
    // }
    //
    // // original data
    // this.originalData = this.data.slice(0);
    //
    // // find out leaf id
    // var parentIds = arrayUtil.map(this.originalData, function(obj) {
    // return obj.parent;
    // });
    // parentIds = arrayUtil.filter(parentIds, function(id) {
    // return id;
    // });
    //
    // var idProperty = this.idProperty;
    // var leafIds = arrayUtil.filter(this.originalData, function(obj) {
    // return parentIds.indexOf(obj[idProperty]) === -1;
    // });
    // leafIds = arrayUtil.map(leafIds, function(obj) {
    // return obj[idProperty];
    // });
    //
    // // copy data
    // // this.data = this.originalData.slice(0);
    //
    // // index data
    // this.setData(this.data || []);
    //
    // },
    //
    // query : function(query, options) {
    // // summary:
    // // Queries the store for objects.
    // // query: Object
    // // The query to use for retrieving objects from the store.
    // // options: dojo/store/api/Store.QueryOptions?
    // // The optional arguments to apply to the resultset.
    // // returns: dojo/store/api/Store.QueryResults
    // // The results of the query, extended with iterative methods.
    // //
    // // example:
    // // Given the following store:
    // //
    // // | var store = new Memory({
    // // | data: [
    // // | {id: 1, name: "one", prime: false },
    // // | {id: 2, name: "two", even: true, prime: true},
    // // | {id: 3, name: "three", prime: true},
    // // | {id: 4, name: "four", even: true, prime: false},
    // // | {id: 5, name: "five", prime: true}
    // // | ]
    // // | });
    // //
    // // ...find all items where "prime" is true:
    // //
    // // | var results = store.query({ prime: true });
    // //
    // // ...or find all items where "even" is true:
    // //
    // // | var results = store.query({ even: true });
    //
    // // sort first
    // var qr = QueryResults(this.queryEngine(query, options)(this.data));
    //
    // console.log('query: ', query, qr);
    //
    // return qr;
    // },
    //
    // // only for console query result
    // // put: function(object, options){
    // // // summary:
    // // // Stores an object
    // // // object: Object
    // // // The object to store.
    // // // options: dojo/store/api/Store.PutDirectives?
    // // // Additional metadata for storing the data. Includes an "id"
    // // // property if a specific id is to be used.
    // // // returns: Number
    // // var data = this.data,
    // // index = this.index,
    // // idProperty = this.idProperty;
    // // var id = object[idProperty] = (options && "id" in options) ?
    // // options.id : idProperty in object ? object[idProperty] :
    // // Math.random();
    // // if(id in index){
    // // // object exists
    // // if(options && options.overwrite === false){
    // // throw new Error("Object already exists");
    // // }
    // // // replace the entry in data
    // // data[index[id]] = object;
    // // }else{
    // // // add the new object
    // // index[id] = data.push(object) - 1;
    // // }
    //
    // // // sort data
    // // this.setData(this.data);
    //
    // // return id;
    // // },
    //
    // // set data, with sorting
    // // setData: function(data){
    // // // summary:
    // // // Sets the given data as the source for this store, and indexes it
    // // // data: Object[]
    // // // An array of objects to use as the source of data.
    // // if(data.items){
    // // // just for convenience with the data format IFRS expects
    // // this.idProperty = data.identifier || this.idProperty;
    // // data = this.data = data.items;
    // // }else{
    // // this.data = data;
    // // }
    //
    // // // sort
    // // if(this.order){
    // // this.data.sort(this.order);
    // // }
    //
    // // // index
    // // this.index = {};
    // // for(var i = 0, l = data.length; i < l; i++){
    // // this.index[data[i][this.idProperty]] = i;
    // // }
    // // },
    //
    // // filter data
    // setFilter : function(filter) {
    // // find out filtered data, including parent
    // var filteredData = this.queryEngine(filter)(this.originalData);
    //
    // // parent id
    // var parentIds = this.getAllParentIds();
    //
    // // only leaf
    // var idProperty = this.idProperty;
    // filteredData = arrayUtil.filter(filteredData, function(obj) {
    // return parentIds.indexOf(obj[idProperty]) === -1;
    // });
    //
    // // find out parent
    // var parentData = {};
    // for (var i = 0; i < filteredData.length; i++) {
    // lang.mixin(parentData, this.getParentData(filteredData[i]));
    // }
    //
    // // data to display = leaf + parent
    // var dataDisplay = filteredData;
    // for ( var i in parentData) {
    // dataDisplay.push(parentData[i]);
    // }
    //
    // var dataDisplayIds = arrayUtil.map(dataDisplay, function(obj) {
    // return obj[idProperty];
    // });
    //
    // // find out elements need to be removed
    // var dataToRemove = arrayUtil.filter(this.originalData, function(obj) {
    // return dataDisplayIds.indexOf(obj[idProperty]) === -1;
    // });
    //
    // var dataToRemoveIds = arrayUtil.map(dataToRemove, function(obj) {
    // return obj[idProperty];
    // });
    //
    // // remove elements
    // for (var i = 0; i < dataToRemoveIds.length; i++) {
    // console.log('remove: ', dataToRemoveIds[i]);
    // this.remove(dataToRemoveIds[i]);
    // }
    //
    // // put elements
    // for (var i = 0; i < dataDisplay.length; i++) {
    // var id = dataDisplay[i][idProperty];
    //
    // if (!this.get(id)) {
    // console.log('put: ', id);
    // this.put(dataDisplay[i]);
    // }
    // }
    // },
    //
    // // order tree node
    // // order: function(a, b){
    // // return a.orderIndex - b.orderIndex;
    // // },
    //
    // // check if this object has children
    // isThereChildren : function(obj) {
    // return this.getAllParentIds().indexOf(obj[this.idProperty]) !== -1;
    // },
    //
    // getAllParentIds : function() {
    // // find out parent id
    // var parentIds = [];
    //
    // for (var i = 0; i < this.originalData.length; i++) {
    // var d = this.originalData[i];
    // if (d.parent && parentIds.indexOf(d.parent) === -1) {
    // parentIds.push(d.parent);
    // }
    // }
    //
    // return parentIds;
    // },
    //
    // getParentData : function(child) {
    //
    // var parentData = {};
    //
    // var query = {};
    // query[this.idProperty] = child.parent;
    // var p = this.queryEngine(query)(this.originalData);
    //
    // if (p && p.length > 0) {
    // p = p[0];
    // parentData[p[this.idProperty]] = p;
    //
    // if (p.parent) {
    // lang.mixin(parentData, this.getParentData(p));
    // }
    // }
    //
    // return parentData;
    // }
    //
    // });

    // set up the store to get the tree data, plus define the method
    // to query the children of a node
    var governmentStore = new FilterMemory({
        data : data,
        getChildren : function(object) {
            return this.query({
                parent : object.id
            }, {
                sort : [
                    {
                        attribute : "orderIndex",
                        descending : false
                    }
                ]
            });
        }
    });

    window.governmentStore = governmentStore;

    // give store Observable interface so Tree can track updates
    var obStore = new Observable(governmentStore);

    window.obStore = obStore;

    // To support dynamic data changes, including DnD,
    // the store must support put(child, {parent: parent}).
    // But dojo/store/Memory doesn't, so we have to implement it.
    // Since our store is relational, that just amounts to setting child.parent
    // to the parent's id.
    // aspect.around(obStore, "put", function(originalPut){
    // return function(obj, options){
    // if(options && options.parent){
    // obj.parent = options.parent.id;
    // }
    // return originalPut.call(obStore, obj, options);
    // }
    // });

    // set up the model, assigning governmentStore, and assigning method to
    // identify leaf nodes of tree
    var governmentModel = new ObjectStoreModel({
        store : obStore,
        query : {
            id : 'root'
        },
        mayHaveChildren : function(item) {
            return this.store.isThereChildren(item);
        }
    });

    // set up the tree, assigning governmentModel;
    var governmentTree = new AppTree({
        model : governmentModel,
        onOpenClick : true,
        onLoad : function() {
            // dom.byId('image').src = '../resources/images/root.jpg';
        },
        onClick : function(item) {
            // dom.byId('image').src = '../resources/images/'+item.id+'.jpg';

        }
    }, "testTree");
    governmentTree.startup();

    window.governmentTree = governmentTree;
    window.query = query;

    // update data
    query("#add-new-child").on("click", function() {
        // get the selected object from the tree
        var selectedObject = governmentTree.get("selectedItems")[0];
        if (!selectedObject) {
            return alert("No object selected");
        }

        // add a new child item
        var chidlName = query("#childName")[0].value;
        var childItem = {
            name : chidlName,
            id : Math.random()
        };
        obStore.put(childItem, {
            overwrite : true,
            parent : selectedObject
        });
    });

    // observer
    // var res = obStore.query(function(obj){
    // return obj.name.indexOf('as') !== -1;
    // });

    // res.forEach(function(obj){
    // console.log(obj.name);
    // });

    // res.observe(function(obj, removedFrom, insertedInto){

    // console.log(obj.name, ' is inserted.');

    // }, true);

    //

    // var form = {id: "root",
    // "name":"患者基本信息","pages":[{"name":"患者信息","sections":[{"name":"基本信息","columns":[{"fields":[{"type":"text","key":"patientName","label":"患者姓名","desc":"患者姓名","required":true,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"100","groupby":""},{"type":"date","key":"birthDate","label":"出生日期","desc":"出生日期","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","pattern":"yyyy/MM/dd","groupby":""},{"type":"text","key":"ethnic","label":"民族","desc":"民族","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"20","groupby":""},{"type":"text","key":"mrn","label":"患者编号","desc":"患者编号","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"50","groupby":""},{"type":"text","key":"socialSecurity","label":"社保号","desc":"社保号","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"50","groupby":""},{"type":"text","key":"inpatientNo","label":"住院号","desc":"住院号","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"50","groupby":""},{"type":"text","key":"allergies","label":"过敏史","desc":"过敏史","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"100","groupby":""}]},{"fields":[{"type":"radio","key":"gender","label":"性别","desc":"性别","required":false,"hidden":false,"predefined":false,"defaultvalue":null,"permission":null,"groupby":null,"options":[{"label":"女","value":"0","predefined":true},{"label":"男","value":"1","predefined":true},{"label":"其他","value":"2","predefined":true},{"label":"未知","value":"9","predefined":true}]},{"type":"text","key":"patientAge","label":"年龄","desc":"年龄","required":false,"hidden":false,"predefined":true,"defaultvalue":"","permission":"","maxlength":"20","groupby":""},{"type":"radio","key":"maritalStatus","label":"婚姻状态","desc":"婚姻状态","required":false,"hidden":false,"predefined":true,"defaultvalue":null,"permission":null,"groupby":null,"options":[{"label":"未婚","value":"10","predefined":true},{"label":"已婚","value":"20","predefined":true},{"label":"初婚","value":"21","predefined":true},{"label":"再婚","value":"22","predefined":true},{"label":"复婚","value":"23","predefined":true},{"label":"丧偶","value":"30","predefined":true},{"label":"离婚","value":"40","predefined":true},{"label":"未说明的婚姻状况","value":"90","predefined":true}]},{"type":"text","key":"idCard","label":"身份证号","desc":"身份证号","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"50","groupby":""},{"type":"text","key":"outpatientNo","label":"门诊号","desc":"门诊号","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"50","groupby":""},{"type":"text","key":"empi","label":"EMPI","desc":"EMPI","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","maxlength":"50","groupby":""},{"type":"radio","key":"isDeceased","label":"死亡状态","desc":"死亡状态","required":false,"hidden":false,"predefined":false,"defaultvalue":null,"permission":null,"groupby":null,"options":[{"label":"否","value":"0","predefined":true},{"label":"是","value":"1","predefined":true}]},{"type":"date","key":"deceasedTime","label":"死亡时间","desc":"死亡时间","required":false,"hidden":false,"predefined":false,"defaultvalue":"","permission":"","pattern":"yyyy/MM/dd","groupby":""}]}]}]}]};

    // // set up the store to get the tree data
    // var governmentStore = new Memory({
    // idProperty: 'name',
    // data: [ form ],
    // getChildren: function(object){
    // return object.pages || object.sections || object.columns || object.fileds
    // || [];
    // }
    // });

    // // set up the model, assigning governmentStore, and assigning method to
    // identify leaf nodes of tree
    // var governmentModel = new ObjectStoreModel({
    // store: governmentStore,
    // query: {id: 'root'},
    // mayHaveChildren: function(item){
    // return true;
    // }
    // });

    // // set up the tree, assigning governmentModel;
    // var governmentTree = new Tree({
    // model: governmentModel,
    // onOpenClick: true,
    // onLoad: function(){
    // // dom.byId('image').src = '../resources/images/root.jpg';
    // },
    // onClick: function(item){
    // // dom.byId('image').src = '../resources/images/'+item.id+'.jpg';

    // }
    // }, "testTree");
    // governmentTree.startup();

});