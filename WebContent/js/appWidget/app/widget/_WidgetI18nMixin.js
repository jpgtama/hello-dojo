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
 * FILE NAME: _WidgetI18nMixin.js
 * 
 * CREATED: Jul 1, 2015 11:43:11 AM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/ResourceUtil',
    'dojo/_base/declare'
], function(i18n, declare) {
    return declare('app.widget._WidgetI18nMixin', null, {

        /**
         * use original dojox.mvc.Output._output without i18n
         */
        original : false,

        /** Override* */
        _setLabelAttr : function(/* String */content) {
            if (!this.original) {
                var oldValue = content;
                content = i18n.getText(content);
                if (content == undefined)
                    content = oldValue;
            }
            this._set("label", content);
            // var labelNode = this.containerNode || this.focusNode;
            // labelNode.innerHTML = content;
            this.inherited(arguments);
        },

        /** Override* */
        _setPlaceHolderAttr : function(/* String */content) {
            if (!this.original) {
                var oldValue = content;
                content = i18n.getText(content);
                if (content == undefined)
                    content = oldValue;
            }
            this._set("placeHolder", content);
            // var labelNode = this.containerNode || this.focusNode;
            // labelNode.placeholder = content;
            this.inherited(arguments);
        },

        _setPlaceholderAttr : function(/* String */content) {
            this._set("placeholder", content);
            this._setPlaceHolderAttr(content);
        },

        /** Override* */
        _setInvalidMessageAttr : function(/* String */content) {
            if (!this.original) {
                if (content != '$_unset_$') {
                    var oldValue = content;
                    content = i18n.getText(content);
                    if (content == undefined)
                        content = oldValue;
                }
            }
            this._set("invalidMessage", content);
            this.inherited(arguments);
        },

        /** Override* */
        _setMissingMessageAttr : function(/* String */content) {
            if (!this.original) {
                if (content != '$_unset_$') {
                    var oldValue = content;
                    content = i18n.getText(content);
                    if (content == undefined)
                        content = oldValue;
                }
            }
            this._set("missingMessage", content);
            this.inherited(arguments);
        },

        /** Override* */
        _setPromptMessageAttr : function(/* String */content) {
            if (!this.original) {
                var oldValue = content;
                content = i18n.getText(content);
                if (content == undefined)
                    content = oldValue;
            }
            this._set("promptMessage", content);
            this.inherited(arguments);
        }

    });
});