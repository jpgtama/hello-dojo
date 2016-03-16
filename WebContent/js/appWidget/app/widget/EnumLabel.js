define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/topic',
    'dojo/regexp',
    'dojox/mvc/Output',
    'app/util/ResourceUtil',
    'app/util/EnumUtil',
    'app/lang/Stateful'
], function(declare, lang, dom, topic, regexp, Output, i18n, EnumUtil, Stateful) {

    return declare('app.widget.EnumLabel', [Output], {

        code: '',
        module: '',

        constructor: function( /*Object*/ options) {
            lang.mixin(this, options);

            this.watchChange('code', 'module');
        },

        postCreate : function() {
            this.showValue();            
        },

        watchChange: function(/*Array*/) {
            var args = arguments;
            if (!args) return;

            var _this = this;
            for (var i in args) {
                _this.watch(args[i], function(name, oldValue, value) {
                    if (oldValue == value) return;

                    clearTimeout(_this.timeoutHandle);
                    _this.timeoutHandle = setTimeout(_this.showValue(), 500);
                });
            }
        },

        showValue: function() {
            if (!this.code || !this.module) return;

            var _this = this;
            var topicName = this.getTopicName();
            var handle = topic.subscribe(topicName, function(msg) {
                _this.value = msg.value;
                _this._output();
                handle.remove();
            });

            var store = EnumUtil.getStore(this.module);
            store.fetch({
                onItem : function(item) {
                    if (store.getIdentity(item) == _this.code) {
                        topic.publish(topicName, {
                            value : store.getLabel(item)
                        });
                        return;
                    }
                }
            });
        },

        getTopicName : function() {
            return '/enum/' + this.module + '/' + this.code + '/' + Math.random();
        }
    });
});
