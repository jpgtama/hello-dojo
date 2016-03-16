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
 * FILE NAME: InputRangeType.js
 * 
 * CREATED: 2015年7月13日 下午4:57:33
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/Stateful',
    'app/util/ResourceUtil',
    'app/widget/_HiddenMixin',
    'app/widget/advanceSearch/_SearchCriteriaMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/_base/declare',
    'dojo/text!./templates/input-range.html'
], function(Stateful, i18n,_HiddenMixin, _SearchCriteriaMixin, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, lang, on, declare, template) {
    return declare('app.widget.advanceSearch.InputRangeType', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchCriteriaMixin,
        _HiddenMixin
    ], {
        /**
         * template
         */
        templateString : template,

        /**
         * base Class
         */
        baseClass : "inputRangeType",
        /**
         * data model
         */
        dataModel : new Stateful(),
        /**
         * field
         */
        field : '',

        /**
         * field display key
         */
        fieldDispalyKey : '',

        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);

            // set search field
            this.searchField = this.field;

            // set field display
            this.dataModel.fieldDisplay = i18n.getText(this.fieldDispalyKey);
        },

        /**
         * Override
         */
        postCreate : function() {
            // watch fromValue
            this.dataModel.watch('fromValue', lang.hitch(this, function(name, oldValue, value) {
                this._setSearchValue();
            }));

            // watch toValue
            this.dataModel.watch('toValue', lang.hitch(this, function(name, oldValue, value) {
                this._setSearchValue();
            }));

            // set default
            this._setSearchValue();

            // set pattern
            if (this.pattern) {
                this.fieldValueFromNode.pattern = this.pattern;
                this.fieldValueToNode.pattern = this.pattern;
            }
        },

        /**
         * Override
         */
        getChildren : function() {
            // summary:
            // Returns all direct children of this widget, i.e. all widgets
            // underneath this.containerNode whose parent
            // is this widget. Note that it does not return all descendants, but
            // rather just direct children.
            // Analogous to
            // [Node.childNodes](https://developer.mozilla.org/en-US/docs/DOM/Node.childNodes),
            // except containing widgets rather than DOMNodes.
            //
            // The result intentionally excludes internally created widgets
            // (a.k.a. supporting widgets)
            // outside of this.containerNode.
            //
            // Note that the array returned is a simple array. Application code
            // should not assume
            // existence of methods like forEach().

            return [
                this.fieldValueFromNode,
                this.fieldValueToNode
            ]; // dijit/_WidgetBase[]
        },
        /**
         * set search value, ge: greaterEqual, le: lessEqual
         */
        _setSearchValue : function() {
            // get value
            var fromValue = this.dataModel.get('fromValue');
            var toValue = this.dataModel.get('toValue');

            // add operation
            if (fromValue) {
                this._addOperation(this.operationType.GREATER_EQUALS, this._changeValueType(fromValue));
            } else {
                this._removeOperation(this.operationType.GREATER_EQUALS);
            }

            if (toValue) {
                this._addOperation(this.operationType.LESS_EQUALS, this._changeValueType(toValue));
            } else {
                this._removeOperation(this.operationType.LESS_EQUALS);
            }

        },

        /**
         * change value type
         */
        _changeValueType : function(/* String */value) {
            var newValue = value;
            if (this.dataType && (this.dataType.toUpperCase() == 'INTEGER' || this.dataType.toUpperCase() == 'LONG')) {
                newValue = parseInt(value);
            }
            return newValue;
        },

        /**
         * setDefaultValue
         */
        setDefaultValue : function() {
            this.dataModel.set('fromValue', '');
            this.dataModel.set('toValue', '');
            // remove all operations
            this._removeAllOperation();
        },

        /**
         * Set query value using saved query
         */
        setQueryValue : function(/* Object */queryValue) {
            // set from value
            if (queryValue.fromValue) {
                this.dataModel.set('fromValue', queryValue.fromValue);
            }

            // set to value
            if (queryValue.toValue) {
                this.dataModel.set('toValue', queryValue.toValue);
            }
        },

        /**
         * Get query value to save, if all options are selected then return
         * undefined.
         */
        getQueryValue : function() {
            var queryValue = {};
            queryValue.field = this.field;
            queryValue.value = {};
            queryValue.value.fromValue = this.dataModel.get('fromValue');
            queryValue.value.toValue = this.dataModel.get('toValue');

            // if any value is specified, then return queryValue
            if (queryValue.value.fromValue || queryValue.value.toValue) {
                return queryValue;
            }
        },

        /**
         * get the search criteria to display, if all options are selected then
         * return undefined.
         * 
         * The searchCriteriaDisplay format is: "fieldName: fromValue - toValue"
         * 
         */
        getSearchCriteriaDisplay : function() {
            if (this.getQueryValue()) {
                var searchCriteriaDisplay = this.dataModel.fieldDisplay + ': ' + this.fieldValueFromNode.value + ' - ' + this.fieldValueToNode.value;
                return searchCriteriaDisplay;
            }
        }

    });
});