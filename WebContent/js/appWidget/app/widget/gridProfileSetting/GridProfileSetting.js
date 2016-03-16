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
 * FILE NAME: GridProfileSetting.js
 * 
 * CREATED: 2015年7月7日 下午2:04:57
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/config/profileConfig',
    'app/lang/topic',
    'app/lang/Stateful',
    'app/util/EnumUtil',
    'app/util/Constants',
    'app/widget/MessageBox',
    'app/util/ResourceUtil',
    'app/widget/advanceSearch/_SearchTopicMixin',
    'app/widget/multiSelect2Side/MultiSelect2Side',
    'app/service/DynamicGridService',
    'dojo/store/Memory',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/layout/TabContainer',
    'dijit/layout/ContentPane',
    'dojox/widget/_Invalidating',
    'dojo/request/xhr',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/date',
    'dojo/json',
    'dojo/string',
    'dojo/text!./templates/grid-profile-setting.html',
    'dojo/on',
    'dojo/_base/declare'
], function(profileConfig, topic, Stateful, EnumUtil, constants, MessageBox, i18n, _SearchTopicMixin, MultiSelect2Side, DynamicGridService, Memory, _Widget,
        _TemplatedMixin, _WidgetsInTemplateMixin, TabContainer, ContentPane, _Invalidating, xhr, lang, domClass, domStyle, dojoDate, dojoJson, string,
        template, on, declare) {
    return declare('app.widget.gridProfileSetting.GridProfileSetting', [
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _Invalidating,
        _SearchTopicMixin
    ], {

        /**
         * base class
         */
        baseClass : 'gridProfileSetting',

        /**
         * template String
         */
        templateString : template,

        // 打开时默认选择哪个tab, column 表示 选中列设置 sort 表示排序设置
        defaultTab : 'column',

        data : {},

        /**
         * Override.
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.dynamicGridService = new DynamicGridService();
            this.inherited(arguments);
        },

        /**
         * Override.
         */
        postCreate : function() {
            // 初始化UI
            this.initUI();
            // 添加事件
            this.addEvent();
            // 订阅事件通知
            this.addSubscribleFunction();
            this._toggleDisplaySelect(true, false);
            this.inherited(arguments);
        },

        /**
         * 绑定事件
         */
        addEvent : function() {
            on(this.saveButton, 'click', lang.hitch(this, function() {
                this.executeSave();
            }));
            on(this.cannelButton, 'click', lang.hitch(this, function() {
                topic.publish(this.data.closeTopic, {})
            }));
            on(this.gridColumnTab, 'click', lang.hitch(this, function() {
                var selectedTabCls = this.gridColumnTab.selectedChildWidget.get('class');
                switch (selectedTabCls) {
                case 'columnsSelect':
                    this._toggleDisplaySelect(true, false);
                    break;
                case 'sortSelect':
                    this._toggleDisplaySelect(false, true);
                    break;
                }
            }));
        },

        addSubscribleFunction : function() {
            this.subscribe(constants.common.SELECTED_COLUMNS_DATA_CHANGE, lang.hitch(this, function(count) {
                if (count > 0) {
                    this.enabledSave();
                } else {
                    this.disabledSave();
                }
            }));
        },

        initUI : function() {
            // 获得grid 全局的配置信息
            var configDef = this.dynamicGridService.getMataConfig(this.gridName);
            configDef.then(lang.hitch(this, function(data) {
                // 全局的信息
                var mateData = data;
                // 存储全局的column的map
                this.data.mateColumnsMap = this.convertMateColumnArr2Map(mateData);

                // 获得用户的配置信息
                var userProfile = profileConfig.get(this.gridName);

                var mixData = {
                    'metaData' : mateData,
                    'userProfile' : userProfile
                };
                // 获得columns
                var columnRet = this.selectionColumnData(mixData);
                // 获得sort
                var sortRet = this.selectionSortData(mixData);

                this.gridColumnSetting.set('columnsDataChangeTopic', constants.common.SELECTED_COLUMNS_DATA_CHANGE)

                this.gridColumnSetting.renderData({
                    columns : this.prepareSelect2SideData(columnRet.columns, 'column'),
                    selectedColumns : this.prepareSelect2SideData(columnRet.selectedColumns, 'column'),
                });

                this.gridSortSetting.renderData({
                    columns : this.prepareSelect2SideData(sortRet.columns, 'sort'),
                    selectedColumns : this.prepareSelect2SideData(sortRet.selectedColumns, 'sort'),
                });
            }));
        },

        /**
         * 将全局的所有column转化成一个key,value 的形式，方便后面取值
         */
        convertMateColumnArr2Map : function(mateData) {
            var columnMap = {};
            for (var i = 0; i < mateData.columns.length; i++) {
                columnMap[mateData.columns[i].field] = mateData.columns[i];
            }
            return columnMap;
        },

        /**
         * 执行保存
         */
        executeSave : function() {
            var columnsData = this.gridColumnSetting.getAllData();

            var sortColumnsData = this.gridSortSetting.getAllData();

            var pushData = {
                columns : [],
                sort : []
            }
            for (var i = 0; i < columnsData.selectedColumns.length; i++) {
                var selectedColumn = columnsData.selectedColumns[i];
                var column = this.data.mateColumnsMap[selectedColumn.value];
                var tempData = {
                    field : column.field,
                    index : selectedColumn.index
                }
                pushData.columns.push(tempData);
            }
            for (var i = 0; i < sortColumnsData.selectedColumns.length; i++) {
                var selectedColumn = sortColumnsData.selectedColumns[i];
                var column = this.data.mateColumnsMap[selectedColumn.value];
                var tempData = {
                    field : column.field,
                    method : selectedColumn.otherValue
                }
                pushData.sort.push(tempData);
            }
            // 保存用户配置
            profileConfig.put(this.gridName, pushData);

            // 重新加载grid
            topic.publish(this._TOPIC_DYNAMICGRID_PROFILE_SETTING_);

            topic.publish(this.data.closeTopic, {});
            // 弹出成功的消息
            MessageBox.show(i18n.getText('save_success'));
        },

        /**
         * 切换tab
         */
        _toggleDisplaySelect : function(columnIsDisplay, sortIsDisplay) {
            var columnDisplay = columnIsDisplay ? 'block' : 'none';
            var sortDisplay = sortIsDisplay ? 'block' : 'none';
            domStyle.set(this.gridColumnSetting.domNode, 'display', columnDisplay);
            domStyle.set(this.gridSortSetting.domNode, 'display', sortDisplay);
        },

        /**
         * 筛选栏位选择的数据
         */
        selectionColumnData : function(data) {

            var retData = {
                columns : [],
                selectedColumns : []
            };
            // 先将不能选择或不能排序的数据排除掉
            var allColums = [];
            for (var i = 0; i < data.metaData.columns.length; i++) {
                var metaItem = data.metaData.columns[i];
                if (!metaItem.isOptional) {
                    continue;
                }
                allColums.push(metaItem);
            }
            retData.columns = allColums;
            // 如果存在用户配置column,就加载用户配置
            if (data.userProfile && data.userProfile.columns && data.userProfile.columns.length != 0) {
                for (var i = 0; i < data.userProfile.columns.length; i++) {
                    var item = data.userProfile.columns[i];
                    if (this.data.mateColumnsMap[item.field]) {
                        var oldItem = dojo.clone(this.data.mateColumnsMap[item.field]);
                        lang.mixin(oldItem, item);
                        retData.selectedColumns.push(oldItem);
                    }
                }
                // 如果没有用户配置的column,就加载默认配置
            } else {
                for (var i = 0; i < data.metaData.columns.length; i++) {
                    var metaItem = data.metaData.columns[i];
                    if (metaItem.isDisplay) {
                        retData.selectedColumns.push(metaItem);
                    }
                }
            }
            return retData;
        },

        /**
         * 筛选排序方式的数据
         */
        selectionSortData : function(data) {
            var retData = {
                columns : [],
                selectedColumns : []
            };
            // 先将不能选择或不能排序的数据排除掉
            var allColums = [];
            for (var i = 0; i < data.metaData.columns.length; i++) {
                var metaItem = data.metaData.columns[i];
                if (!metaItem.sortable) {
                    continue;
                }
                allColums.push(metaItem);
            }
            retData.columns = allColums;
            // 如果存在用户配置column,就加载用户配置
            if (data.userProfile && data.userProfile.sort && data.userProfile.sort.length != 0) {
                for (var i = 0; i < data.userProfile.sort.length; i++) {
                    var item = data.userProfile.sort[i];
                    item.index = i + 1;
                    if (this.data.mateColumnsMap[item.field]) {
                        var oldItem = dojo.clone(this.data.mateColumnsMap[item.field]);
                        lang.mixin(oldItem, item);
                        retData.selectedColumns.push(oldItem);
                    }
                }
                // 如果没有用户配置的column,就加载默认配置
            } else {
                if (data.metaData.sort && data.metaData.sort.length != 0) {
                    for (var i = 0; i < data.metaData.sort.length; i++) {
                        var metaItem = data.metaData.sort[i];
                        metaItem.index = i + 1;
                        var oldItem = dojo.clone(this.data.mateColumnsMap[metaItem.field]);
                        lang.mixin(oldItem, metaItem)
                        retData.selectedColumns.push(oldItem);
                    }
                }
            }
            return retData;
        },

        /**
         * 准备数据给MutiSelect2Side组件
         */
        prepareSelect2SideData : function(columns, type) {
            var ret = [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var labelTemp = '';
                var otherValueTemp = null;
                if (type == 'column') {
                    otherValueTemp = column.width;
                } else {
                    // debugger;
                    if (column.method) {
                        otherValueTemp = column.method;
                    } else {
                        otherValueTemp = 'asc';
                    }
                }

                ret.push({
                    value : column.field,
                    otherValue : otherValueTemp,
                    display : column.display,
                    index : column.index
                });
            }
            return ret;
        },

        enabledSave : function() {
            domClass.remove(this.saveButton.domNode, 'buttonDisabled');
            domClass.add(this.saveButton.domNode, 'blue');
            this.saveButton.set('disabled', false);

        },

        disabledSave : function() {
            domClass.remove(this.saveButton.domNode, 'blue');
            domClass.add(this.saveButton.domNode, 'buttonDisabled');
            this.saveButton.set('disabled', true);
        },
    });
});