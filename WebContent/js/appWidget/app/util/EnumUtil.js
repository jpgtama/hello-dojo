define([
    'dojo/request',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/data/ItemFileReadStore',
    'dojo/_base/array',
    'app/config/appConfig',
    'app/util/LocaleUtil'
], function(Request, string, lang, ItemStore, array, appConfig, localeUtil) {
    var items = {};
    var stores = {};
    return {
        getItem : function(/* String */module) {
            if (items[module])
                return items[module];

            var url = string.substitute(appConfig.dict.url, {
                module : module,
                locale : localeUtil.mapper(dojoConfig.locale)
            });
            dojo.xhrGet({
                url : url,
                handleAs : 'json',
                sync : true,
                handle : function(rep) {
                    items[module] = rep;
                }
            });
            return items[module];
        },

        getStore : function(/* String */module) {
            if (stores[module])
                return stores[module];

            var url = string.substitute(appConfig.dict.url, {
                module : module,
                locale : localeUtil.mapper(dojoConfig.locale)
            });

            var store = new ItemStore({
                // data : this.getItem(module)
                url : url
            });
            stores[module] = store;
            return store;
        },

        getValue : function(/* String */module, /* String */code) {
            // get result
            var result = this.getItem(module);
            
            // get items
            var items = result.items;
            
            // find out the value and return
            for (i in items) {
                if (items[i][result.identifier] == code)
                    return items[i][result.label];
            }

            // return empty if not found 
            return "";
        }
    }
});
