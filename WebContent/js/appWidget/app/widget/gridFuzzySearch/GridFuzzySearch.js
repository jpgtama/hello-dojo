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
 * FILE NAME: GridFuzzySearch.js
 * 
 * CREATED: 2015年8月11日 上午10:45:50
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/ResourceUtil',
    'app/widget/advanceSearch/_SearchTopicMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dojo/json',
    'dojo/on',
    'dojo/_base/declare',
    'dojo/text!./templates/grid-fuzzy-search.html'
], function(i18n, _SearchTopicMixin, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, lang, JSON, on, declare, template) {
    return declare('app.widget.gridFuzzySearch.GridFuzzySearch', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchTopicMixin
    ], {

        /**
         * base class
         */
        baseClass : 'gridFuzzySearch',

        /**
         * template
         */
        templateString : template,

        /**
         * fuzzySearch 标记模糊查询的查询类型的唯一标识
         */
        fuzzySearch : null,

        /**
         * Override super class
         */
        constructor : function(options) {
            this.fuzzySearch = 'fuzzySearch';
            lang.mixin(this, options);
        },

        /**
         * Override super class
         */
        postCreate : function() {
            var _this = this;
            // publish search when check some important property
            if (this.fieldList && this.fieldList.length > 0) {
                var searchTextBox = this.textBoxNode;
                // 按回车搜索
                this.own(on(searchTextBox, 'keyup', lang.hitch(this, function(e) {
                    if (e.keyCode == 13) {
                        // get value
                        var value = searchTextBox.get('value');

                        // set search params
                        var search = [];
                        for (var i = 0; i < this.fieldList.length; i++) {
                            search.push([
                                this.fieldList[i],
                                'LIKE',
                                value
                            ]);
                        }

                        // this.topic=searchFollowupAppointment
                        // publish out to dynamicgrid for query
                        this.publish(this._TOPIC_DYNAMICGRID_SEARCH_, {
                            search : JSON.stringify(search),
                            searchDisplay : this.getSearchCriteriaDisplay(),
                            searchType : _this.fuzzySearch,
                            junction : this.junction || 'DISJUNCTION'
                        });

                        // notice advanced search predefined value
                        this.publish(this._TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_);
                        
                        // clear advance search condition
                        this.publish(this._TOPIC_ADVANCEDSEARCH_CONDITION_CLEAR_);
                    }
                })));
            }

            // listener about setting value
            this.subscribe(this._TOPIC_SIMPLESEARCH_CLEAR_, lang.hitch(this, function(data) {
                this.textBoxNode.set('value', '');
            }));
        },

        /**
         * get the search criteria to display, if all options are selected then
         * return undefined.
         * 
         * The searchCriteriaDisplay format is: "placeHolderText: inputValue"
         */
        getSearchCriteriaDisplay : function() {
            var placeHolderText = i18n.getText(this.placeHolder);
            var inputValue = this.textBoxNode.get('value');
            var searchCriteriaDisplay = placeHolderText + ': ' + inputValue;
            return searchCriteriaDisplay;
        }
    });
});