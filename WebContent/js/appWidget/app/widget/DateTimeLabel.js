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
 * FILE NAME: DateTimeLabel.js
 * 
 * CREATED: Nov 9, 2015 10:38:05 AM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/ResourceUtil',
    'app/widget/Label',
    'app/widget/_WidgetSecurityMixin',
    'dojox/mvc/Output',
    'dojo/date/locale',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/_base/declare'
], function(i18n, Label, _WidgetSecurityMixin, Output, locale, domClass, domStyle, domAttr, domConstruct, declare) {

    /**
     * http://dojotoolkit.org/reference-guide/1.10/dojo/date/locale/format.html#dojo-date-locale-format
     */
    function format(date, fmt) {
        return locale.format(date, {
            selector : 'date',
            datePattern : fmt
        });
    }

    return declare('app.widget.DateTimeLabel', [
        Label,
        _WidgetSecurityMixin
    ], {
        /**
         * use original dojox.mvc.Output._output without i18n
         */
        original : true,

        /**
         * Date Pattern
         */
        pattern : 'yyyy/MM/dd',

        /**
         * Override
         */
        _output : function() {
            // if (!this.original) {
            // this.value = i18n.getText(this.value);
            // }
            if ((this.value instanceof Date) || (typeof this.value == 'date'))
                var formatedValue = format(this.value, this.pattern);

            var outputNode = this.srcNodeRef || this.domNode;
            if (this.displayWidth == null) {
                outputNode.innerHTML = formatedValue || formatedValue == 0 ? formatedValue : this._exprRepl(this.templateString.trim());
            } else {
                // width: 20; height: 15px; border: 0px; overflow:
                // hidden;
                // text-overflow: ellipsis; white-space: nowrap;

                // TODO clean outputNode child, because this method was
                // called 2
                // times
                outputNode.innerHTML = '';

                var node = domConstruct.create('div', null, outputNode);
                domStyle.set(node, 'width', isNaN(this.displayWidth) ? this.displayWidth : this.displayWidth + "px");
                domStyle.set(node, 'border', '0px');
                domStyle.set(node, 'overflow', 'hidden');
                domStyle.set(node, 'text-overflow', 'ellipsis');
                domStyle.set(node, 'white-space', 'nowrap');
                node.innerHTML = formatedValue;
                domAttr.set(outputNode, 'title', formatedValue);
            }
        }
    });

});
