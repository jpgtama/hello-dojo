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
 * FILE NAME: Section.js
 * 
 * CREATED: 2016年1月4日 下午2:24:32
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/Column',
    'dijit/TitlePane',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Column, TitlePane, array, lang, declare) {
    return declare('app.widget.cdr.Section', [
        TitlePane
    ], {

        /**
         * section definition object
         */
        defObject: null,
        
        /**
         * columns
         */
        columns : null,
        
        
        sectionName: null,

//        constructor : function(options) {
//            lang.mixin(this, options);
//
//            this.columns = this.defObject.columns;
//            
//            this.sectionName = this.defObject.sectionName;
//        },
//
//        postCreate : function() {
//            this.inherited(arguments);
//            
//            // set section name
//            this.set('title', this.sectionName);
//            
//            // create columns
//            array.forEach(this.columns, lang.hitch(this, function(column) {
//                var columnWidget = new Column({
//                    defObject : column
//                });
//
//                // add child
//                this.addChild(columnWidget);
//            }));
//            
//            // startup
//            this.startup();
//        }

    });
});