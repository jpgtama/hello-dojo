define([
    'dojox/data/QueryReadStore',
    'app/lang/store/JsonQueryReadStore',
    'app/lang/store/StringQueryReadStore',
    'dojo/data/ItemFileReadStore'
], function(QueryReadStore, JsonQueryReadStore, StringQueryReadStore, ItemFileReadStore) {
    return dojo.declare('app.service.QueryStoreService', [], {

        getQueryStore : function(/* Object */options) {
            if (options.url == undefined || options.url == null) {
                console.error("The Query URL is undefined!");
                console.log(options);
            }
            if (options.isJson) {
                return new JsonQueryReadStore(options);
            } else {
                return new StringQueryReadStore(options);
            }
            // return new QueryReadStore(options);
        },

        getItemFileReadStore : function( /* Object */options) {
            return new ItemFileReadStore(options);
        }

    });
});
