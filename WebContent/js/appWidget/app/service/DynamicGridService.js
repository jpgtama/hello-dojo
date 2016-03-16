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
 * FILE NAME: TimeslotResourceService.js
 * 
 * CREATED: 2015年4月7日 下午3:05:56
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/config/appConfig',
    'app/service/_BaseService',
    'dojo/request/xhr',
    'dojo/string',
    'dojo/json',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(appConfig, BaseService, xhr, string, JSON, lang, declare) {
    return declare("app.service.DynamicGridService", [
        BaseService
    ], {

        getMataConfig : function(gridName) {
            // get config data
            var configDef = xhr(lang.replace('service/resources/dynamicGrid/{0}.json', [
                gridName
            ]), {
                sync : true,
                handleAs : 'json'
            });

            return configDef;
        },

        loadConfigFunction : function(gridName) {
            xhr(lang.replace('service/resources/dynamicGrid/{0}.js', [
                gridName
            ]), {
                sync : true,
                handleAs : 'javascript'
            }).then(function(data) {
                // Do nothing
            });
        }
    });
});