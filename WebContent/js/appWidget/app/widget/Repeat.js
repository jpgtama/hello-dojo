define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/registry',
    'dojox/mvc/sync',
    'dojox/mvc/at',
    'dojox/mvc/Repeat',
    'app/widget/_RadioCheckBindingMixin'
], function(declare, lang, registry, sync, at, Repeat, _RadioCheckBindingMixin) {

    return declare('app.widget.Repeat', [Repeat, _RadioCheckBindingMixin], {

        constructor: function(options) {
            lang.mixin(this, options);
            this.children = at(this.bindingObj.binding.sourceModel, 'items');
        }

    });
});
