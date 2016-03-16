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
 * FILE NAME: appConfig.js
 * 
 * CREATED: Feb 1, 2015 10:34:43 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/lang',
    'jquery'
], function(lang) {

    var config = {
        dateTimePattern : 'yyyy-MM-dd HH:mm:ss',
        datePattern : 'yyyy/MM/dd',
        timePattern : 'HH:mm:ss',

        errorpage : 'error.html',

        login : {
            query : '/iscv/security/login'
        },

        dict : {
            url : 'service/enum/${locale}/${module}'
        // url : 'app/mock/data/enum/${locale}/${module}.json'
        },

        security : {
            // url : 'http://localhost/iscv/security/${permission}'
            url : 'app/mock/data/security/${permission}.json'
        },

        i18n : {
            url : 'service/i18n/${locale}'
        // url : 'app/mock/data/i18n/${locale}.json'
        },

        aspect : {
            loadData : {
                clazz : /^app.service.*.*Service$/,
                method : /.*/,
                advice : null,
                excludeClazz : []
            }
        },

        buildNo : 'service/application/build'

    };

    // loading all configuration from modules
    // lang.mixin(config, configUtil.appConfig());
//    config = $.extend(true, config, configUtil.appConfig());
//
//    // Open debug and mock model
//    if (dojoConfig.isDebug) {
//        var handle = require.on('error', function(error) {
//            // alert('Finally error')
//            console.error('Fianlly error: ' + error);
//        });
//        require([
//            'app/mock/mockConfig'
//        ], function(mockConfig) {
//            // lang.mixin(config, mockConfig);
//            config = $.extend(true, config, mockConfig);
//        });
//    }

    return config;
});
