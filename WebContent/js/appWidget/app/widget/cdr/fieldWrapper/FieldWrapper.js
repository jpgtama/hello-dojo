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
 * FILE NAME: FieldWrapper.js
 * 
 * CREATED: 2016年1月21日 上午8:49:36
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/columnForm/ColumnForm',
    'app/widget/TextBox',
    'dojox/layout/TableContainer',
    'dijit/ConfirmDialog',
    'app/widget/cdr/CustomInlineEditBox',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/registry',
    'dojo/aspect',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/declare',
    'dojo/text!./templates/FieldWrapper.html',
    'xstyle/css!./styles/FieldWrapper.css'
], function(ColumnForm, TextBox, TableContainer, ConfirmDialog, CustomInlineEditBox, _WidgetBase, _WidgetsInTemplateMixin, _TemplatedMixin, registry, aspect, lang, on, declare, template) {
    return declare([
        _WidgetBase,
        _WidgetsInTemplateMixin,
        _TemplatedMixin
    ], {

        templateString : template,

        startup : function() {

            var fieldWrapper = this;

            // set label
            this.getChildren()[0].hideLabel();
            this.labelNode.innerHTML = this.getChildren()[0].getLabel();
            

            // set inline edit box
            var editor = new CustomInlineEditBox({
                editor : TextBox,
                autoSave : true
            }, this.labelNode).startup();

            // update label
            aspect.before(this.getChildren()[0], 'setLabel', function(newLabelValue) {
                var editor = registry.byNode(fieldWrapper.labelNode);
                editor.set('value', newLabelValue);
            });
            
            // call inheritance
            this.inherited(arguments);
        },

        onPropertiesClick : function() {
            var fieldWrapper = this;
            
            //
            var myDialog = new ConfirmDialog({
                title : "字段属性",
                
                onCancel: function() {
                    this.destroyRecursive();
                },
                
                onExecute: function() {
                    // do something
                    var newJsonStructure = this.get('value');
                    // set new json structure back to field
                    fieldWrapper.getChildren()[0].fromJson(newJsonStructure);
                    
                    // destroy
                    this.destroyRecursive();
                }
            });

            var propertyDialogParams = this.getChildren()[0].getPropertyDialogParams();
            
            var columnForm = new ColumnForm({columns: propertyDialogParams});

            myDialog.addChild(columnForm);

            myDialog.show();
        },

        onCloseClick : function() {
            // destory this
            this.destroyRecursive(false);
        }

    });
});