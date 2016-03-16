define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'app/util/ResourceUtil',
    'app/lang/topic',
    'app/lang/SubscribeManager'
], function(declare, lang, string, i18n, topic, SubscribeManager) {

    return declare('app.lang.SubscribeMixin', [], {

        constructor: function(options) {
            lang.mixin(this, options);

            this.classId = Math.random();
            this.cls = this.declaredClass || (this.prototype && this.prototype.declaredClass) || '';
            // console.log('In the SubscribeMixin: ', this.cls, this);

            //clear all the subcribes for current object with different token
            if (!this.cls) {
                console.error('ERROR: Can not get the class name of current instance, please correct it at first.')
                return;
            }
            SubscribeManager.clearSubscribe(this.cls, this.classId, true);
        },

        addSubscribe: function(/*String*/ topicName, /*Function*/ callback) {
            SubscribeManager.addSubscribe(topicName, this.cls, this.classId, callback);
        },

        destroy: function() {
            this.inherited(arguments);
            SubscribeManager.clearSubscribe(this.cls, this.classId);
        },

        //this is a helper method to print all the subscribes into console
        //and it mostly should be used for debugging
        _printAllSubscribes: function() {
            console.log('Subscribes: ', SubscribeManager.subscribeHandlers);
        }

    });

});