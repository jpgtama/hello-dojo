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
 * FILE NAME: TemplateDialog.js
 * 
 * CREATED: 2016年4月12日 下午3:51:40
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/Dialog',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/template-dialog.html'
], function(Dialog, lang, declare, template) {
    return declare('app.research.widget.dialog.TemplateDialog', Dialog, {

        /**
         * Override, default false
         */
        showTitleBar : false,

        /**
         * Override, default false
         */
        executeScripts : true,

        /**
         * Override, default width
         */
        width : '900px',

        /**
         * Override, default height
         */
        height : '590px',

        /**
         * title
         */
        title : '',

        /**
         * template
         */
        template : null,

        /**
         * content
         */
        content : null,

        /**
         * segment instance
         */
        segment : null,

        /**
         * Override
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);
        },

        /**
         * Override
         */
        buildRendering : function() {
            var containerNodeStr = '<div data-dojo-attach-point="containerNode" class="dijitDialogPaneContent">';
            this.templateString = this.templateString.replace(containerNodeStr, containerNodeStr + template);
            this.inherited(arguments);
        },

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);
            if (this.content) {
                this.contentNode.set('content', this.content);
            }
            if (this.segment) {
                this.contentNode.addChild(this.segment);
            }
        },

        /**
         * Get Content all children or first major one
         */
        getContent : function(/* Boolean */isAllChildren) {
            if (isAllChildren)
                return this.contentNode.getChildren();
            return this.contentNode.getChildren()[0];
        },

        /**
         * submit action
         */
        _submitAction : function() {
            var target = this.getContent();
            if (target && target._doSubmit) {
                var result = target._doSubmit();
                if (result == false)
                    return;
            }
            var result = this._submitCallback();
            if (result == false)
                return;
            this.destroyRecursive();
        },

        /**
         * cancel action
         */
        _cancelAction : function() {
            var target = this.getContent();
            if (target && target._doCancel) {
                var result = target._doCancel();
                if (result == false)
                    return;
            }
            var result = this._cancelCallback();
            if (result == false)
                return;
            this.destroyRecursive();
        },

        /**
         * callback for submit
         */
        _submitCallback : function() {
        },

        /**
         * callback for cancel
         */
        _cancelCallback : function() {
        },

        /**
         * inject callback functions
         */
        then : function(/* Function */submitback, /* Function */cancelback) {
            if (submitback) {
                this._submitCallback = submitback;
            }
            if (cancelback) {
                this._cancelCallback = cancelback;
            }
            return this;
        }

    });
});