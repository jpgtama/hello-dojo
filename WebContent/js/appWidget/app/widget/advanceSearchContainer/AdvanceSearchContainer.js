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
 * FILE NAME: AdvanceSearchContainer.js
 * 
 * CREATED: 2015年8月11日 下午3:16:49
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/advanceSearch/DynamicAdvanceSearch',
    'app/widget/gridProfileSetting/GridProfileSetting',
    'app/widget/Dialog',
    'app/lang/topic',
    'app/lang/SubscribeMixin',
    'app/util/ResourceUtil',
    'app/util/Constants',
    'dijit/form/DropDownButton',
    'dijit/TooltipDialog',
    'dijit/popup',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/advance-search-container-dropdown-button.html',
    'dojo/text!./templates/advance-search-container-button.html',
    'dojo/on',
    'dojo/dom',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(DynamicAdvanceSearch, GridProfileSetting, Dialog, topic, SubscribeMixin, i18n, constants, DropDownButton, TooltipDialog, popup, _WidgetBase,
        _TemplatedMixin, _WidgetsInTemplateMixin, templateDropDown, templateButton, on, dom, lang, declare) {
    return declare('app.widget.advanceSearchContainer.AdvanceSearchContainer', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        SubscribeMixin
    ], {

        /**
         * template
         */
        templateString : '',

        /**
         * base class
         */
        baseClass : 'advanceSearchContainer',

        /**
         * mode: tooltip | dialog, default is popup dialog,
         */
        mode : '',

        /**
         * the dynamicAdvanceSearch widget
         */
        dynamicAdvanceSearch : null,

        /**
         * gridName
         */
        gridName : '',

        /**
         * queryData
         */
        queryData : null,

        /**
         * Override super class
         */
        constructor : function(options) {
            lang.mixin(this, options);
            // choose template
            if (options.mode == 'dialog') {
                this.templateString = templateButton
            } else if (options.mode == 'tooltip') {
                this.templateString = templateDropDown
            }
        },

        /**
         * Override super class
         */
        postCreate : function() {
            var mode = this.mode || 'dialog';

            // create different UI mode
            if (mode == 'dialog') {
                var dynamicAdvanceSearch = new DynamicAdvanceSearch({
                    // TODO
                    gridName : this.gridName,
                    queryData : this.queryData
                });
                this.dynamicAdvanceSearch = dynamicAdvanceSearch;

                var advanceSearchDialog = new Dialog({
                    showTitleBar : false,
                    executeScripts : true,
                    closeTopic : constants.common.COLSE_ADVANCE_SEARCH_DIALOG
                });

                advanceSearchDialog.addChild(dynamicAdvanceSearch);

                // add click event to button
                on(this.buttonNode, 'click', lang.hitch(this, function() {
                    advanceSearchDialog.show();
                }));

            } else if (mode == 'tooltip') {
                var dynamicAdvanceSearch = new DynamicAdvanceSearch({
                    gridName : this.gridName,
                    queryData : this.queryData
                });

                this.dynamicAdvanceSearch = dynamicAdvanceSearch;

                var toolTipDialog = new TooltipDialog({

                });
                toolTipDialog.set('class', 'advanceSearchTooltipDialog');

                toolTipDialog.addChild(dynamicAdvanceSearch);

                this.buttonNode.dropDown = toolTipDialog;
                this.buttonNode.startup();

                // 关闭 tooltip
                this.addSubscribe(constants.common.COLSE_ADVANCE_SEARCH_DIALOG, lang.hitch(this, function(data) {
                    this.buttonNode.toggleDropDown();
                }));
            }

        }

    });
});