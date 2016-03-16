define([
    'app/widget/_WidgetI18nMixin',
    'app/widget/_WidgetSecurityMixin',
    'dijit/form/SimpleTextarea',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, _WidgetSecurityMixin, SimpleTextarea, declare) {
    return declare('app.widget.SimpleTextarea', [
        SimpleTextarea,
        _WidgetSecurityMixin,
        _WidgetI18nMixin
    ], {
        filter : function(/* String */value) {
            // convert the value to string if it's not a string
            if (value && typeof value != 'string') {
                value += '';
            }
            return this.inherited(arguments);
        }
    });
});
