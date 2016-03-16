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
 * FILE NAME: CustomQueryService.js
 * 
 * CREATED: 2015年8月20日 下午1:09:31
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/service/_BaseService',
    'dojo/_base/declare'
], function(_BaseService, declare) {
    return declare('app.service.CustomQueryService', [
        _BaseService
    ], {

        /**
         * 
         */
        searchUrl : '',
        
        /**
         * 
         */
        resourceUrl : 'service/customquery/${id}',

        /**
         * Override
         */
        constructor : function() {

        }

    });
});