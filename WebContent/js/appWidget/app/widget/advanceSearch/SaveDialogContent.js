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
 * FILE NAME: SaveDialogContent.js
 * 
 * CREATED: 2015年8月18日 上午10:03:21
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/save-dialog-content.html',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, on, lang, declare) {
    return declare('app.widget.advanceSearch.SaveDialogContent', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {
        /**
         * template
         */
        templateString : template,
        
        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);
        },

        /**
         * Override
         */
        postCreate : function() {
        }

    });
});