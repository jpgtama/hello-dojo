define([
    'dojo/_base/declare',
    'dojo/Stateful',
    'app/lang/StatefulArray',
    'app/util/JsonUtil',
    'dojo/when'
], function(declare, Stateful, StatefulArray, JsonUtil, when) {

    function isEqual(a, b) {
        // summary:
        // Function that determines whether two values are identical,
        // taking into account that NaN is not normally equal to itself
        // in JS.

        return a === b || (/* a is NaN */a !== a && /* b is NaN */b !== b);
    }

    return declare('app.lang.Stateful', [
        Stateful
    ], {

        constructor : function(/* Object */obj) {
            this._iterateArrayItems(obj);
        },

        _iterateArrayItems : function(/* Object */obj) {
            var op = Object.prototype, opts = op.toString;
            // iterate the obj and apply the StatefulArray to all the Array
            // items
            for ( var key in obj) {
                var v = obj[key];
                // console.log(key, opts.call(v));
                if (opts.call(v) == '[object Array]') {
                    obj[key] = new StatefulArray(v);
                } else if (opts.call(v) == '[object Object]') {
                    this._iterateArrayItems(v);
                }
            }
        },

        _get : function(name, names) {
            return typeof this[names.g] === 'function' ? this[names.g]() : JsonUtil.getValue(this, name);
        },

        set : function(/* String */name, /* Object */value) {
            // If an multi-object is used, iterate through object
            if (typeof name === 'object') {
                for ( var x in name) {
                    if (name.hasOwnProperty(x) && x != '_watchCallbacks') {
                        // Modified By H.W Start
                        if (typeof name[x] === 'object' && !(name[x] instanceof Array)) {
                            // x will be parentObject name
                            if (value)
                                this.set(name[x], value + '.' + x);
                            else
                                this.set(name[x], x);
                        }
                        // When value is Object also need set and has duplicate
                        // binding
                        if (value)
                            this.set(value + '.' + x, name[x]);
                        else
                            this.set(x, name[x]);
                        // Modified By H.W End
                    }
                }
                return this;
            }

            var names = this._getAttrNames(name), oldValue = this._get(name, names), setter = this[names.s], result;
            if (typeof setter === 'function') {
                // use the explicit setter
                result = setter.apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                // no setter so set attribute directly
                // Modified By H.W Start
                JsonUtil.setValue(this, name, value);
                // Modified By H.W End
            }
            // Modified By H.W if (this._watchCallbacks) {
            if (!isEqual(oldValue, value) && this._watchCallbacks) {
                var self = this;
                // If setter returned a promise, wait for it to complete,
                // otherwise call watches immediately
                when(result, function() {
                    self._watchCallbacks(name, oldValue, value);
                });
            }
            return this; // dojo/Stateful
        }

    });
});
