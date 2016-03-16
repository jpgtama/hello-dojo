define([
    'dojo/promise/Promise',
    'dojo/router'
], function(Promise, router) {
    return dojo.declare('app.lang.Promise', [Promise], {

    	promise: null,
    	errCallback: function(err) {
    		console.log('Promise error: ', err);
    		var status = err.response.status;
            router.go('/err');
    		//throw err;
    	},

        constructor: function(/*Promise*/ promise) {
        	this.promise = promise;
        },

        then: function(callback, errback, progback) {
        	if (!errback) errback = this.errCallback;
        	return this.promise.then(callback, errback, progback);
        }
    });
});
