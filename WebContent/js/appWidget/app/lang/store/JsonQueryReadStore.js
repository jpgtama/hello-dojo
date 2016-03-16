define([
    'dojo/_base/declare',
    './_BaseQueryReadStore'
], function(declare, _BaseQueryReadStore) {
    return declare('app.lang.store.JsonQueryReadStore', [_BaseQueryReadStore], {

        getXhrHandler: function(/*Object*/ serverQuery) {
            return {
                url: this.url,
                handleAs: "json",
                headers: {
                    'Content-Type': 'application/json'
                },
                postData: dojo.toJson(serverQuery),
                failOk: true
            };
        }
    });
});
