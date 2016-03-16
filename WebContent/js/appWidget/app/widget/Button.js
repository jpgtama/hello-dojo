define([
    'app/widget/_WidgetI18nMixin',
    'app/widget/_WidgetSecurityMixin',
    'dijit/form/Button',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, _WidgetSecurityMixin, Button, declare) {
    return declare('app.widget.Button', [
        Button,
        _WidgetI18nMixin,
        _WidgetSecurityMixin
    ], {

    });
});
