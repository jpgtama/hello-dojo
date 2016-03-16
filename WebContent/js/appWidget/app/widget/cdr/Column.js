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
 * FILE NAME: Column.js
 * 
 * CREATED: 2016年1月4日 下午2:02:22
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/FieldParser',
    'dijit/layout/ContentPane',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(fieldParser, ContentPane, array, lang, declare) {
    return declare('app.widget.cdr.Column', [
        ContentPane
    ], {

        /**
         * column definition object
         */
        defObject: null,
        
        /**
         * field definition list
         */
        fields: null,
        
//        constructor: function(options) {
//            lang.mixin(this, options);
//            this.fields = this.defObject.fields;
//        },
//        
//        postCreate: function() {
//          
//            // parse field list
//            array.forEach(this.fields, lang.hitch(this, function (item) {
//                var fieldWidget = fieldParser.parse(item);
//                this.addChild(fieldWidget);
//            }));
//        }
        
        
    });
});