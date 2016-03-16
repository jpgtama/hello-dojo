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
 * FILE NAME: CustomTitlePane.js
 * 
 * CREATED: 2016年2月23日 下午1:33:07
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/dom-attr',
    'dojo/dom-style',
    'dijit/TitlePane',
    'dojo/_base/declare'
], function(domAttr, domStyle, TitlePane, declare) {
    return declare('app.widget.cdr.CustomTitlePane', [
        TitlePane
    ], {

        /**
         * title width
         */
        titleWidth : null,

        /**
         * Override
         */
        startup : function() {
            var titleNode = this.titleNode;

            // set title width
            if (this.titleWidth) {
                domStyle.set(titleNode, 'width', this.titleWidth + 'px');
                domStyle.set(titleNode, 'display', 'inline-block');
                domStyle.set(titleNode, 'overflow', 'hidden');
                domStyle.set(titleNode, 'text-overflow', 'ellipsis');
                domStyle.set(titleNode, 'white-space', 'nowrap');
                domAttr.set(titleNode, 'title', titleNode.innerHTML);
            }

            // call inheritance
            this.inherited(arguments);
        }

    });
});