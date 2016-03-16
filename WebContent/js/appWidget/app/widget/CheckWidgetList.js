define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/widget/_BaseRadioCheckWidgetList',
    'dojo/text!./templates/CheckWidgetList.html'
], function(declare, lang, _BaseRadioCheckWidgetList, template) {

    return declare('app.widget.CheckWidgetList', [_BaseRadioCheckWidgetList], {
        templateString: template
    });
});
