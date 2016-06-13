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
    query("#searchInput").on("input", function() {
        // get search
        var search = query("#searchInput")[0].value;
       
        obStore.setFilter(search);
        
    });

});