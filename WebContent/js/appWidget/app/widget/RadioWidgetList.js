define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/widget/_BaseRadioCheckWidgetList',
    'dojo/text!./templates/RadioWidgetList.html'
], function(declare, lang, _BaseRadioCheckWidgetList, template) {

    return declare('app.widget.RadioWidgetList', [_BaseRadioCheckWidgetList], {
        templateString: template
    });
});
