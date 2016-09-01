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
 * FILE NAME: CheckBox.js
 * 
 * CREATED: 2016年8月31日 下午4:13:26
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/form/CheckBox',
    'dojo/_base/declare'
], function(CheckBox, declare) {
    return declare('', [
        CheckBox
    ], {

        _onClick : function(/* Event */e) {
            e.stopPropagation();

            this.inherited(arguments);
        }

    });
});