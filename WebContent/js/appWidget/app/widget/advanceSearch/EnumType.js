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
 * FILE NAME: EnumType.js
 * 
 * CREATED: 2015年7月13日 下午4:05:35
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/Stateful',
    'app/util/EnumUtil',
    'app/util/ResourceUtil',
    'app/widget/_HiddenMixin',
    'app/widget/advanceSearch/_SearchCriteriaMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/data/ItemFileReadStore',
    'dojo/on',
    'dojo/request',
    'dojo/_base/declare',
    'dojo/text!./templates/enum-type.html'
], function(Stateful, EnumUtil, i18n,_HiddenMixin, _SearchCriteriaMixin, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, array, lang, ItemFileReadStore, on, request,
        declare, template) {
    return declare('app.widget.advanceSearch.EnumType', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchCriteriaMixin,
        _HiddenMixin
    ], {
        /**
         * template
         */
        templateString : template,

        /**
         * base Class
         */
        baseClass : "enumType",

        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);

            // set search field
            this.searchField = this.field;

            // set field display
            this.fieldDisplay = i18n.getText(this.fieldDispalyKey);
        },

        /**
         * Override
         */
        postCreate : function() {
            // load options
            if (this.module) {
                this._loadModule();
            } else if (this.service) {
                this._loadData();
            }

            // set search value
            this._bindEventToSearchValue();

        },

        /**
         * Bind event to search value
         * 
         */
        _bindEventToSearchValue : function() {
            // set search value
            on(this.fieldValueNode, 'change', lang.hitch(this, function(val) {
                this._setSearchValue(val);
            }));
        },

        /**
         * Set search value
         */
        _setSearchValue : function(val) {

            var options = this.fieldValueNode.options;
            // if select all
            if (options.length == val.length) {
                this.searchValue = _SearchCriteriaMixin.allValue;
                this._removeAllOperation(); // if select all then remove all
                // operations
            } else {
                // 
                var searchValue = this._changeValueType(val);

                this._addOperation(this.operationType.IN, searchValue);
            }
        },

        /**
         * change value type
         */
        _changeValueType : function(/* Array */val) {
            var newValue = val;
            if (this.dataType) {

                if (this.dataType.toUpperCase() == 'INTEGER' || this.dataType.toUpperCase() == 'LONG') {
                    newValue = val.map(function(v) {
                        return parseInt(v);
                    });
                } else if (this.dataType.toUpperCase() == 'STRING') {
                    newValue = val.map(function(v) {
                        return String(v);
                    });
                }

            }

            return newValue;
        },

        /**
         * Load module
         */
        _loadModule : function() {
            var data = EnumUtil.getItem(this.module);

            // set options
            this._setStore(data);

        },

        /**
         * Load data
         */
        _loadData : function() {
            // join the request url
            var rawUrl = 'service/multiselectdata/{service}';
            var urlParams = {
                service : this.service
            };
            var url = lang.replace(rawUrl, urlParams);

            // TODO need to handle this in future
            // use dojo request to load data
            request.get(url, {
                sync : true,
                handleAs : 'json'
            }).then(lang.hitch(this, function(data) {
                // set options
                this._setStore(data);

                // reload options due to async
                this.fieldValueNode._loadChildren();
            }));
        },

        /**
         * Filter options
         */
        _filterOptions : function(data) {
            var options = data.items;
            // filter
            if (this.filter) {
                var filter = this.filter;
                options = options.reduce(function(oldValue, currentValue, index) {
                    if (array.indexOf(filter, currentValue.value) > -1) {
                        oldValue.push(currentValue);
                    }
                    return oldValue;
                }, []);
            }
            data.items = options;
        },

        /**
         * set store of multi select
         */
        _setStore : function(data) {
            // filter
            this._filterOptions(data);

            // set label & value
            if (this.displayLabel) {
                data.label = this.displayLabel;
            }

            if (this.displayValue) {
                data.value = this.displayValue;
                data.identifier = this.displayValue;
            }

            // set options to select
            var store = new ItemFileReadStore({
                data : data
            });

            this.fieldValueNode.set('store', store);

            // set default value, 'all'
            this.setDefaultValue();
        },

        /**
         * setDefaultValue
         */
        setDefaultValue : function() { // TODO need to refactor in future
            // set all menu item to selected
            var menuItems = this.fieldValueNode.dropDownMenu.getChildren();
            menuItems.map(function(menuItem) {
                menuItem.option.selected = true;
            });

            // update label
            this.fieldValueNode._updateSelection();
            // remove all operations
            this._removeAllOperation();
        },

        /**
         * Set query value using saved query
         */
        setQueryValue : function(/* Array */queryValue) {
            // set menu item to selected according to query value
            var menuItems = this.fieldValueNode.dropDownMenu.getChildren();
            for (var i = 0; i < menuItems.length; i++) {
                var o = menuItems[i].option;
                if (array.indexOf(queryValue, o.value) != -1) {
                    o.selected = true;
                } else {
                    o.selected = false;
                }
            }

            // update label
            this.fieldValueNode._updateSelection();

            // set search value
            this._setSearchValue(queryValue);
        },

        /**
         * Get query value to save, if all options are selected, then return
         * undefined so we don't need to save this.
         */
        getQueryValue : function() {
            var queryValue = {};
            queryValue.field = this.field;
            queryValue.value = [];

            // get option value
            var options = this.fieldValueNode.options;

            for (var i = 0; i < options.length; i++) {
                var o = options[i];
                if (o.selected) {
                    queryValue.value.push(o.value);
                }
            }

            if (options.length == queryValue.value.length) {
                // if select all
                queryValue.value = _SearchCriteriaMixin.allValue;
            }

            // if not select all, then return queryValue
            if (queryValue.value !== _SearchCriteriaMixin.allValue) {
                return queryValue;
            }
        },

        /**
         * get the search criteria to display, if all options are selected then
         * return undefined.
         * 
         * The searchCriteriaDisplay format is: "filedName: value1, value2,
         * value3"
         * 
         */
        getSearchCriteriaDisplay : function() {
            if (this.getQueryValue()) {
                // get all selected labels
                var selectedLabels = [];
                for ( var i in this.fieldValueNode.options) {
                    var option = this.fieldValueNode.options[i];
                    if (option.selected) {
                        selectedLabels.push(option.label);
                    }
                }

                var searchCriteriaDisplay = this.fieldDisplay + ': ' + selectedLabels.join(',');
                return searchCriteriaDisplay;
            }
        }
    });
});