define([
    'app/widget/ValidationTextBox',
    'app/widget/SimpleTextarea',
    'dojo/_base/declare',
], function(ValidationTextBox, SimpleTextarea, declare) {

    return declare('app.widget.ValidationTextarea', [
        ValidationTextBox,
        SimpleTextarea
    ], {

    });

});
