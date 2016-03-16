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
 * FILE NAME: PredefinedSearch.js
 * 
 * CREATED: Aug 23, 2015 5:33:00 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/service/CustomQueryService',
    'app/widget/advanceSearch/_SearchTopicMixin',
    'app/widget/FilteringSelect',
    'dojo/_base/lang',
    'dojo/data/ItemFileReadStore',
    'dojo/json',
    'dojo/store/DataStore',
    'dojo/store/Memory',
    'dojo/_base/declare'
], function(CustomQueryService, _SearchTopicMixin, FilteringSelect, lang, ItemFileReadStore, JSON, DataStore, Memory, declare) {
    return declare('app.widget.advanceSearch.PredefinedSearch', [
        FilteringSelect,
        _SearchTopicMixin
    ], {

        /**
         * Override. Set required
         */
        required : false,

        /**
         * Search for items in the data store where this attribute (in the item)
         * matches what the user typed
         */
        searchAttr : 'title',

        /**
         * isLoadDefaultData
         */
        isLoadDefaultData : true,

        /**
         * Override. Get gridNameValue from configuration
         */
        postCreate : function() {
            // Init Services
            this.customQueryService = new CustomQueryService();
            
            // TODO initializes the no load data 
            //this.loadData();

            // TODO topic add new item
            this.subscribe(this._TOPIC_ADVANCEDSEARCH_RELOADPREDEFINEDLIST_, lang.hitch(this, function(title) {
                this.loadData(title);
            }));

            // listener about setting value
            this.subscribe(this._TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_, lang.hitch(this, function(data) {
                // TODO clear value big problem
                console.log('clear predefined');
                this._onChangeActive = false;
                this.set('title', '');
                this.set('value', '');
                this._onChangeActive = true;
            }));

            // dynamic grid init complete
            this.subscribe(this._TOPIC_DYNAMICGRID_INIT_COMPLETED_, lang.hitch(this, function() {
                this.loadData();
            }));

            this.inherited(arguments);
        },

        /**
         * When value changed, emit an event
         */
        onChange : function(newValue) {
            console.log('A change occur', newValue)
            // TODO
            var item = this.store.get(newValue);
            var searchObject = {
                item : item,
                searchName : newValue
            };
            if (item) {
                this.publish(this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_, searchObject);
                this.set('title', newValue);
                return;
            }
            this.publish(this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_);
            this.set('title', '');
        },

        /**
         * Init or Reload Predefined List with title as Default value
         */
        loadData : function(/* String */title) {
            this.customQueryService.load(this.gridNameValue).then(lang.hitch(this, function(data) {
                // Set List
                this.setData(data);
                // Set Default Value
                if (title || title == 0) {
                    this.store.query({
                        title : title
                    }, {
                        queryOptions : {
                            ignoreCase : true
                        }
                    }).then(lang.hitch(this, function(results) {
                        console.log('monitor update results', results)
                        if (results.length > 0) {
                            var oldValue = this.get('value');
                            this.set('value', results[0].title);
                            this.set('title', results[0].title);
                            // When update need refresh result data
                            if (oldValue == this.get('value')) {
                                var searchObject = {
                                    item : results[0]
                                };
                                this.publish(this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_, searchObject);
                            }
                        } else {
                            this.set('value', title);
                            this.set('title', title);
                        }
                    }));
                } else {
                    if (this.isLoadDefaultData) {
                        this.store.query({
                            isDefault : true
                        }).then(lang.hitch(this, function(results) {
                            console.log('monitor initial process', results)
                            if (results.length > 0) {
                                this.set('value', results[0].title);
                                this.set('title', results[0].title);
                            } else {
                                this.publish(this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_);
                            }
                        }));
                    }

                    this.isLoadDefaultData = true;
                }
            }));
        },

        /**
         * Set dojo/data to List
         */
        setData : function(/* dojo/data */data) {
            if (data) {
                if (!data.getFeatures) {
                    data.identifier = 'title';
                    data = new ItemFileReadStore({
                        data : data
                    });
                }
                var store = new DataStore({
                    idProperty : 'title',
                    store : data
                });

                this.set('store', store);
            }
        },

        /**
         * Set dojo/store to List
         */
        setStore : function(/* dojo/store */store) {
            if (store) {
                store.idProperty = 'title';
                this.set('store', store);
            }
        },

        /**
         * Set array data to List
         */
        setArray : function(/* Array */array) {
            if (array) {
                var store = new Memory({
                    idProperty : 'title',
                    data : array
                });
                this.set('store', store);
            }
        }

    });
});