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
 * FILE NAME: TabTitlePane.js
 * 
 * CREATED: 2015年6月11日 下午5:09:27
 * 
 * ORIGINAL AUTHOR(S): 310189952
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/ResourceUtil',
    'dijit/layout/ContentPane',
    'dojo/_base/declare'
], function(i18n, ContentPane, declare) {
    return declare('app.widget.TabTitlePane', [
        ContentPane
    ], {

        /**
         * Override
         */
        _setTitleAttr : function(/* String */title) {
            this._set('title', i18n.getText(title));
        }
    });
});
