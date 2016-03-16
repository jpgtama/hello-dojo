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
 * FILE NAME: ColumnForm.js
 * 
 * CREATED: 2016年1月22日 上午10:42:02
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/labelMixin/_LabelMixin',
    'app/widget/cdr/booleanProperty/BooleanProperty',
    'app/widget/cdr/optionsProperty/OptionsProperty',
    'dijit/form/RadioButton',
    'dijit/form/TextBox',
    'dijit/_Container',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/request',
    'dojo/_base/declare',
    'dojo/text!./templates/ColumnForm.html',
    'dojo/text!./params.json',
    'xstyle/css!./styles/ColumnForm.css'
], function(_LabelMixin, BooleanProperty, OptionsProperty, RadioButton, TextBox, _Container, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domClass, domC, request,
        declare, template, params) {
    return declare([
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _Container
    ], {

        templateString : template,

        /**
         * use to hold the columns
         */
        columns: null,
        
        
        /**
         * Override
         */
        constructor : function() {
            this.propertyWidgetFactoryMap = {
                'text' : function(/* Object */propertyDef) {
                    var label = propertyDef.label;
                    var key = propertyDef.key;
                    var value = propertyDef.value;

                    var textBox = new declare([
                        TextBox,
                        _LabelMixin
                    ], {
                        label : label,
                        name : key,
                        value : value
                    })();

                    return textBox;
                },

                'boolean' : function(/* Object */propertyDef) {
                    var label = propertyDef.label;
                    var key = propertyDef.key;
                    var value = propertyDef.value;

                    var booleanProperty = new declare([
                        BooleanProperty,
                        _LabelMixin
                    ], {
                        label : label,
                        name : key,
                        value : value
                    })();

                    return booleanProperty;
                },

                'options' : function(/* Object */propertyDef) {
                    var label = propertyDef.label;
                    var key = propertyDef.key;
                    var value = propertyDef.value;

                    var optionsPropertyWidget = new declare([
                        OptionsProperty,
                        _LabelMixin
                    ], {
                        label : label,
                        name : key,
                        value : value
                    })();

                    return optionsPropertyWidget;
                }
            };

            this.propertyMap = {
                label : {
                    display : '字段名称',
                    widgetFactory : this.propertyWidgetFactoryMap['text']
                },

                options : {
                    display : '字段选项',
                    widgetFactory : this.propertyWidgetFactoryMap['options']
                },

                hidden : {
                    display : '隐藏字段',
                    widgetFactory : this.propertyWidgetFactoryMap['boolean']
                },

                required : {
                    display : '必填项',
                    widgetFactory : this.propertyWidgetFactoryMap['boolean']
                },

                groupby : {
                    display : '归属字段'
                }

            };

        },

        /**
         * Override
         */
        postCreate : function() {
            var columnForm = this;
            // get params
            var columns = this.columns;
            
            // get columns
            columns.forEach(function(column) {
                // column wrapper
                var columnWrapper = domC.create('div');
                domClass.add(columnWrapper, 'column');

                // create widget column by column
                for ( var propertyName in column) {
                    var propertyValue = column[propertyName];
                    var propertyWidget = columnForm._createPropertyWidget(propertyName, propertyValue);
                    if (propertyWidget) {
                        domC.place(propertyWidget.domNode, columnWrapper);
                    }
                }

                // add child
                domC.place(columnWrapper, columnForm.containerNode);
            });

            this.inherited(arguments);

        },

        _createPropertyWidget : function(propertyName, propertyValue) {
            // get property widget factory from property map
            var propertyItem = this.propertyMap[propertyName];

            if (propertyItem) {
                // get widget factory
                if (propertyItem.widgetFactory) {
                    var propertyDef = {
                        label : propertyItem.display,
                        key : propertyName,
                        value : propertyValue
                    };

                    var propertyWidget = propertyItem.widgetFactory(propertyDef);

                    return propertyWidget;

                } else {
                    console.error('factory not found for property: ', propertyName);
                }

            } else {
                console.error('property: ', propertyName, ' item is not found in propery map');
            }

        }

    // startup : function() {
    //            
    // this.inherited(arguments);
    // }

    });
});