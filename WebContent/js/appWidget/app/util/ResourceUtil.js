define([
    // 'dojo/i18n!app/resource/nls/patient',
    'dojo/request',
    'dojo/string',
    'app/config/appConfig',
    'app/util/LocaleUtil'
], function(request, string, appConfig, localeUtil) {

    var i18n = {};
    
    
    return {
        getText : function(key, params) {
            var locale = localeUtil.mapper(dojoConfig.locale) || 'zh';
            
            
            if (!i18n[locale]) {
                
                var url = string.substitute(appConfig.i18n.url, {
                    locale : locale
                });
                request.get(url, {
//                    url : url,
                    handleAs : 'json',
                    sync : true,
                    handle : function(data) {
                        i18n[locale] = data.items;
                    }
                });
            }

            if (i18n[locale]) {
                var str = i18n[locale][key];
                if (!str) {
                    console.warn('Can not find the key [' + key + '] in the resource');
                    return key;
                }
                if (params)
                    return string.substitute(str, params);
                else
                    return str;
            }

            return key;
        }
    };
});
