define([
    'app/lang/topic',
    'dojox/widget/DialogSimple',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/aspect',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/fx/easing',
    'dojo/_base/lang',
    'dojo/_base/declare',
], function(topic, DialogSimple, _TemplatedMixin, _WidgetsInTemplateMixin, aspect, domConstruct, domStyle, easing, lang, declare) {

    return declare('app.widget.Dialog', [
        DialogSimple,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        showTitleBar : true,
        contentPanel : null,
        closeTopic : 'app/dialog/close',
        easing : easing.backOut,
        /**
         * the value to control if the dialog will be closed automatically. the
         * unit is second
         */
        autoCloseDuration : 0,

        constructor : function(options) {
            lang.mixin(this, options);
            if (!options.closeTopic) {
                this.closeTopic += '/' + Math.random();
            }

            var _this = this;
            this.own(topic.subscribe(this.closeTopic, function(msg) {
                _this.onHide();
            }));

            // Interceptor For Session Timeout
            this.own(topic.subscribe('/error/9101', function() {
                _this.onHide();
            }));

            // In order to destroy all dialogs
            this.own(topic.subscribe('/destroy/dialog/all', function() {
                _this.onHide();
            }));

            if (_this.autoCloseDuration > 0) {
                aspect.after(_this, 'startup', lang.hitch(_this, function(dialog) {
                    setTimeout(function() {
                        dialog.destroyRecursive();
                        dialog.destroy();
                    }, _this.autoCloseDuration * 1000);
                }, _this));
            }
        },

        postCreate : function() {
            this.inherited(arguments);
            this.contentPanel = domConstruct.create('div', {}, this.containerNode);
            domStyle.set(this.domNode, {
                width : this.width || 'auto',
                height : this.height || 'auto',
                minWidth : this.minWidth || 'auto',
                minHeight : this.minHeight || 'auto',
                maxWidth : this.maxWidth || 'auto',
                maxHeight : this.maxHeight || 'auto'
            });

            if (this.showTitleBar)
                return;

            domStyle.set(this.titleBar, 'display', 'none');
        },

        onHide : function() {
            this.destroyRecursive();
            this.destroy();
        }

    });

});
