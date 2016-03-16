define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dijit/_Widget',
    'app/util/ResourceUtil'
], function(declare, lang, string, _Widget, i18n) {

    var MessageBox = declare('app.widget.MessageBox', [
        _Widget
    ], {

        TYPE : {
            INFO : 'info',
            WARN : 'warn',
            ERROR : 'error'
        },

        size : {
            minHeight : '100px',
            minWidth : '250px',
            maxHeight : '500px',
            maxWidth : '300px'
        },

        constructor : function(options) {
            lang.mixin(this, options);
        },

        show : function(/* String | Array */message, /* Object */options) {
            var _this = this;
            if (message instanceof Array) {
                if (message.length != 2) {
                    throw new Error('There must have two elements in the message, but currently is ' + message.length);
                }
                var oldMsg = message[0];
                var param = message[1];
                message = i18n.getText(oldMsg, param);
                if (message == oldMsg) { // means the message cannot be found
                    // in the resources
                    message = string.substitute(oldMsg, param);
                }
            } else {
                message = i18n.getText(message);
            }

            var dialogOptions = (options && options.dialogOptions) || {};
            var type = (options && options.type) ? options.type : this.TYPE.INFO;

            var _dialog;
            if (options && options.widget) {
                require([
                    'app/widget/Dialog'
                ], function(Dialog) {
                    var opts = lang.mixin({
                        executeScripts : true,
                        showTitle : true,
                        showTitleBar : true,
                        title : message
                    }, dialogOptions);
                    var dialog = new Dialog(opts);
                    options.widget.placeAt(dialog.contentPanel);
                    dialog.show();

                    if (options && options.autohide) {
                        setTimeout(function() {
                            dialog.hide();
                        }, options.autohide);
                    }

                    _dialog = dialog;
                });
                return _dialog;
            }

            var type = (options && options.type) ? options.type : this.TYPE.INFO;
            require([
                'app/widget/Dialog',
                'app/widget/_MessageBoxContent'
            ], function(Dialog, _MessageBoxContent) {
                var opts = lang.mixin({
                    executeScripts : true,
                    showTitle : true,
                    showTitleBar : true,
                    title : i18n.getText('_messagebox_type_' + type + '_')
                }, _this.size, dialogOptions);
                var dialog = new Dialog(opts);

                new _MessageBoxContent({
                    type : type,
                    message : message
                }, dialog.contentPanel);
                dialog.show();

                if (options && options.autohide) {
                    setTimeout(function() {
                        dialog.hide();
                    }, options.autohide);
                }

                _dialog = dialog;
            });
            return _dialog;
        }

    });

    return new MessageBox();
});