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
 * FILE NAME: PlatformInfo.js
 * 
 * CREATED: Apr 8, 2015 5:10:50 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/config/appConfig',
    'dojo/request',
    'dojo/string',
], function(appConfig, request, string) {
    var buildNo;
    if (!buildNo) {
        request(appConfig.buildNo, {
            method : 'POST',
            handleAs : 'json',
            sync : true
        }).then(function(data) {
            // do something with handled data
            buildNo = string.substitute(data, {
                timestamp : 'To Be Build'
            })
        });
    }
    return {
        buildNo : buildNo
    };
});