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
 * FILE NAME: LocaleUtil.js
 * 
 * CREATED: Mar 18, 2015 5:46:06 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define({
    _map : {
        'zh' : 'zh_CN',
        'zh-tw' : 'zh_TW',
        'en' : 'en_US'
    },
    mapper : function(/* String */nls) {
        return this._map[nls] || nls;
    }
});