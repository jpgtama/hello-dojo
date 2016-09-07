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
 * FILE NAME: BaseDate.js
 * 
 * CREATED: 2016年6月8日 上午11:07:03
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/form/DateTextBox',
    'app/widget/smart/date/Calendar',
    'dojo/date',
    'dojo/json',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(DateTextBox, Calendar, dojoDate, JSON, on, lang, declare) {
    return declare('app.widget.smart.date.BaseDate', [
        DateTextBox,
    ], {

        /**
         * popup Calendar
         */
        popupClass : Calendar,

        /**
         * Override
         */
        constructor : function(options) {
            lang.mixin(this, options);
        },

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);
        }

    });
});