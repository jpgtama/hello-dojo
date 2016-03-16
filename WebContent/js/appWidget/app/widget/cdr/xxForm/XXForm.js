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
 * FILE NAME: XXForm.js
 * 
 * CREATED: 2016年2月23日 下午4:28:07
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/CustomTabContainer',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/layout/ContentPane',
    'dojo/_base/declare',
    'dojo/text!./templates/XXForm.html'
], function(CustomTabContainer, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, ContentPane, declare, template) {
    return declare('app.widget.cdr.xxForm.XXForm', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * template String
         */
        templateString : template,

        postCreate : function() {
            var formNode = this.formNode;

            var tabContainer = new CustomTabContainer({
                titleWidth : 60,
                titleEditable : true,
                switchCheck : true,
                closeCheck : true
            });

            var cp1 = new ContentPane({
                title : "Food",
                content : "We offer amazing food"
            });
            tabContainer.addChild(cp1);

            var cp2 = new ContentPane({
                title : "Drinks",
                content : "We are known for our drinks."
            });
            tabContainer.addChild(cp2);
            
            
            for(var i=0;i<20;i++){
                var cp = new ContentPane({
                    title : "Drinks",
                    content : "We are known for our drinks."
                });
                
                tabContainer.addChild(cp); 
            }

            formNode.addChild(tabContainer);

            this.inherited(arguments);
        }

    });
});