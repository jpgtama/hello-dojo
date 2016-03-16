/*******************************************************************************
 * $Id: philipscicodetemplates.xml 276 2012-12-26 02:16:03Z wei.hu $
 * *****************************************************************************
 * 
 * <pre>
 *                         Philips Medical Systems
 *                © 2010 Koninklijke Philips Electronics N.V.
 * 
 * All rights are reserved. Reproduction in whole or in part is
 * prohibited without the written consent of the copyright owner.
 * 
 * 
 * FILE NAME: AdvanceCheckedMultiSelect.js
 * 
 * CREATED: 2015年7月15日 下午2:41:23
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([

    'dojox/form/CheckedMultiSelect',
    'dojo/dom-construct',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(CheckedMultiSelect, domConstruct, array, lang, declare) {
    return declare('app.widget.advanceSearch.AdvanceCheckedMultiSelect', [
        CheckedMultiSelect
    ], {

        /**
         * Override
         */
        _updateSelection : function() {
            this.inherited(arguments);
            this._handleOnChange(this.value);
            array.forEach(this._getChildren(), function(item) {
                item._updateBox();
            });
            domConstruct.empty(this.containerNode);
            var self = this;
            array.forEach(this.value, function(item) {
                var opt = domConstruct.create('option', {
                    'value' : item,
                    'label' : item,
                    'selected' : 'selected'
                });
                domConstruct.place(opt, self.containerNode);
            });
            if (this.dropDown && this.dropDownButton) {
                var i = 0, label = '';
                array.forEach(this.options, function(option) {
                    if (option.selected) {
                        i++;
                        label = option.label;
                    }
                });
                // if choose all, then display 'all'
                if (i == this.options.length) {
                    this.dropDownButton.set('label', '所有');
                } else {

                    this.dropDownButton.set('label', this.multiple ? lang.replace(this._nlsResources.multiSelectLabelText, {
                        num : i
                    }) : label);
                }

            }
        }

    });
});