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
 * FILE NAME: TimePicker.js
 * 
 * CREATED: 2016年6月14日 上午10:59:39
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_TimePicker',
    'dojo/_base/declare'
], function(_TimePicker, declare) {
    return declare('app.widget.smart.date.TimePicker', [
        _TimePicker
    ], {

        /**
         * override
         */
        clickableIncrement : 'T00:30:00'

    });
});