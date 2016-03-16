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
 * FILE NAME: Menu.js
 * 
 * CREATED: Nov 29, 2015 11:07:27 AM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/_WidgetI18nMixin',
    'app/widget/_WidgetSecurityMixin',
    'dijit/Menu',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, _WidgetSecurityMixin, Menu, declare) {
    return declare('app.widget.Menu', [
        Menu,
        _WidgetI18nMixin,
        _WidgetSecurityMixin
    ], {

        /** Override */
        addChild : function(/* dijit/_WidgetBase */widget, /* int? */insertIndex) {
            // for permission when widget is destroyed, do nothing or ignore
            if (this._destroyed || widget._destroyed)
                return;
            this.inherited(arguments);
        }

    });
});