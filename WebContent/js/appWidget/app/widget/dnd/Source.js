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
 * FILE NAME: Source.js
 * 
 * CREATED: Nov 27, 2015 4:42:51 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/config/profileConfig',
    'app/widget/_WidgetI18nMixin',
    'app/widget/_WidgetSecurityMixin',
    'dojo/dnd/Source',
    'dojo/dom-class',
    'dojo/_base/declare'
], function(profileConfig, _WidgetI18nMixin, _WidgetSecurityMixin, Source, domClass, declare) {
    return declare('app/widget/dnd/Source', [
        Source,
        _WidgetI18nMixin,
        _WidgetSecurityMixin
    ], {

        /** Override* */
        constructor : function() {
            var hasPermission = profileConfig.hasPermission(this.permission);

            if (!hasPermission) {
                this.isSource = false;
                if (this.node)
                    domClass.remove(this.node, 'dojoDndSource');
            }

            this.inherited(arguments);
        }

    });
});