define([
    'dojo/_base/declare',
    'dojox/data/QueryReadStore'
], function(declare, QueryReadStore) {
    return declare('app.lang.store._BaseQueryReadStore', [QueryReadStore], {

        _fetchItems: function(request, fetchHandler, errorHandler) {

            var serverQuery = request.serverQuery || request.query || {};
            //Need to add start and count
            if (!this.doClientPaging) {
                serverQuery.start = request.start || 0;
                // Count might not be sent if not given.
                if (request.count) {
                    serverQuery.count = request.count;
                }
            }
            if (!this.doClientSorting && request.sort) {
                var sortInfo = [];
                dojo.forEach(request.sort, function(sort) {
                    if (sort && sort.attribute) {
                        sortInfo.push((sort.descending ? "-" : "") + sort.attribute);
                    }
                });
                serverQuery.sort = sortInfo.join(',');
            }
            // Compare the last query and the current query by simply json-encoding them,
            // so we dont have to do any deep object compare ... is there some dojo.areObjectsEqual()???
            if (this.doClientPaging && this._lastServerQuery !== null &&
                dojo.toJson(serverQuery) == dojo.toJson(this._lastServerQuery)
            ) {
                this._numRows = (this._numRows === -1) ? this._items.length : this._numRows;
                fetchHandler(this._items, request, this._numRows);
            } else {
                var xhrFunc = this.requestMethod.toLowerCase() == "post" ? dojo.xhrPost : dojo.xhrGet;
                // var xhrHandler = xhrFunc({url:this.url, handleAs:"json-comment-optional", content:serverQuery, failOk: true});
                var xhrHandler = xhrFunc(this.getXhrHandler(serverQuery));

                request.abort = function() {
                    xhrHandler.cancel();
                };
                xhrHandler.addCallback(dojo.hitch(this, function(data) {
                    this._xhrFetchHandler(data, request, fetchHandler, errorHandler);
                }));
                xhrHandler.addErrback(function(error) {
                    errorHandler(error, request);
                });
                // Generate the hash using the time in milliseconds and a randon number.
                // Since Math.randon() returns something like: 0.23453463, we just remove the "0."
                // probably just for esthetic reasons :-).
                this.lastRequestHash = new Date().getTime() + "-" + String(Math.random()).substring(2);
                this._lastServerQuery = dojo.mixin({}, serverQuery);
            }
        },

        getXhrHandler: function(/*Object*/ serverQuery) {
            //need to be implemented by subclass
        }
    });
});
