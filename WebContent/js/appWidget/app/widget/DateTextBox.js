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
 * FILE NAME: DateTextBox.js
 * 
 * CREATED: Nov 6, 2015 11:07:49 AM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/_WidgetSecurityMixin',
    'dijit/form/DateTextBox',
    'dojo/_base/declare'
], function(_WidgetSecurityMixin, DateTextBox, declare) {
    return declare('app.widget.DateTextBox', [
        DateTextBox,
        _WidgetSecurityMixin
    ], {
        /**
         * Override
         */
        _setValueAttr : function(value, /* Boolean? */priorityChange, /* String? */formattedValue) {
            if (value != null && (typeof value) != 'date' && !(this.value instanceof Date)) {
                try {
                    var dateValue = new Date(value);
                    if (dateValue instanceof Date)
                        arguments[0] = dateValue;
                } catch (e) {
                    console.error(e)
                }
            }

            this.inherited(arguments);
        }
    });
});