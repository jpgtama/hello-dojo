define([
    "dojo/_base/declare",
    'dojo/_base/lang',
    'dojo/aspect',
    'dojo/ready',
    'dijit/registry'
], function(declare, lang, aspect, ready, registry) {

    return declare("app.widget._RadioCheckBindingMixin", [], {
    	
    	bindingObj: null,
        isRadio: true,
        _itemIndex: null,

        constructor: function(options) {
            lang.mixin(this, options);
            // console.log('_RadioCheckBindingMixin, ', this);
            var _this = this;
            aspect.after(_this, "startup", function() {
                ready(function() {
                    var value = _this.bindingObj.binding.targetModel.get(_this.bindingObj.binding.targetField);
                    if (!value) return;

                    if (!_this.isRadio) {
                        for (i in value) {
                            var ctl = registry.byId(_this.bindingObj.idPrefix + _this.itemIndex(value[i]));
                            if (ctl) ctl.set('checked', true);
                        }
                    } else {
                        var ctl = registry.byId(_this.bindingObj.idPrefix + _this.itemIndex(value));
                        if (ctl) ctl.set('checked', true);        
                    }
                });
            });
        },

        itemIndex: function(code) {
            if (!this._itemIndex) {
                this._itemIndex = {};
                var items = this.bindingObj.binding.sourceModel.get('items');
                for (i in items) {
                    this._itemIndex[items[i].code] = i;
                }
            }
            return this._itemIndex[code];
        }
        
    });
});
