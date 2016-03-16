define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/widget/_BaseRadioCheckGroup',
    'dojo/text!./templates/CheckGroup.html'
], function(declare, lang, _BaseRadioCheckGroup, template) {

    return declare('app.widget.CheckGroup', [_BaseRadioCheckGroup], {

        templateString: template,

        constructor: function(options) {
            lang.mixin(this, options);
            // debugger;
        }

    });
});
