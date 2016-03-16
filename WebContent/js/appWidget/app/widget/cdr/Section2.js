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
 * FILE NAME: Section2.js
 * 
 * CREATED: 2016年1月4日 下午2:24:32
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/FieldParser',
    'dojox/layout/GridContainer',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/TitlePane',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/section.html'
], function(fieldParser, GridContainer, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, TitlePane, array, lang, declare, template) {
    return declare('app.widget.cdr.Section2', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * template String
         */
        templateString : template,
        
        /**
         * section definition object
         */
        defObject : null,

        /**
         * 
         */
        sectionName : null,

        /**
         * the number of columns
         */
        cols : null,

        /**
         * 
         */
        fields : null,

        constructor : function(options) {
            lang.mixin(this, options);

            this.cols = this.defObject.columns.length;

            this.sectionName = this.defObject.name;

            // handle fields, add 'column' property
            this.fields = [];
            
            var _this = this;
            
            var columnIndex = 1;
            array.forEach(this.defObject.columns, function(item) {
                var fieldsInColumn = item.fields;
                
                // add column to field
                array.forEach(fieldsInColumn, function(field) {
                    field.column = columnIndex;
                    
                    // add to this.fields
                    _this.fields.push(field);
                });
                
                // increase column index
                columnIndex++;
                
            });
        },

        postCreate : function() {
            this.inherited(arguments);
            
            // create grid container & place at title pane
//            var gc = new GridContainer({
//                nbZones : this.cols,
//                hasResizableColumns : false,
//                isAutoOrganized: false,
//                acceptTypes : [
//                    'CDR_Element'
//                ]
//            });
            
//            gc.placeAt(this.titlePaneNode.domNode.id);

            // add fields to section
            var gc = this.gridContainer;
            
            array.forEach(this.fields, lang.hitch(this, function(item) {
                var fieldWidget = fieldParser.parse(item);

                // add child
                // column position of the child, default value is 1
                var columnValue = item.column || 1;     
                
                // add column property to field widget
                //fieldWidget.column = columnValue
                
                // insert child to grid container, need to convert column position by -1
                gc.addChild(fieldWidget, columnValue);
            }));

            // startup
            gc.startup();
            gc.disableDnd();
        }

    });
});