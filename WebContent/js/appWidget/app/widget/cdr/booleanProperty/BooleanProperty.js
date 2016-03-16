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
 * FILE NAME: BooleanProperty.js
 * 
 * CREATED: 2016年1月22日 下午2:08:12
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/query',
    'dojo/string',
    'dojo/_base/declare',
    'dojo/text!./templates/BooleanProperty.html',
    'xstyle/css!./Hello.css'
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, query, stringUtil, declare, template) {
    return declare([
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {
        
        templateString: template,
        
        /**
         * the key of the boolean property, default value
         */
        name: 'booleanProperty',
        
        no_display: '否',
        no_value: 'false',
        
        yes_display: '是',
        yes_value: 'true',
        
        
        startup: function() {
            // call inherited
            this.inherited(arguments);
            
            // set value
            this._setValueAttr(this.value);
        },
        
        _setValueAttr: function(/*String*/ value) {
            var valueObject = {};
            valueObject[this.name] = value +''; 
            
            this.formNode.set('value', valueObject);
        },
        
        _getValueAttr: function() {
            return this.formNode.get('value')[this.name];
        },
        
        toJson: function() {
            return {
                "type": "boolean",
                "label": this.label,
                "key": this.name,
                "value": this.getValue()[this.name]
            }
        }

    });
});