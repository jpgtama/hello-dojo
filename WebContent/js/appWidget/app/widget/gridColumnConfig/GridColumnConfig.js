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
 * FILE NAME: GridColumnConfig.js
 * 
 * CREATED: 2015年8月12日 上午10:56:33
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/gridProfileSetting/GridProfileSetting',
    'app/widget/Dialog',
    'app/lang/topic',
    'app/lang/SubscribeMixin',
    'app/util/ResourceUtil',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/grid-column-config.html',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(GridProfileSetting, Dialog, topic, SubscribeMixin, i18n, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, lang, declare) {
    return declare('app.widget.gridColumnConfig.GridColumnConfig', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        SubscribeMixin
    ], {
        /**
         * base class
         */
        baseClass : 'gridColumnConfig',

        /**
         * template
         */
        templateString : template,

        /**
         * gridName
         */
        gridName : '',

        /**
         * Override super class
         */
        constructor : function(options) {
            lang.mixin(this, options);
        },

        /**
         * Override super class
         */
        postCreate : function() {

            on(this.buttonNode, 'click', lang.hitch(this, function() {
                var gridColumnConfigDialog = new Dialog({
                    showTitleBar : false,
                    executeScripts : true,
                    width : '500px',
                    height : '400px',
                    class : 'gridColunmConfigDialog'
                });
                var dialogParam = {
                    'gridName' : this.gridName,

                    'data' : {
                        'closeTopic' : gridColumnConfigDialog.get('closeTopic')
                    }
                };
                var gridProfileSetting = new GridProfileSetting(dialogParam, gridColumnConfigDialog.contentPanel);
                gridColumnConfigDialog.show();
            }));

        }
    });
});