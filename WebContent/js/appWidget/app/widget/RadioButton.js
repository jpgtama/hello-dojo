define([
	'dojo/_base/declare', // declare
	'dojo/_base/lang',
	'dojox/mvc/sync',
	'dijit/form/RadioButton',
	'dojo/text!./templates/CheckBox.html'
], function(declare, lang, sync, RadioButton, template){

	return declare('app.widget.RadioButton', [RadioButton], {
		
		tempalteString: template,
		targetModel: null,
		targetField: '',
		sourceModel: null,
		sourceField: 'selectedValue',

		radioTransform: {
            format: function(checked){
                console.log('------------', this, checked, this);
                return checked;
            },
            parse: function(checked){
                console.log('------------', this.target.value, checked, this);
               if (checked) {
               	sourceModel.set(this.sourceField, this.target.value);
               }
                return checked;
            }
        },

		constructor: function(options) {
			lang.mixin(this, options);
		}
		
	});
});
