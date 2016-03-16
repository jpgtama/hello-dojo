define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/lang/topic',
    'dojox/mvc/Templated',
    'dojo/text!./templates/MessageBoxContent.html'
], function(declare, lang, topic, Templated, template) {

    return declare('app.widget._MessageBoxContent', [Templated], {

        type: null,
        message: null,
        templateString: template,

        constructor: function(options) {
            lang.mixin(this, options);
        }

    });
});
