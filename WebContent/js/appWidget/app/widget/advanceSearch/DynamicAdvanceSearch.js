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
 * FILE NAME: DynamicAdvanceSearch.js
 * 
 * CREATED: 2015年7月22日 上午10:03:40
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/config/appConfig',
    'app/lang/topic',
    'app/service/CustomQueryService',
    'app/service/DynamicGridService',
    'app/util/Constants',
    'app/widget/advanceSearch/_SearchTopicMixin',
    'app/widget/advanceSearch/SaveDialogContent',
    'app/widget/Dialog',
    'app/widget/MessageBox',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/json',
    'dojo/on',
    'dojo/parser',
    'dojo/_base/declare',
    'dojo/text!./templates/dynamic-advance-search.html'
], function(appConfig, topic, CustomQueryService, DynamicGridService, constants, _SearchTopicMixin, SaveDialogContent, Dialog, MessageBox,
        _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, registry, lang, domConstruct, JSON, on, parser, declare, template) {
    return declare('app.widget.advanceSearch.DynamicAdvanceSearch', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchTopicMixin
    ], {
        /**
         * template
         */
        templateString : template,

        /**
         * base Class
         */
        baseClass : "dynamicAdvanceSearch",

        /**
         * data
         */
        data : {},

        /**
         * 控件列表
         */
        widgetList : [],

        /**
         * current title
         */
        _current_title_ : '',

        /**
         * current title default status
         */
        _current_title_is_default_ : false,

        /**
         * original condition
         */
        _current_title_condition_ : '[]',

        /**
         * dynamicAdvanceSearch 标记高级查询的查询类型的唯一标识
         */
        dynamicAdvanceSearch : null,

        /**
         * searchName 查询名称
         */
        searchName : null,

        /**
         * queryData
         */
        queryData : null,

        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.dynamicGridService = new DynamicGridService();
            this.customQueryService = new CustomQueryService();
            this.dynamicAdvanceSearch = 'dynamicAdvanceSearch';
            this.searchName = null;
            this.inherited(arguments);
        },

        /**
         * Override
         */
        postCreate : function() {
            this.initUI();

            this.bindEvent();

            // TODO TBR binding topic
            this.subscribe(this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_, lang.hitch(this, function(data) {
                if (data) {
                    this._current_title_ = data.item.title;
                    this._current_title_is_default_ = data.item.isDefault;
                    this._current_title_condition_ = data.item.condition;
                    this.searchName = data.searchName;
                    this.fillQueryValueAndSearch(JSON.parse(data.item.condition));
                } else {
                    this._current_title_ = '';
                    this._current_title_is_default_ = false;
                    this._current_title_condition_ = '[]';
                    this.searchName = null;
                    this.fillQueryValueAndSearch();
                }
            }));

            // dynamic grid init complete
            this.subscribe(this._TOPIC_DYNAMICGRID_INIT_COMPLETED_, lang.hitch(this, function() {
                if (this.queryData) {
                    var data = this.formatValue(this.queryData);

                    // not cancelled status
                    var followupStatus = [
                        appConfig.scheduler.status.BUSINESS_STATUS.AWAITING_EXECUTE,
                        appConfig.scheduler.status.BUSINESS_STATUS.AWAITING_SCHEDULE,
                        appConfig.scheduler.status.BUSINESS_STATUS.AWAITING_PATIENT_ARRIVE,
                        appConfig.scheduler.status.BUSINESS_STATUS.COMPLETED
                    ];

                    data.push({
                        'field' : 'followupStatus',
                        'value' : followupStatus
                    });
                    this.fillQueryValueAndSearch(data);
                }
            }));

            // listen to clear search condition
            this.subscribe(this._TOPIC_ADVANCEDSEARCH_CONDITION_CLEAR_, lang.hitch(this, function() {
                this._clearAdvanceSearch();
            }))
        },

        /**
         * formatValue
         */
        formatValue : function(/* Object */value) {
            value = this.filterFields(value);
            var data = [];
            for ( var attr in value) {
                if (attr == 'timeslotDate') {
                    data.push({
                        'field' : 'appointTime',
                        'value' : {
                            startDateValue : value[attr].getTime(),
                            endDateValue : value[attr].getTime()
                        }
                    });
                } else {
                    data.push({
                        'field' : attr,
                        'value' : [
                            value[attr]
                        ]
                    });
                }

            }
            return data;
        },

        /**
         * filterFields
         */
        filterFields : function(/* Object */obj) {
            if (obj) {
                var data = {};
                lang.setObject('resourceName', obj.resourceName, data);
                lang.setObject('timeslotDefId', obj.timeslotDefId, data);
                lang.setObject('timeslotDate', obj.timeslotDate, data);
                return data;
            }
        },

        /**
         * 获得mata数据并初始化UI
         */
        initUI : function() {
            // clear widget list
            this.widgetList = [];

            // 获得grid 全局的配置信息
            var configDef = this.dynamicGridService.getMataConfig(this.gridName);
            configDef.then(lang.hitch(this, function(mataConfig) {
                this.data.mataConfig = mataConfig;
                for (var i = 0; i < this.data.mataConfig.criteria.length; i++) {
                    var criteriaItem = this.data.mataConfig.criteria[i];
                    var node = domConstruct.create('div');
                    this.inputArea.appendChild(node);
                    this.createWidget(node, criteriaItem);
                }
            }));
        },

        /**
         * create Widget
         * 
         * @param criteriaItem
         * @returns
         */
        createWidget : function(node, criteriaItem) {
            var widgetParam = {};
            for ( var key in criteriaItem) {
                widgetParam[key] = criteriaItem[key];
            }
            widgetParam.fieldDispalyKey = criteriaItem.display;
            widgetParam.isHidden = criteriaItem.isHidden;
            require([
                criteriaItem.widget
            ], lang.hitch(this, function(Widget) {
                var obj = new Widget(widgetParam, node);
                obj.startup();
                this.widgetList.push(obj);
            }));
        },

        /**
         * bind Event
         */
        bindEvent : function() {
            // clear
            on(this.clearButton, 'click', lang.hitch(this, function() {
                this._clearAdvanceSearch();
                topic.publish(this._TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_);
            }));

            // query
            on(this.queryButton, 'click', lang.hitch(this, function() {
                // validate first
                if (this.advanceSearchForm.validate()) {
                    // clear Advance Search
                    this._clearHiddenSearch();
                    // search
                    this._search();

                    // 关闭dialog
                    topic.publish(constants.common.COLSE_ADVANCE_SEARCH_DIALOG, {
                        'gridName' : this.gridName
                    });
                }
            }));

            // save personal search
            this._bindSavePersonalSearch();

        },

        /**
         * clear Advance Search
         */
        _clearAdvanceSearch : function() {
            this._setDefault();
            this._current_title_ = '';
            this._current_title_is_default_ = false;
            this._current_title_condition_ = '[]';
        },

        /**
         * clear Hidden Search
         */
        _clearHiddenSearch : function() {
            this.widgetList.map(function(widget) {
                if (widget.get('isHidden') && widget.setDefaultValue) {
                    widget.setDefaultValue();
                }
            });
        },

        /**
         * set default value
         */
        _setDefault : function() {
            this.widgetList.map(function(widget) {
                if (widget.setDefaultValue) {
                    widget.setDefaultValue();
                }
            });
        },

        /**
         * search
         */
        _search : function() {
            var _this = this;
            // get search criteria
            var searchCriteria = [];
            var searchCriteriaDisplay = [];
            for (var i = 0; i < this.widgetList.length; i++) {
                var widget = this.widgetList[i];

                // get searchCriteria
                if (widget.getSearchCriteria) {
                    var sc = widget.getSearchCriteria();
                    // only add selected search
                    if (sc.length != 0) {
                        searchCriteria = searchCriteria.concat(sc);
                    }
                }

                // get searchCriteria display
                if (widget.getSearchCriteriaDisplay) {
                    var scd = widget.getSearchCriteriaDisplay();
                    if (scd) {
                        searchCriteriaDisplay.push(scd);
                    }
                }
            }

            // clear simple search
            topic.publish(this._TOPIC_SIMPLESEARCH_CLEAR_);

            // TODO prepare conditions
            var latestCondition = JSON.stringify(this.getQueryValue());
            if (this._current_title_condition_ != latestCondition) {
                console.log('predefined condition changed', this._current_title_condition_, latestCondition);
                // 查询条件更改，不是和刚才查询名字所代表的查询模板的内容一致，所以当前的查询名字置为空。
                this.searchName = null;
                topic.publish(this._TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_);
            }

            // publish search to grid TODO
            topic.publish(this._TOPIC_DYNAMICGRID_SEARCH_, {
                search : JSON.stringify(searchCriteria),
                searchDisplay : searchCriteriaDisplay.join(','),
                searchType : _this.dynamicAdvanceSearch,
                // 将最新的当前的查询名字publish出去
                searchName : _this.searchName,
                junction : 'AND'
            });
        },

        /**
         * bind event to save personal search
         */
        _bindSavePersonalSearch : function() {

            // bind event to save button
            on(this.savePersonalSearchButton, 'click', lang.hitch(this, function() {
                // create dialog
                var content = new SaveDialogContent();

                // TODO
                if (this._current_title_) {
                    content.queryNameTextBox.set('value', this._current_title_);
                    content.defaultCheckBox.set('checked', this._current_title_is_default_);
                }

                var saveDialog = new Dialog({
                    showTitleBar : false
                });

                saveDialog.addChild(content);

                saveDialog.set('class', 'dynamicAdvanceSearch');
                saveDialog.show();

                // cancel button of dialog
                on(content.cancelButton, 'click', function() {
                    saveDialog.hide();
                });

                // ok button of dialog, save query
                on(content.okButton, 'click', lang.hitch(this, function() {

                    // form validate
                    if (content.saveDialogForm.validate()) {
                        // clear Advance Search
                        this._clearHiddenSearch();

                        this._saveQuery(content, saveDialog);
                    }

                }));
            }));
        },

        /**
         * Save query
         */
        _saveQuery : function(content, saveDialog) {

            // get query value
            var queryValueArray = this.getQueryValue();

            // get query name and isDefault
            var queryName = content.queryNameTextBox.value;
            var isDefault = content.defaultCheckBox.checked;

            // construct custom query object
            var customQuery = {
                type : this.gridNameValue,
                title : queryName,
                condition : JSON.stringify(queryValueArray),
                isDefault : isDefault,
                isPrivate : false
            };

            // save
            this.customQueryService.save(customQuery).then(lang.hitch(this, function(ret) {
                // 保存成功以后通知查询模板的下拉框组件实现联动效果。显示为当前保存的查询模板

                // TODO TBD
                topic.publish(this._TOPIC_ADVANCEDSEARCH_RELOADPREDEFINEDLIST_, customQuery.title);
                // TODO
                this._current_title_is_default_ = customQuery.isDefault;
                this._current_title_condition_ = JSON.stringify(this.getQueryValue());

                // hide save dialog
                saveDialog.hide();

                // show confirm message box
                var messageBoxMsg = null;
                if (ret.code == 0) {
                    messageBoxMsg = 'save_success';
                } else if (ret.code == 1) {
                    messageBoxMsg = 'search_criteria_override';
                    this._search(); // name didn't change and will fire onchange
                    // event and we need to search manually
                    // here.
                }

                MessageBox.show(messageBoxMsg, {
                    autohide : 1000
                });
            }));

        },

        /**
         * get query value of all widget
         */
        getQueryValue : function() {
            var queryValueArray = [];
            for (var i = 0; i < this.widgetList.length; i++) {
                var w = this.widgetList[i];
                if (w.getQueryValue) {
                    var queryValue = w.getQueryValue();
                    if (queryValue) {
                        queryValueArray.push(queryValue);
                    }
                }
            }
            return queryValueArray;
        },

        /**
         * Handle predefined list event
         */
        fillQueryValueAndSearch : function(/* Array */queryValueArray) {
            // prepare widget list as map, using filed name as key
            var widgetMap = {};
            for (var i = 0; i < this.widgetList.length; i++) {
                var w = this.widgetList[i];
                widgetMap[w.field] = w;
            }

            // clear
            this._setDefault();

            // fill query value
            if (queryValueArray) {
                for (var i = 0; i < queryValueArray.length; i++) {
                    var queryValue = queryValueArray[i];
                    var widget = widgetMap[queryValue.field];
                    if (widget && widget.setQueryValue) {
                        widget.setQueryValue(queryValue.value);
                    }
                }
            }

            // search
            this._search();
        }

    });
});