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


    // set up the tree, assigning governmentModel;
    var governmentTree = new AppTree({
//        model : governmentModel,
        data: data,
        sortOrder: 'desc',
        searchAttr: 'name',
        queryExpr: '${0}*',
        ignoreCase: false,
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
       
        governmentTree.setFilter(search);
        
    });

});