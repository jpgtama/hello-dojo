define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/registry',
    'dojox/mvc/sync',
    'app/widget/_RadioCheckBindingMixin'
], function(declare, lang, registry, sync, _RadioCheckBindingMixin) {

    return declare('app.widget.RadioCheckBinding', [_RadioCheckBindingMixin], {

        constructor: function(options) {
            lang.mixin(this, options);

            var _this = this;

            sync(this.bindingObj.binding.targetModel, this.bindingObj.binding.targetField, this.bindingObj.binding.sourceModel, this.bindingObj.binding.sourceField, {
                converter: {
                    format: function(value) {
                        if (_this.isRadio) {
                            var ctl = registry.byId(_this.bindingObj.idPrefix + _this.itemIndex(_this.bindingObj.binding.targetModel.get(_this.bindingObj.binding.targetField)));
                            if (ctl) ctl.set('checked', true);
                        } else {

                        }
                        return value; // source 到 target 
                    },
                    parse: function(value) {
                        return value; // target 到 source 
                    }
                }
            });

            var items = _this.bindingObj.binding.sourceModel.get('items');
            for (i in items) {
                if (_this.isRadio) {
                    items[i].checked = (_this.bindingObj.binding.sourceModel.get(_this.bindingObj.binding.sourceField) == items[i].code);
                } else {
                    var v = _this.bindingObj.binding.sourceModel.get(_this.bindingObj.binding.sourceField) || [];
                    var index = dojo.indexOf(v, items[i].code);
                    items[i].checked = (index >= 0);
                }
            }
        },

        transform: function() {
            var _this = this;
            return {
                format: function(checked) {
                    return checked;
                },
                parse: function(checked) {
                    if (_this.isRadio) {
                        if (checked) {
                            _this.bindingObj.binding.sourceModel.set(_this.bindingObj.binding.sourceField, this.target.value);
                        }
                    } else {
                        var v = _this.bindingObj.binding.sourceModel.get(_this.bindingObj.binding.sourceField) || [];
                        var index = dojo.indexOf(v, this.target.value);
                        if (checked) {
                            if (index < 0)
                                v.push(this.target.value);
                        } else {
                            if (index >= 0) {
                                v.splice(index, 1);
                            }
                        }
                        _this.bindingObj.binding.sourceModel.set(_this.bindingObj.binding.sourceField, v);
                    }
                    return checked;
                }
            };
        }

    });
});
