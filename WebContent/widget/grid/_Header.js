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
    'dojo/sniff',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(Textarea, InlineEditBox, _WidgetBase, _TemplatedMixin, has, lang, declare) {
    return declare([
        _WidgetBase,
        _TemplatedMixin
    ], {

        // This class is usded to render dgrid header and add InlineEditBox as
        // header so users can edit title and the changes are written into
        // column
        // definition object.

        /**
         * template string
         */
        templateString : '<div>  <div data-dojo-attach-point="contentNode"></div>    </div>',

        /**
         * Override
         */
        postCreate : function() {
            // call parent
            this.inherited(arguments);

            // set header content
            if (this.column) {
                this.contentNode.innerHTML = this.column.label;
            }

            // add editor ability
            var itb = new InlineEditBox({
                autoSave : true,
                onChange : lang.hitch(this, function(value) {
                    // set column label to new value
                    this.column.label = value;
                }),
                // copied this from InlineEditBox and changed the indication text to 'Please Input Title'
                noValueIndicator : has("ie") <= 6 ? "<span style='font-family: wingdings; text-decoration: underline;'>Please Input Title</span>"
                        : "<span style='text-decoration: underline;'>Please Input Title</span>",
            }, this.contentNode).startup();

        }

    });
});