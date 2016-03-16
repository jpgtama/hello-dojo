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
 * FILE NAME: _SearchCriteriaMixin.js
 * 
 * CREATED: 2015年7月14日 上午11:32:45
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/declare',
], function(declare) {
    var searchCriteria = declare('app.widget.advanceSearch._SearchCriteriaMixin', [], {
        /**
         * search field
         */
        searchField : '',

        /**
         * search value
         */
        searchValue : '',

        /**
         * type
         */
        dataType : '',

        /**
         * operations, declare as string to avoid an issue in js.
         */
        operations : '',

        /**
         * operation type
         */
        operationType : {
            EQUALS : 'EQUALS',
            GREATER : 'GREATER',
            GREATER_EQUALS : 'GREATER_EQUALS',
            LESS : 'LESS',
            LESS_EQUALS : 'LESS_EQUALS',
            LIKE : 'LIKE',
            NOT_EQUALS : 'NOT_EQUALS',
            NOT_LIKE : 'NOT_LIKE',
            IN : 'IN',
            NOT_IN : 'NOT_IN',
            LIKE_START : 'LIKE_START',
            LIKE_END : 'LIKE_END',
            NOT_LIKE_START : 'NOT_LIKE_START',
            NOT_LIKE_END : 'NOT_LIKE_END'
        },

        /**
         * add operation, format: {">=": "111", "<=":"222"}
         */
        _addOperation : function(/* String */operator, /* Array|String|Number */value) {
            if (!this.operations) {
                this.operations = {};
            }
            this.operations[operator] = value;

        },

        /**
         * remove operation
         */
        _removeOperation : function(operator) {
            delete this.operations[operator];
        },

        /**
         * remove all operation
         */
        _removeAllOperation : function() {
            for ( var op in this.operations) {
                this._removeOperation(op);
            }
        },

        /**
         * getSearchCriteria
         */
        getSearchCriteria : function() {
            // get operation array
            var operationArray = [];
            for ( var o in this.operations) {
                var operator = o;
                var value = this.operations[o];
                operationArray.push([
                    this.searchField,
                    operator,
                    value,
                    this.dataType
                ]);
            }

            return operationArray;
        }
    });

    // add static property
    searchCriteria.allValue = '**ALL**';

    return searchCriteria;
});