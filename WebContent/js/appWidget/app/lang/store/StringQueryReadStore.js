define([
    'dojo/_base/declare',
    './_BaseQueryReadStore'
], function(declare, _BaseQueryReadStore) {
    return declare('app.lang.store.StringQueryReadStore', [_BaseQueryReadStore], {

        getXhrHandler: function(/*Object*/ serverQuery) {
            return {
                url: this.url,
                handleAs: "json-comment-optional",
                content: {search: dojo.toJson(serverQuery)},
                failOk: true
            };
        }
    });
});
