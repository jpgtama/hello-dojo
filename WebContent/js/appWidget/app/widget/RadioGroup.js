define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/widget/_BaseRadioCheckGroup',
    'dojo/text!./templates/RadioGroup.html'
], function(declare, lang, _BaseRadioCheckGroup, template) {

    return declare('app.widget.RadioGroup', [_BaseRadioCheckGroup], {

        templateString: template

    });
});
