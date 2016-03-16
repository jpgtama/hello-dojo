define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojox/mvc/WidgetList',
    'dojox/mvc/_InlineTemplateMixin',
    'app/widget/_RadioCheckBindingMixin'
], function(declare, lang, string, WidgetList, _InlineTemplateMixin, _RadioCheckBindingMixin) {

    return declare('app.widget._BaseRadioCheckWidgetList', [WidgetList, _InlineTemplateMixin, _RadioCheckBindingMixin], {

        idPrefix: '',
        bindingTransform: null,

        constructor: function(options) {
            lang.mixin(this, options);
        }
    });
});
