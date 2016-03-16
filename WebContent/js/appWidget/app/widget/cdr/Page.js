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
 * FILE NAME: Page.js
 * 
 * CREATED: 2016年1月4日 下午3:07:33
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/Section',
    'dijit/layout/ContentPane',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Section, ContentPane, array, lang, declare) {
    return declare('app.widget.cdr.Page', [
        ContentPane
    ], {

        defObject : null,

        sectionList : null,

        pageName: null,
        
//        constructor : function(options) {
//            lang.mixin(this, options);
//
//            this.sectionList = this.defObject.sections;
//            this.pageName = this.defObject.pageName;
//            
//        },
//
//        postCreate : function() {
//            this.inherited(arguments);
//
//            // set title
//            this.set('title', this.pageName);
//            
//            // add section
//            array.forEach(this.sectionList, lang.hitch(this, function(sectionObject) {
//                    var sectionWidget = new Section({
//                        defObject: sectionObject
//                    });
//
//                // add child
//                this.addChild(sectionWidget);
//            }));
//        }

    });
});