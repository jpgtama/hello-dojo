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
 * FILE NAME: MultiSelect2Side.js
 * 
 * CREATED: 2015年7月7日 下午2:42:03
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/topic',
    'app/lang/SubscribeMixin',
    'app/lang/Stateful',
    'app/util/EnumUtil',
    'app/util/Constants',
    'app/util/ArrayUtils',
    'app/widget/MessageBox',
    'app/util/ResourceUtil',
    'dojo/store/Memory',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojox/widget/_Invalidating',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/date',
    'dojo/string',
    'dojo/dom-style',
    'dojo/text!./templates/multi-select2side.html',
    'dojo/on',
    'dojo/_base/declare'
], function(topic, SubscribeMixin, Stateful, EnumUtil, constants, ArrayUtils, MessageBox, i18n, Memory, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin,
        _Invalidating, lang, win, dojoDate, string, domStyle, template, on, declare) {
    return declare('app.widget.multiSelect2Side.MultiSelect2Side', [
        _Widget,
        SubscribeMixin,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _Invalidating
    ], {
        templateString : template,

        data : null,
        // 待选列是否显示otherValue,如'[990]'
        columnsOtherValue : true,
        // 已选列是否显示otherValue,如'[asc]'
        selectedColumnsOtherValue : true,
        // 已选列数据改变的topic
        columnsDataChangeTopic : '',
        // 是否是设置排序的select
        isSortSelect : false,

        baseClass : 'multiSelect2Side',

        constructor : function(options) {
            lang.mixin(this, options);
            this.data = new Stateful({
                columns : [],
                selectedColumns : []
            });
            this.inherited(arguments);
        },
        buildRendering : function() {
            this.inherited(arguments);

        },
        postCreate : function() {
            this.bindEvent();
            this.inherited(arguments);

            if (this.isSortSelect) {
                domStyle.set(this.ascButton, 'display', 'bolck');
                domStyle.set(this.descButton, 'display', 'bolck');
            } else {
                domStyle.set(this.ascButton, 'display', 'none');
                domStyle.set(this.descButton, 'display', 'none');
            }
        },
        /**
         * 绑定事件
         */
        bindEvent : function() {
            on(this.rightButton, 'click', lang.hitch(this, this.addColumn));

            on(this.leftButton, 'click', lang.hitch(this, this.removeColumn));

            on(this.upButton, 'click', lang.hitch(this, this.upColumn));

            on(this.downButton, 'click', lang.hitch(this, this.downColumn));

            on(this.ascButton, 'click', lang.hitch(this, this.ascColumn));

            on(this.descButton, 'click', lang.hitch(this, this.descColumn));
        },
        /**
         * 添加列
         */
        addColumn : function() {
            var columnOptions = this.columns.getSelected();
            this.addOrRemoveOpperationData(columnOptions, this.data.columns, this.data.selectedColumns);

        },
        /**
         * 删除列
         */
        removeColumn : function() {
            var selecedColumnOptions = this.selectedColumns.getSelected();
            this.addOrRemoveOpperationData(selecedColumnOptions, this.data.selectedColumns, this.data.columns);
        },
        /**
         * 列向上移动
         */
        upColumn : function() {
            var columnOptions = this.selectedColumns.getSelected();
            var columns = this.data.selectedColumns;
            if (columnOptions.length != 0) {
                for (var i = 0; i < columnOptions.length; i++) {
                    for (var j = 0; j < columns.length; j++) {
                        if (columnOptions[i].value == columns[j].value) {
                            if (columns[j].index == columns[0].index) {
                                break;
                            }
                            var tempColumn = columns[j - 1];
                            columns[j - 1] = columns[j];
                            columns[j] = tempColumn;
                        }
                    }
                }
                // 对右边下拉框的数据index 重新编号
                this.reIndexNumber(columns);
                var selectedIndex = this.selectedColumns.domNode.selectedIndex;
                // 刷新右边的select
                this.refreshRightSelect();
                this.selectedColumns.domNode.selectedIndex = selectedIndex - 1;
            }
        },
        /**
         * 列向下移动
         */
        downColumn : function() {
            var columnOptions = this.selectedColumns.getSelected();
            var columns = this.data.selectedColumns;
            if (columnOptions.length != 0) {
                for (var i = columnOptions.length - 1; i >= 0; i--) {
                    for (var j = columns.length - 1; j >= 0; j--) {
                        if (columnOptions[i].value == columns[j].value) {
                            if (columns[j].index == columns[columns.length - 1].index) {
                                break;
                            }
                            var tempColumn = columns[j + 1];
                            columns[j + 1] = columns[j];
                            columns[j] = tempColumn;
                        }
                    }
                }
                // 对右边下拉框的数据index 重新编号
                this.reIndexNumber(columns);
                var selectedIndex = this.selectedColumns.domNode.selectedIndex;
                // 刷新右边的select
                this.refreshRightSelect();
                this.selectedColumns.domNode.selectedIndex = selectedIndex + 1;
            }
        },
        /**
         * 设置升序
         */
        ascColumn : function() {
            this.setSortColumn('asc');
        },
        /**
         * 设置降序
         */
        descColumn : function() {
            this.setSortColumn('desc');
        },
        setSortColumn : function(orderBy) {
            console.debug(this.selectedColumns.getSelected());
            var columnOptions = this.selectedColumns.getSelected();
            for (var i = 0; i < columnOptions.length; i++) {
                this.data.selectedColumns[columnOptions[i].index].otherValue = orderBy;
            }
            var selectedIndex = this.selectedColumns.domNode.selectedIndex;
            this.refresh();
            this.selectedColumns.domNode.selectedIndex = selectedIndex;
        },
        addOrRemoveOpperationData : function(columnOptions, spliceColumns, addColumns) {
            if (columnOptions && columnOptions.length != 0) {
                for (var i = spliceColumns.length - 1; i >= 0; i--) {
                    var column = spliceColumns[i];
                    for (var j = 0; j < columnOptions.length; j++) {
                        if (column.value == columnOptions[j].value) {
                            addColumns.push(column);
                            spliceColumns.splice(i, 1);
                        }
                    }
                }
                this.refresh();
            }
        },
        /**
         * 获得数据并开始渲染UI
         */
        renderData : function(data) {
            for (var i = 0; i < data.columns.length; i++) {
                var j = 0;
                for (; j < data.selectedColumns.length; j++) {
                    if (data.columns[i].value == data.selectedColumns[j].value) {
                        this.data.selectedColumns.push(data.selectedColumns[j]);
                        break;
                    }
                }
                if (j == data.selectedColumns.length) {
                    this.data.columns.push(data.columns[i]);
                }
            }
            // 对数据进行初始化的处理
            this.initData();
            // 刷新UI
            this.refresh();
        },
        /**
         * 对数据进行初始化
         */
        initData : function() {
            // 如果存在index对数据进行排序
            ArrayUtils.sortByKey(this.data.columns, 'index');
            ArrayUtils.sortByKey(this.data.selectedColumns, 'index');
        },
        /**
         * 将所有数据的index 重新编号
         */
        renderIndex : function() {

            this.reIndexNumber(this.data.columns);
            this.reIndexNumber(this.data.selectedColumns);
        },
        /**
         * 对指定数据的index 重新编号
         */
        reIndexNumber : function(columns) {
            for (var i = 0; i < columns.length; i++) {
                columns[i].index = i + 1;
            }
        },
        /**
         * 设置label显示
         */
        renderLabel : function() {
            this.renderLabelI18n(this.data.columns, this.columnsOtherValue);
            this.renderLabelI18n(this.data.selectedColumns, this.selectedColumnsOtherValue);
        },

        renderLabelI18n : function(columns, flag) {
            for (var i = 0; i < columns.length; i++) {
                if (flag) {
                    columns[i].label = string.substitute('${0}[${1}]', [
                        i18n.getText(columns[i].display),
                        i18n.getText(columns[i].otherValue)
                    ]);
                } else {
                    columns[i].label = string.substitute('${0}', [
                        i18n.getText(columns[i].display)
                    ]);
                }

            }
        },
        /**
         * 刷新左边的select
         */
        refreshLeftSelect : function() {
            this.clearAllRow(this.columns);
            for (var i = 0; i < this.data.columns.length; i++) {
                var column = this.data.columns[i];
                var node = this.createRow(column.value, column.label);
                this.columns.domNode.appendChild(node);
            }
        },
        /**
         * 刷新右边的select
         */
        refreshRightSelect : function() {
            if(this.columnsDataChangeTopic){
                topic.publish(this.columnsDataChangeTopic,this.data.selectedColumns.length);
            }
            this.clearAllRow(this.selectedColumns);
            for (var i = 0; i < this.data.selectedColumns.length; i++) {
                var column = this.data.selectedColumns[i];
                var node = this.createRow(column.value, column.label);
                this.selectedColumns.domNode.appendChild(node);
            }
        },
        /**
         * 根据数据刷新UI
         */
        refresh : function() {
            // 对数据index重新编号
            this.renderIndex();
            // 设置label显示
            this.renderLabel();
            this.refreshLeftSelect();
            this.refreshRightSelect();
        },
        /**
         * 清空下拉框的option
         */
        clearAllRow : function(obj) {
            for (var i = obj.domNode.options.length; i >= 0; i--) {
                obj.domNode.options.remove(i);
            }
        },
        createRow : function(value, label) {
            var node = win.doc.createElement('option');
            node.innerHTML = label;
            node.value = value;
            return node;
        },
        // 获得所有数据
        getAllData : function() {
            return dojo.clone(this.data);
        }
    });
});