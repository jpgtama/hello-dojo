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
 * FILE NAME: CardList.js
 * 
 * CREATED: 2016年8月17日 上午10:00:24
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dgrid/List',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-construct',
    'dojo/_base/declare',
    'dojo/text!./card-list.html',
    'xstyle/css!./card-list.css'
], function(List, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domC, declare, template) {
    return declare('', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        templateString : template,

        baseClass : 'card-list',

        /**
         * card count per row
         */
        cardCountPerRow : 4,

        /**
         * card widget type
         */
        card : null,

        arrayOfData : null,

        /**
         * Override
         */
        constructor : function(options) {
            // valid options
            // if(!this.card){
            // throw 'card is not defined.';
            // }
        },

        /**
         * Override
         */
        postCreate : function() {
            // valid
            if (!this.card) {
                throw 'card is not defined.';
            }

            var Card = this.card;

            var list = new List({
                renderRow : function(item) {
                    var wrapper = domC.toDom('<div class="row-wrapper"><div>');

                    var sd = new Card({
                        data : item
                    });

                    wrapper.appendChild(sd.domNode);

                    return wrapper;
                }
            }, this.listNode);

            list.renderArray(this.arrayOfData);
        }

    });
});