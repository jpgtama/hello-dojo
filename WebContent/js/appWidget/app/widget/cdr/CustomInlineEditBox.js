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
 * FILE NAME: CustomInlineEditBox.js
 * 
 * CREATED: 2016年1月29日 上午10:06:51
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/InlineEditBox',
    'dojo/on',
    'dojo/aspect',
    'dojo/dom-attr',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(InlineEditBox, on, aspect, domAttr, lang, declare) {
    return declare('app.widget.cdr.CustomInlineEditBox', InlineEditBox, {

        /**
         * Override, custom to add double click to edit
         */
        postMixInProperties: function(){
            // add double click event
            aspect.before(this, 'own', function() {
                // get args
                var args = Array.prototype.slice.call(arguments);
                
                // remove first handler
                var oldHandler = args.shift();
                oldHandler.remove();
                
                // add new one
                var dblClickHandler = on(this.displayNode, 'dblclick', lang.hitch(this, "_onClick"));
                args.unshift(dblClickHandler);
                // return this array as new arguments to the original method
                return args;
            });
            
            // call inheritance method
            this.inherited(arguments);
        },
        
        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);

            // add aspect
            aspect.after(this, '_setValueAttr', function() {
                domAttr.set(this.displayNode, 'title', this.displayNode.innerHTML);
            });
        }

    });
});