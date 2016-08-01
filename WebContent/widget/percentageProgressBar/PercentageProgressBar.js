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
 * FILE NAME: PercentageProgressBar.js
 * 
 * CREATED: 2016年7月26日 下午1:47:17
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/ProgressBar',
    'dojo/query',
    'dojo/dom-style',
    'dojo/_base/declare',
    'xstyle/css!./PercentageProgressBar.css'
], function(ProgressBar, query, domStyle, declare) {
    return declare('', [
        ProgressBar
    ], {

        /**
         * class name
         */
        baseClass: 'percentageProgressBar'
    });
});