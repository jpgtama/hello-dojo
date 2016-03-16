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
 * FILE NAME: MenuItem.js
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
    'dijit/MenuItem',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, _WidgetSecurityMixin, MenuItem, declare) {
    return declare('app.widget.MenuItem', [
        MenuItem,
        _WidgetI18nMixin,
        _WidgetSecurityMixin
    ], {

    });
});
