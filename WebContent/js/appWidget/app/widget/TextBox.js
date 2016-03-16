define([
    'app/widget/_WidgetI18nMixin',
    'app/widget/_WidgetSecurityMixin',
    'dijit/form/TextBox',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, _WidgetSecurityMixin, TextBox, declare) {
    return declare('app.widget.TextBox', [
        TextBox,
        _WidgetSecurityMixin,
        _WidgetI18nMixin
    ], {

    });
});
