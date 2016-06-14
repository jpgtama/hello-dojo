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
 * FILE NAME: ConfirmDialog.js
 * 
 * CREATED: 2016年5月26日 下午2:45:19
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/Dialog',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/confirm-dialog.html'
], function(Dialog, lang, declare, template) {
    return declare('app.widget.confirmDialog.ConfirmDialog', Dialog, {

    });
});