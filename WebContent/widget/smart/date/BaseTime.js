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
 * FILE NAME: BaseTime.js
 * 
 * CREATED: 2016年6月8日 下午1:57:32
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/smart/date/TimePicker',
    'dijit/form/TimeTextBox',
    'dojo/_base/declare'
], function(TimePicker, TimeTextBox, declare) {
    return declare('app.widget.smart.date.BaseTime', [
        TimeTextBox
    ], {

        /**
         * popupClass
         */
        popupClass : TimePicker

    });
});