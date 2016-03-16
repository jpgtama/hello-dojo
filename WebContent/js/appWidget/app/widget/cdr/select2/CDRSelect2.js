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
 * FILE NAME: CDRSelect2.js
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
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/_base/declare',
    'dojo/text!./templates/cdr-select.html'
], function(_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, Select, array, lang, domConstruct, domAttr, declare, template) {
    return declare('app.widget.cdr.select.CDRSelect2', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * template String
         */
        templateString : template,
        
        
        /**
         * def data
         */
        type: null,
        
        key: null,
        
        label: null,
        
        desc: null,
        
        required: null,
        
        hidden: null,
        
        predefined: null,
        
        defaultValue: null,
        
        permission: null,
        
        groupby: null,
        
        /**
         * Override super class
         */
        constructor : function(param) {
            
            lang.mixin(this, param);
           
            // set value
//            this.label = this.defData.label;
//            this.fieldKey = this.defData.key;
//            this.selectOptions = this.defData.options;
            
            debugger;
            
            // add '请选择'
            this.options.unshift({
                label: '--请选择--',
                value:''
            });
            
            // set default value, if no option is selected, then set the first one selected
            var isSelected = false;
            array.forEach(this.options, lang.hitch(this, function(item) {
                if(item.label === this.defaultValue){
                    item.selected = true;
                    isSelected = true;
                }
            }));
            
            // if there is no selected option, then select the first option
            if(! isSelected){
                this.options[0].selected = true;
            }
            
        },
        
        /**
         * Override super class
         */
        postCreate : function() {
            // set label content
            this.labelNode.innerHTML = this.label;
            
            // set desc
            domAttr.set(this.labelNode, 'title', this.desc);
            
            // set required
            domAttr.set(this.selectNode, 'required', this.required);
            
            // display
            if(this.hidden){
                this.labelNode.style.display = "none";
                this.selectNode.domNode.style.display = "none";
            }
            
            // startup select node
            // this.selectNode.startup();
            array.forEach(this.options, lang.hitch(this, function(item) {
                var optionItem = domConstruct.create("option", { innerHTML: item.label , value: item.value});
                
                if(item.selected){
                    domAttr.set(optionItem, 'selected', 'selected');
                }
                
                domConstruct.place(optionItem, this.selectNode);
                
            }));
            
            
            // 
            window[this.key] = this;
        },
        
        /**
         * get value
         */
        getValue: function() {
            var key = this.key;
            var value = domAttr.get(this.selectNode, 'value');
            var ret = {};
            ret[key] = value;
            return ret;
        },
        
        /**
         * set value
         */
        setValue: function(/*Object*/ valueObject) {
            var key = this.key;
            var value = valueObject[key];
            if(value){
//                this.selectNode.set('value', value);
                domAttr.set(this.selectNode, 'value', value);
            }
        }
        
    });
});