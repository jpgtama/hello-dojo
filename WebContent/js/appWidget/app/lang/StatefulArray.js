define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojox/mvc/StatefulArray'
], function(declare, lang, StatefulArray) {

    var SfArray = function(/*Array*/ items) {
        var array = new StatefulArray(items);
        var ctor = SfArray;
        array.constructor = ctor;

        return lang.mixin(array, {
            pushItems: function(/*Array*/ arrItems) {
                if (!arrItems) return this.get("length");
                for (var i in arrItems) {
                    this.pushItem(arrItems[i], i == (arrItems.length - 1));
                }
                return this.get("length");
            },

            pushItem: function(item, isLast){
                this.spliceInList.apply(this, [this.get("length"), 0, isLast, item]);
                return this.get("length");
            },

            /**
            * just used for pushing items in the list and will be invoked by pushItem
            */
            spliceInList: function(/*Number*/ idx, /*Number*/ n, /*Boolean*/ isLast){
                // summary:
                //      Removes and then adds some elements to an array.
                //      watchElements() notification is done for the removed/added elements.
                //      watch() notification is done for the length.
                //      Returns an instance of StatefulArray instead of the native array.
                // idx: Number
                //      The index where removal/addition should be done.
                // n: Number
                //      How many elements to be removed at idx.
                // varargs: Anything[]
                //      The elements to be added to idx.
                // returns: dojox/mvc/StatefulArray
                //      The removed elements.

                var l = this.get("length");

                idx += idx < 0 ? l : 0;

                var p = Math.min(idx, l),
                 removals = this.slice(idx, idx + n),
                 adds = lang._toArray(arguments).slice(3);

                // Do the modification in a native manner except for setting additions
                [].splice.apply(this, [idx, n].concat(new Array(adds.length)));

                // Set additions in a stateful manner
                for(var i = 0; i < adds.length; i++){
                    this[p + i] = adds[i];
                }

                if (isLast) {
                    // Notify change of elements.
                    if(this._watchElementCallbacks){
                        this._watchElementCallbacks(idx, removals, adds);
                    }

                    // Notify change of length.
                    // Not calling the setter for "length" though, given removal/addition of array automatically changes the length.
                    if(this._watchCallbacks){
                        this._watchCallbacks("length", l, l - removals.length + adds.length);
                    }
                }
                
                return removals; // dojox/mvc/StatefulArray
            }
        });
    }
        
    SfArray._meta = {bases: [StatefulArray]}; // For isInstanceOf()
    return lang.setObject('app.lang.StatefulArray', SfArray);
        
});
