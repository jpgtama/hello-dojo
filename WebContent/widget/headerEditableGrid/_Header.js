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
 * FILE NAME: _Header.js
 * 
 * CREATED: 2016年6月16日 下午2:41:59
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/form/Textarea',
    'dijit/InlineEditBox',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Textarea, InlineEditBox, _WidgetBase, _TemplatedMixin, stringUtil, lang, declare) {
    return declare([
        _WidgetBase,
        _TemplatedMixin
    ], {

        // This class is usded to render dgrid header and add InlineEditBox as
        // header so users can edit title and the changes are written into
        // column
        // definition object.

        /**
         * template string, because InlineEditorBox need a non widget to
         * startup, so we add another div with attach point contentNode to place
         * InlineEditorBox.
         */
        templateString : '<div>  <div data-dojo-attach-point="contentNode"></div>    </div>',

        /**
         * hold the editor instances and destroy it when header was destroyed.
         */
        _editorInstance : null,

        /**
         * Override
         */
        postCreate : function() {
            // call parent
            this.inherited(arguments);

            // set header content
            this.contentNode.innerHTML = this.headerContent;

            // add editor ability
            var header = this;
            var editor = new InlineEditBox({
                autoSave : true,

                onChange : function(value) {
                    // empty or blank is not accepted
                    if (stringUtil.trim(value).length === 0) {
                        // this.wrapperWidget._resetValue hold the last saved
                        // value and we set the value back
                        this.set('value', this.wrapperWidget._resetValue);
                    } else {
                        // invoke call back function with new value
                        header.onChange(value);
                    }
                }
            }, this.contentNode);

            // assign to this
            this._editorInstance = editor;
            this._editorInstance.startup();
        },

        /**
         * Override, destroy editor instance when this header was destroyed.
         */
        destroy : function() {
            // destroy editor
            if (this._editorInstance) {
                if (this._editorInstance.destroy) {
                    // console.log('I am going to destroy my editor');
                    this._editorInstance.destroy();
                } else {
                    console.error('the editor does not have a destroy method');
                }
            }

            // call parent to continue destroy process
            this.inherited(arguments);
        }

    });
});