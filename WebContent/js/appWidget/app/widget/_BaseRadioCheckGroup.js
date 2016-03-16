define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/registry',
    'dojox/mvc/sync',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'app/widget/_RadioCheckBindingMixin'
], function(declare, lang, registry, sync, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _RadioCheckBindingMixin) {

    return declare('app.widget._BaseRadioCheckGroup', [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _RadioCheckBindingMixin], {

        binding: null,

        constructor: function(options) {
            lang.mixin(this, options);
            this.bindingObj = this.binding.bindingObj;
            // console.log('RadioGroup ..................', this.binding.transform);
        }

    });
});
