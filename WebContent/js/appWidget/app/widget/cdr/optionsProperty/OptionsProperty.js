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
 * FILE NAME: OptionsProperty.js
 * 
 * CREATED: 2016年2月2日 上午11:31:16
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/_base/declare',
    'dojo/text!./templates/OptionsProperty.html',
    'xstyle/css!./styles/OptionsProperty.css'
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domC, query, declare, template) {
    return declare('app.widget.cdr.OptionsProperty', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        templateString: template,
        
        baseClass: 'optionsPropery',
        
        postCreate: function() {
            
            var options = this.value;
            
            // create options 
            for(var i in options){
                var option = options[i];
                
                // create li dom
                var li = domC.create('li', null, this.listNode);
                var div1 = domC.create('div', null,  li);
                var div2 = domC.create('div', null, li);
                domC.create('input', {type: 'radio', name: this.name}, div1);
                domC.create('input', {type: 'text', value: option.label}, div2);
                
            }
            
            
        },
        
        _getValueAttr: function() {
            // return value, a list contains { label: '', value: 101, checked: true}
            var retValue = [];
            
            // li items
            var liItems = this.listNode.children;
            
            for(var i=1;i<liItems.length; i++){
                var li = liItems[i];
                
                // option name & value
                var optionName = query('input[type=text]', li)[0].value;
                var optionValue = 100 + i;
                
                // option is checked or not
                var checked = query('input[type=radio]', li)[0].checked;
                
                // return value item
                var valueItem = {
                    label: optionName,
                    value: optionValue,
                    checked: checked
                };
                
                // add to array
                retValue.push(valueItem);
            }
            
            // return 
            return retValue;
            
        }
        
        
    });
});