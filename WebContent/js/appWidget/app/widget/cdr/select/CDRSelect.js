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
 * FILE NAME: CDRSelect.js
 * 
 * CREATED: 2016年1月4日 上午10:15:54
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/form/Select',
    'dojo/dom-style',
    'dojo/Stateful',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/cdr-select.html'
], function(_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, Select, domStyle, Stateful, array, lang, declare, template) {
    return declare('app.widget.cdr.select.CDRSelect', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        baseClass : 'CDRSelect',

        /**
         * template String
         */
        templateString : template,

        /**
         * def data
         */
        defData : null,

        /**
         * Override super class
         */
        constructor : function(param) {
            // clone param to defData
            this.defData = lang.clone(param);
        },

        /**
         * Override super class
         */
        postCreate : function() {
            // display
            if (this.defData.hidden) {
                this._hideLabel();
                this._hideOptions();
            }

            // startup select node
            this.selectNode.startup();
            
            // set options
            this.setOptions(this.defData.options);
        },

        /**
         * set options
         */
        setOptions : function(/* Object */givenOptions) {
            // set it to defData.options.
            this.defData.options = lang.clone(givenOptions);
            
            // clone
            var clonedOptions = lang.clone(givenOptions);

            // add 请选择
            clonedOptions.unshift({
                label : '--请选择--',
                value : ''
            });

            // set default, if no option is selected, then set the first one
            // selected
            var isSelected = false;
            array.forEach(clonedOptions, function(item) {
                isSelected = item.selected || isSelected;
            });

            if (!isSelected) {
                clonedOptions[0].selected = true;
            }

            // refresh selectNode
            var oldOptions = this.selectNode.getOptions();
            this.selectNode.removeOption(oldOptions);
            this.selectNode.options = clonedOptions;
            this.selectNode.reset();
        },

        /**
         * hide label
         */
        _hideLabel : function() {
            domStyle.set(this.labelNode.domNode, 'display', 'none');
        },

        /**
         * hide options
         */
        _hideOptions : function() {
            domStyle.set(this.selectNode.domNode, 'display', 'none');
        },

        /**
         * get value to save user selected data to db
         */
        getValue : function() {
            var key = this.defData.key;
            var value = this.selectNode.get('value');
            var ret = {};
            ret[key] = value;
            return ret;
        },

        /**
         * set value from data json
         */
        setValue : function(/* Object */valueObject) {
            var key = this.defData.key;
            var value = valueObject[key];
            if (value) {
                this.selectNode.set('value', value);
            }
        },

        /**
         * get lable of this field
         */
        getLabel : function() {
            return this.defData.label;
        },

        /**
         * 
         */
        setLabel : function(/* String */value) {
            this.defData.label = value;
            this.labelNode.set('value', value);
        },

        /**
         * Hide lable node
         */
        hideLabel : function() {
            this._hideLabel();
        },

        /**
         * for form builder, save structure
         */
        toJson : function() {
            return this.defData;
        },

        /**
         * reset this field by the json structure data
         */
        fromJson : function(/* Object */jsonStructure) {
            // clone
            this.defData = lang.clone(jsonStructure);

            // update label
            this.setLabel(this.defData.label);

            // update options
            this.setOptions(this.defData.options);
        },

        /**
         * two columns
         */
        getPropertyDialogParams : function() {
            var column1 = {
                label : this.defData.label,
                options : this.defData.options,
                hidden : this.defData.hidden
            };
            var column2 = {
                required : this.defData.required
            };

            return [
                column1,
                column2
            ];
        }

    });
});