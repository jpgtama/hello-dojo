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
 * FILE NAME: DynamicGrid.js
 * 
 * CREATED: 2015年6月29日 下午1:51:50
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/config/profileConfig',
    'app/lang/Stateful',
    'app/lang/topic',
    'app/service/CustomQueryService',
    'app/service/DynamicGridService',
    'app/util/Constants',
    'app/util/EnumUtil',
    'app/util/FormatterUtil',
    'app/util/ResourceUtil',
    'app/widget/advanceSearch/_SearchTopicMixin',
    'app/widget/EnumLabel',
    'app/widget/Menu',
    'app/widget/MenuItem',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/CheckedMenuItem',
    'dijit/MenuSeparator',
    'dijit/PopupMenuItem',
    'dijit/registry',
    'dgrid/OnDemandGrid',
    'dgrid/Selector',
    'dstore/Request',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/aspect',
    'dojo/date/locale',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/json',
    'dojo/on',
    'dojo/request',
    'dojo/request/xhr',
    'dojo/string',
    'dojo/_base/declare',
    'dojo/text!./templates/dynamic-grid.html',
    'dojo/domReady!'
], function(profileConfig, Stateful, topic, CustomQueryService, DynamicGridService, Constants, EnumUtil, FormatterUtil, i18n, _SearchTopicMixin, EnumLabel,
        Menu, MenuItem, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, CheckedMenuItem, MenuSeparator, PopupMenuItem, registry, OnDemandGrid, Selector,
        RequestStore, arrayUtil, lang, aspect, locale, dom, domClass, domConstruct, JSON, on, request, xhr, string, declare, template) {
    return declare('app.widget.DynamicGrid', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchTopicMixin
    ], {

        /**
         * base class
         */
        baseClass : 'dynamicGridCls',

        /**
         * template String
         */
        templateString : template,

        /**
         * when gird has advanced search, it won't load initial data by itself
         */
        hasAdvancedSearch : false,

        /**
         * contentNode, which will hold grid.
         */
        contentNodeId : 'grid',

        /**
         * right click row
         */
        rightClickRow : {},

        /**
         * topic map
         */
        topicMap : {},

        /**
         * context menu
         */
        contextMenu : {},

        /**
         * isInitData
         */
        isInitData : true,

        /**
         * dgrid instance, which can be get by the user
         */
        grid : {},

        /**
         * Getter and setter method
         */
        _getGridAttr : function() {
            return this.grid;
        },

        /**
         * Override super class
         */
        constructor : function(options) {
            lang.mixin(this, options);
            // service to retrieve grid config
            this.dynamicGridService = new DynamicGridService();
            this.customQueryService = new CustomQueryService();
        },

        /**
         * Override super class
         */
        buildRendering : function() {
            this.inherited(arguments);
        },

        /**
         * Override super class
         */
        postCreate : function() {
            // load function socpe
            this.dynamicGridService.loadConfigFunction(this.gridName);

            // load config data
            var configDef = this.dynamicGridService.getMataConfig(this.gridName);

            // call back to _handleConfig
            configDef.then(lang.hitch(this, '_handleConfig'));

            // dynamic grid init complete
            topic.publish(this._TOPIC_DYNAMICGRID_INIT_COMPLETED_);
        },

        /**
         * handle config data
         */
        _handleConfig : function(/* Object */retData) {
            // get config data
            var preConfigData = retData;

            // minxin user settings
            var configData = this._mixinUserConfig(preConfigData, grid);

            // generate grid
            this._generateGrid(configData);

            // listen to user settings
            this._listenToUserSettings(preConfigData, grid);
        },

        /**
         * _generateGrid
         */
        _generateGrid : function(/* Object */configData) {

            // get function modules
            var modules = this._getFunctionModules(configData);

            // get column defintion object
            var columnDefinitionObject = this._getColumnDefinitionObject(configData);

            // create grid
            var grid = this._createGrid(configData, modules, columnDefinitionObject);
            this.grid = grid;

            // set grid width
            this._setGridColumnWidth(configData, grid);

            // handle row action
            this._handlRowAction(configData, grid);

            // default sort
            this._defaultSortGridColumns(configData, grid);

            // add subscriber to grid refresh
            this._addSubscriberGridRefresh(configData, grid);

            // toggle class when mouse over row
            this._toggleRowClassMouseOver(grid);

            // start grid
            grid.startup();
        },

        /**
         * update grid
         */
        _updateGrid : function(/* Object */configData) {
            // 
            var grid = this.grid;

            // get column defintion object
            var columnDefinitionObject = this._getColumnDefinitionObject(configData);
            grid.set('columns', columnDefinitionObject);

            // set grid width
            this._setGridColumnWidth(configData, grid);

            // default sort
            this._defaultSortGridColumns(configData, grid);

            // resize grid
            grid.resize();
        },

        /**
         * _listenToUserSettings
         */
        _listenToUserSettings : function(/* Object */preConfigData, /* Object */grid) {
            this.subscribe(this._TOPIC_DYNAMICGRID_PROFILE_SETTING_, lang.hitch(this, function() {
                // get user config
                var userConfigData = this._mixinUserConfig(preConfigData);

                // update grid
                this._updateGrid(userConfigData);
            }));
        },

        /**
         * mixin user settings
         */
        _mixinUserConfig : function(/* Object */preConfigData) {
            // clone config data to preserve original config
            var newConfigData = lang.clone(preConfigData);

            // get user settings
            var userSettings = profileConfig.get(this.gridName);

            // turn configData.columns from array to map, use field as key
            var configColumnsObject = newConfigData.columns.reduce(function(o, v, i) {
                o[v.field] = v;
                return o;
            }, {});

            // get user columns
            var userColumns = [];
            if (userSettings && userSettings.columns && userSettings.columns.length > 0) {
                userColumns = userSettings.columns.reduce(function(o, v, i) {
                    if (configColumnsObject[v.field]) {
                        // update index
                        configColumnsObject[v.field].index = v.index;
                        // set isDisplay
                        configColumnsObject[v.field].isDisplay = true;
                        // add to array
                        o.push(configColumnsObject[v.field]);
                    }
                    return o;
                }, []);
            }

            // get user sort
            var userSort = [];
            if (userSettings && userSettings.sort && userSettings.sort.length > 0) {
                userSort = userSettings.sort;
            }

            // create user configurations
            var userConfig = {};

            // add user columns
            if (userColumns.length > 0) {
                userConfig.columns = userColumns;
            }

            // add user sort
            if (userSort.length > 0) {
                userConfig.sort = userSort;
            }

            // mixin newConfigData
            lang.mixin(newConfigData, userConfig);

            return newConfigData;
        },

        /**
         * _addSubscriberGridRefresh
         */
        _addSubscriberGridRefresh : function(/* Object */configData, /* Object */grid) {
            // get grid refresh topic name
            var _this = this;
            this.subscribe(this._TOPIC_DYNAMICGRID_SEARCH_, function(data) {
                console.log('query condition:', data)
                // set no data message, fix bug 没有记录时没有横向滚动条
                var w = document.getElementById('grid-header').offsetWidth;
                var innerHTML = lang.replace('<div class="full-length" style="width: {0}px;">&nbsp;</div>{1}', [
                    w,
                    i18n.getText(configData.noDataMessage)
                ]);
                grid.set('noDataMessage', innerHTML);

                // refresh grid with filter
                if (data) {
                    var store = grid.get('collection');
                    if (!store) {
                        store = this._getCustomRequestStore(configData, RequestStore);
                        // add aspect to get total number
                        this._publishTotalRowNumber(store);
                    }

                    // clean query log TODO TBR
                    store.queryLog = [];

                    // set filter
                    if (data.search) {
                        grid.set('collection', store.filter(data));
                    }
                } else {
                    // refresh grid only
                    grid.refresh();
                }
            });
        },

        /**
         * Default sort grid columns
         */
        _defaultSortGridColumns : function(/* Object */configData, /* Object */grid) {
            // get sort config
            var sortConfig = configData.sort;

            // create sort object array
            var sortObjectArray = [];
            for ( var i in sortConfig) {
                var sortObject = {
                    property : sortConfig[i].field,
                    descending : sortConfig[i].method === 'desc'
                };

                // add to array
                sortObjectArray.push(sortObject);
            }
            // sort
            grid.set('sort', sortObjectArray);
        },

        /**
         * Handle row action
         */
        _handlRowAction : function(/* Object */configData, /* Object */grid) {
            // get row action config
            var rowActionConfig = configData.rowAction;

            // loop row action
            for ( var i in rowActionConfig) {
                // context menu action
                if ('context-menu' == rowActionConfig[i].type) {
                    this._createContextMenu(rowActionConfig[i], grid);
                }

                // click action
                if ('click' == rowActionConfig[i].type) {
                    this._createClickAction(rowActionConfig[i], grid);
                }
            }
        },

        /**
         * create click and link action
         */
        _createClickAction : function(/* Object */rowActionConfig, /* Object */grid) {
            grid.on('.dgrid-content .dgrid-cell:click', function(evt) {
                // get cell definition
                var cell = grid.cell(evt);

                // data to publish
                var publishData = {
                    row : grid.row(evt).data,
                    grid : grid
                };

                // for link column, publish link topic
                if (cell.column.linkTopic) {
                    topic.publish(cell.column.linkTopic, publishData);
                } else {
                    // public click topic
                    topic.publish(rowActionConfig.topic, publishData);
                }
            });
        },

        /**
         * Create context menu
         */
        _createContextMenu : function(/* Object */rowActionConfig, /* Object */grid) {
            // hold this object
            var dynamicGrid = this;

            // context menu
            var contextMenu = registry.byId('appointmentGridMenu');

            // if context menu already exist, rebind and return
            if (contextMenu) {
                contextMenu.destroy();
            }

            // create a new context menu
            contextMenu = new Menu({
                permission : rowActionConfig.permission,
                id : 'appointmentGridMenu',
                targetNodeIds : [
                    'grid'
                ],
                selector : 'div.dgrid-row'
            });

            // for permission when context menu is destroyed, do nothing
            if (contextMenu._destroyed)
                return;

            this.contextMenu = contextMenu;

            // loop actionList
            for ( var i in rowActionConfig.actionList) {
                // get one action config
                var actionConfig = rowActionConfig.actionList[i];

                // get topic map
                var topicName = actionConfig.topic;

                // disable function
                // var disableFunction =
                // rowActionConfig.functionScope[actionConfig.isDisabled];
                var disableFunction = actionConfig.isDisabled;

                // change function scope
                // if (disableFunction) {
                // disableFunction = lang.hitch(rowActionConfig.functionScope,
                // disableFunction);
                // }

                // create menu item
                var menuItem = new MenuItem({
                    permission : actionConfig.permission,

                    /* topic name */
                    menuItemTopicName : topicName,

                    label : i18n.getText(actionConfig.display),

                    iconClass : actionConfig.iconClass,

                    /* used to check if this item should be disabled */
                    checkDisabled : disableFunction,

                    onClick : function() {
                        // data to publish
                        var publishData = {
                            row : dynamicGrid.rightClickRow,
                            grid : grid
                        };
                        topic.publish(this.menuItemTopicName, publishData);
                    }
                });

                // for permission when context menu is destroyed, ignore item
                if (menuItem._destroyed)
                    continue;

                // add menu item
                contextMenu.addChild(menuItem);
            }

            // start up context menu
            contextMenu.startup();

            // disable right click on context menu
            on(contextMenu, 'contextmenu', function(evt) {
                evt.preventDefault();
            });

            // right click on a row, get the row and disable menu item
            // accordingly
            on(grid, 'contextmenu', lang.hitch(this, function(evt) {
                this.rightClickRow = grid.row(evt).data;
                this.contextMenu.getChildren().map(lang.hitch(this, '_checkDisableMenuItem'));
            }));

        },

        /**
         * _checkDisableMenuItem
         */
        _checkDisableMenuItem : function(menuItem) {
            // if checkDisabled was set then use it to disable menu item
            if (menuItem.checkDisabled) {
                if (lang.getObject(menuItem.checkDisabled, false, window)) {
                    menuItem.set('disabled', eval(menuItem.checkDisabled)(this.rightClickRow));
                } else {
                    console.err(lang.replace('function {0} not found in window', [
                        menuItem.checkDisabled
                    ]));
                }
            }
        },

        /**
         * Set grid column width
         */
        _setGridColumnWidth : function(/* Object */configData, /* Object */grid) {
            // get column width config map, use column field as key
            var columnWidthConfigMap = configData.columns.reduce(function(o, v, i) {
                o[v.field] = v.width;
                return o;
            }, {});

            var gridColumns = grid.get('columns');

            // set width
            for (var i = 0; i < gridColumns.length; i++) {

                // skip the first column if select mode is set
                if (this._isSelectEnabled(configData)) {
                    ++i;
                }

                // get column definition object
                var col = gridColumns[i];

                // get column width config
                var widthConfigData = columnWidthConfigMap[col.field];

                // set width
                if (widthConfigData) {
                    var styleWidth = string.substitute('width: ${0}px;', [
                        widthConfigData
                    ]);
                    grid.styleColumn(col.id, styleWidth);
                }
            }
        },

        /**
         * create grid
         */
        _createGrid : function(/* Object */configData, /* Array */modules, /* Array */columnDefinitionObject) {
            // create custom store class and get an instance
            var store = null;

            if (this.isInitData) {
                store = this._getCustomRequestStore(configData, RequestStore);
            }
            
            // create grid
            var grid = new (declare(modules))({
                collection : store, // TODO TBR
                columns : columnDefinitionObject,
                loadingMessage : i18n.getText(configData.loadingMessage),
                noDataMessage : i18n.getText(configData.noDataMessage)
            }, this.domNode);

            return grid;
        },

        /**
         * create custome Request store class, use url paramter to do pagination
         * and sort and use rowsPerPage
         */
        _getCustomRequestStore : function(/* Object */configData) {
            // get rows per page
            var rowsPerPage = configData.rowsPerPage || 25;

            // create custom store class
            var CustomRequestStore = declare(RequestStore, {
                /**
                 * rangeStartParam
                 */
                rangeStartParam : 'start',
                /**
                 * rangeCountParam
                 */
                rangeCountParam : 'count',
                /**
                 * sortParam
                 */
                sortParam : 'sort',
                /**
                 * ascendingPrefix
                 */
                ascendingPrefix : '',
                /**
                 * _targetContainsQueryString
                 */
                _targetContainsQueryString : true,

                // below change is for using POST to get data
                /**
                 * Override
                 */
                _request : function(kwArgs) {
                    kwArgs = kwArgs || {};

                    // perform the actual query
                    var headers = lang.delegate(this.headers, {
                        Accept : this.accepts
                    });

                    if ('headers' in kwArgs) {
                        lang.mixin(headers, kwArgs.headers);
                    }

                    var requestUrl = this._renderUrl();

                    // request data
                    var queryParams = this._renderQueryParams()
                    if (kwArgs.queryParams) {
                        arrayUtil.forEach(kwArgs.queryParams, function(item) {
                            var queryPair = item.split('=');
                            var queryPairObject = {};
                            queryPairObject[queryPair[0]] = queryPair[1];
                            lang.mixin(queryParams, queryPairObject);
                        });
                    }

                    var response = request(requestUrl, {
                        method : 'POST',
                        headers : headers,
                        data : queryParams
                    });
                    var collection = this;
                    var parsedResponse = response.then(function(response) {
                        return collection.parse(response);
                    });
                    return {
                        data : parsedResponse.then(function(data) {
                            // support items in the results
                            var results = data.items || data;
                            for (var i = 0, l = results.length; i < l; i++) {
                                results[i] = collection._restore(results[i], true);
                            }
                            return results;
                        }),
                        total : parsedResponse.then(function(data) {
                            // check for a total property
                            var total = data.total;
                            if (total > -1) {
                                // if we have a valid positive number from the
                                // data,
                                // we can use that
                                return total;
                            }
                            // else use headers
                            return response.response.then(function(response) {
                                var range = response.getHeader('Content-Range');
                                return range && (range = range.match(/\/(.*)/)) && +range[1];
                            });
                        }),
                        response : response.response
                    };
                },

                /**
                 * Override
                 */
                _renderQueryParams : function() {
                    // UPDATE: don't return array as before, return query object
                    // instead.
                    var queryParamObject = {};

                    // convert queryLog to query object
                    arrayUtil.forEach(this.queryLog, function(entry) {
                        var type = entry.type, renderMethod = '_render' + type[0].toUpperCase() + type.substr(1) + 'Params';

                        if (this[renderMethod]) {
                            var query = this[renderMethod].apply(this, entry.normalizedArguments);
                            lang.mixin(queryParamObject, query);
                        } else {
                            console.warn('Unable to render query params for "' + type + '" query', entry);
                        }
                    }, this);

                    return queryParamObject;
                },

                /**
                 * Override
                 */
                _renderUrl : function() {
                    // UPDATE: only return target url, don't append any request
                    // parameter
                    var requestUrl = this.target;

                    return requestUrl;
                },

                /**
                 * Override
                 */
                _renderSortParams : function(sort) {
                    // summary:
                    // Constructs sort-related params to be inserted in the
                    // query string
                    // returns: String
                    // Sort-related params to be inserted in the query string
                    var sortString = arrayUtil.map(sort, function(sortOption) {
                        var prefix = sortOption.descending ? this.descendingPrefix : this.ascendingPrefix;
                        return prefix + encodeURIComponent(sortOption.property);
                    }, this);

                    var params = [];
                    if (sortString) {
                        params.push(this.sortParam ? encodeURIComponent(this.sortParam) + '=' + sortString : 'sort(' + sortString + ')');
                    }

                    var sortName = this.sortParam ? encodeURIComponent(this.sortParam) : 'sort';

                    // UPDATE: don't return array, return object instead.
                    var sortObject = {};
                    sortObject[sortName] = sortString.join(',');
                    return sortObject;
                },

                /**
                 * Override
                 */
                _renderFilterParams : function(filter) {
                    // summary:
                    // Constructs filter-related params to be inserted into the
                    // query string
                    // returns: String
                    // Filter-related params to be inserted in the query string
                    var type = filter.type;
                    var args = filter.args;
                    if (!type) {
                        return [
                            ''
                        ];
                    }
                    if (type === 'string') {
                        return [
                            args[0]
                        ];
                    }
                    if (type === 'and' || type === 'or') {
                        var queryObjectArray = arrayUtil.map(filter.args, function(arg) {
                            // render each of the arguments to and or or, then
                            // combine by the right operator
                            var renderedArg = this._renderFilterParams(arg);
                            return ((arg.type === 'and' || arg.type === 'or') && arg.type !== type) ?
                            // need to observe precedence in the case of
                            // changing combination operators
                            '(' + renderedArg + ')' : renderedArg;
                        }, this);

                        // UPDATE: don't return array, return object instead.
                        var retObject = {};
                        arrayUtil.forEach(queryObjectArray, function(item) {
                            lang.mixin(retObject, item);
                        });

                        return retObject;
                    }
                    var target = args[1];
                    if (target) {
                        if (target._renderUrl) {
                            // detected nested query, and render the url inside
                            // as an argument
                            target = '(' + target._renderUrl() + ')';
                        } else if (target instanceof Array) {
                            target = '(' + target + ')';
                        }
                    }

                    // UPDATE: don't return array, return object instead.
                    var filterName = encodeURIComponent(args[0]);
                    var filterValue = target;
                    var filterObject = {};

                    filterObject[filterName] = filterValue;
                    return filterObject;
                }
            // above change is for using POST to get data
            });

            // create custom store instance
            var store = new CustomRequestStore({
                target : lang.replace('service/dynamicGrid/preload/{0}', [
                    this.gridName
                ])
            });

            return store;
        },

        /**
         * publish total row number
         */
        _publishTotalRowNumber : function(/* Object */store) {
            // TODO
            var _this = this;

            // add aspect to get total number
            this.own(aspect.after(store, '_request', function(value) {
                // get total rows
                value.total.then(function(data) {
                    topic.publish(_this._TOPIC_DYNAMICGRID_RESULTCOUNT_, data);
                });
                // return previous value
                return value;
            }));
        },

        /**
         * get function modules
         */
        _getFunctionModules : function(/* Object */configData) {
            // class array
            var extendClsArr = [
                _WidgetBase,
                OnDemandGrid
            ];

            // add selection mixin
            if (this._isSelectEnabled(configData)) {
                extendClsArr.push(Selector);
            }

            return extendClsArr;
        },

        /**
         * check if select is enabled.
         */
        _isSelectEnabled : function(/* Object */configData) {
            return configData.selectMode != 'none';
        },

        /**
         * Get columns config data
         */
        _getColumnDefinitionObject : function(/* Object */configData) {
            // columns config in config data
            var columns = configData.columns;

            // sort columns by index
            // this._orderColumns(columns);
            this._orderColumnsByArrayIndex(columns);

            // column config for dgrid
            var gridColumnDefinitionObject = [];

            // add checkbox column if selector is enabled.
            if (this._isSelectEnabled(configData)) {
                // check box column config
                var checkBoxColumnDefinition = {
                    label : '',
                    selector : 'checkbox',
                    className : 'selectColumn'
                };

                gridColumnDefinitionObject.push(checkBoxColumnDefinition);
            }

            // loop the columns
            for (var i = 0; i < columns.length; i++) {
                // one column config
                var columnConfig = columns[i];

                // if isDisplay is false, then not add
                if (!columnConfig.isDisplay) {
                    continue;
                }

                // single column config
                var singleColumnDefinition = {};
                // label
                singleColumnDefinition.label = i18n.getText(columnConfig.display);

                // field
                singleColumnDefinition.field = columnConfig.field;

                // sortable
                singleColumnDefinition.sortable = columnConfig.sortable;

                // add link topic & formatter
                if (columnConfig.linkTopic) {
                    singleColumnDefinition.linkTopic = columnConfig.linkTopic;
                    singleColumnDefinition.formatter = function(value, row) {
                        return '<a href=\"javascript: void;\">' + value + '</a>';
                    }
                }

                // add formatter except link column
                if (!columnConfig.linkTopic) {
                    if (columnConfig.formatter && string.trim(columnConfig.formatter).length > 0) {
                        singleColumnDefinition.formatter = FormatterUtil.getFormatter(columnConfig.formatter);
                    }
                }

                // add to config list
                gridColumnDefinitionObject.push(singleColumnDefinition);
            }

            return gridColumnDefinitionObject;
        },

        /**
         * generate
         */

        /**
         * _toggleRowClassMouseOver
         */
        _toggleRowClassMouseOver : function(/* Object */grid) {
            // add class when mouse over
            on(grid, 'mouseover', function(evt) {
                var row = grid.row(evt);
                if (row) {
                    domClass.add(row.element, 'dgridRowOver');
                }
            });
            // remove class when mouse out
            on(grid, 'mouseout', function(evt) {
                var row = grid.row(evt);
                if (row) {
                    domClass.remove(row.element, 'dgridRowOver');
                }
            });
        },

        /**
         * order columns by 'index' property.
         */
        _orderColumns : function(/* Array */columns) {
            columns.sort(function(a, b) {
                // order ascending
                return a.index - b.index;
            });
        },

        /**
         * Order columns by array index, not used currently
         */
        _orderColumnsByArrayIndex : function(/* Array */columns) {
            //
            var c = columns;

            // start index number
            var n = 1000;

            // reset index
            for ( var i in c) {
                var o = c[i];
                o.index = n++;
            }
        }

    });
});