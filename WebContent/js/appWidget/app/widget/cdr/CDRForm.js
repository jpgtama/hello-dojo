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
 * FILE NAME: CDRForm.js
 * 
 * CREATED: 2016年1月4日 下午3:07:46
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/Page2',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/layout/ContentPane',
    'dijit/layout/TabContainer',
    'dijit/registry',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/cdr-form.html'
], function(Page2, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, ContentPane, TabContainer, registry, array, lang, declare, template) {
    return declare('app.widget.cdr.CDRForm', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * template String
         */
        templateString : template,

        /**
         * 
         */
        defObject : null,

        /**
         * 
         */
        pages : null,

        constructor : function(options) {
            lang.mixin(this, options);

            this.pages = this.defObject.pages;

        },

        postCreate : function() {
            this.inherited(arguments);

            // style
            this.set('style', "width: 600px, height: 400px;");

            var tabC = this.tabContainerNode;


            // add tab
            array.forEach(this.pages, lang.hitch(this, function(pageObject) {
                var pageWidget = new Page2({
                    defObject : pageObject
                });

                pageWidget.startup();
                tabC.addChild(pageWidget);
            }))
            
            //this.startup();

            //tabC.startup();

            // ----------------

            // debugger;
            //            
            // // set id
            // var id = registry.getUniqueId('tabContainer');
            //            
            // this.tabContainer.id = id;
            //            
            //            
            // var tabC = new TabContainer({
            // style : "height: 100%; width: 100%;"
            // });
            //            
            //            
            //            
            // //tabC.placeAt("cdrForm_tab");
            // tabC.placeAt(id);
            //            
            // // add tab
            // array.forEach(this.pages, lang.hitch(this, function(pageObject) {
            // var pageWidget = new Page2({
            // defObject : pageObject
            // });
            //                
            // tabC.addChild(pageWidget);
            // pageWidget.startup();
            // }))
            //            
            // tabC.startup();

        }

    });
});