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
 * FILE NAME: ValidationTextBox.js
 * 
 * CREATED: Jul 1, 2015 2:03:25 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/_WidgetI18nMixin',
    'dijit/form/ValidationTextBox',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, ValidationTextBox, lang, declare) {
    return declare('app.widget.ValidationTextBox', [
        ValidationTextBox,
        _WidgetI18nMixin
    ], {
        
        /**
         * predefined pattern 1: 
         * 
         * English words, Chinese words, space, @ , . ; ^ & ( ) _ -
         * 
         * 空格和特殊字符支持半角全角
         * 
         */
        GENERAL_PATTERN: '[\\s\\-\\@\\,\\.\\;\\^\\&\\(\\)\\_A-Za-z0-9\\u4E00-\\u9FA5\\uff20\\uff0c\\uff0e\\uff1b\\uff3e\\uff06\\uff08\\uff09\\uff3f\\uff0d]+',
        
        /**
         * predefind pattern, its value is the name of the pattern, like 'GENERAL_PATTERN'.
         * 
         * If this attribute was used, then 'pattern' will be override.
         */
        predefindPattern: null,
        
        
        /**
         * Override 
         * When you paste or enter a sentence or a charCode in the textbox, 
         * it will change the value of this widget instead of when the textbox happens blur event.
         */
        intermediateChanges : true,

        /**
         * Override
         */
        constructor: function(/*Object*/options){
            lang.mixin(this, options);
            this.inherited(arguments);
            
            // check if predefined pattern is used
            if(this.predefindPattern){
                this.pattern = this[this.predefindPattern];
            }
        },
        
        /**
         * Override
         */
        filter : function(/* String */value) {
            // convert the value to string if it's not a string
            if (value && typeof value != 'string') {
                value += '';
            }
            return this.inherited(arguments);
        }
    });
});