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
 * FILE NAME: _SearchTopicMixin.js
 * 
 * CREATED: Aug 25, 2015 1:38:36 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/topic',
    'app/service/DynamicGridService',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(topic, DynamicGridService, lang, declare) {
    return declare('app.widget.advanceSearch._SearchTopicMixin', null, {
        /**
         * grid name, used to load config data. Firstly, it comes from UI
         * define, and then is replaced by configuration
         */
        gridName : '',

        /**
         * gridName Value from configuration
         */
        gridNameValue : '',

        /**
         * Topic for notice collaborative components
         */
        // predefined value to advanced search
        _TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_ : 'app/widget/advancedsearch/fillqueryvalueandsearch/{gridNameValue}',

        // notice predefined reload data
        _TOPIC_ADVANCEDSEARCH_RELOADPREDEFINEDLIST_ : 'app/widget/advancedsearch/predefined/reload/{gridNameValue}',

        // set given value to predefined query
        _TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_ : 'app/widget/advancedsearch/predefined/clear/{gridNameValue}',

        // clear advance search condition
        _TOPIC_ADVANCEDSEARCH_CONDITION_CLEAR_ : 'app/widget/advancedsearch/condition/clear/{gridNameValue}',

        // set given value to simple(fuzzy) query
        _TOPIC_SIMPLESEARCH_CLEAR_ : 'app/widget/simplesearch/clear/{gridNameValue}',

        // notice to view result count
        _TOPIC_DYNAMICGRID_RESULTCOUNT_ : 'app/widget/dynamicgrid/resultcount/{gridNameValue}',

        // trigger grid to search result
        _TOPIC_DYNAMICGRID_SEARCH_ : 'app/widget/dynamicgrid/search/{gridNameValue}',

        // dynamic grid's profile setting
        _TOPIC_DYNAMICGRID_PROFILE_SETTING_ : 'app/widget/dynamicgrid/profilesetting/{gridNameValue}',

        // dynamic grid initialization is complete
        _TOPIC_DYNAMICGRID_INIT_COMPLETED_ : 'app/widget/dynamicgrid/init/completed/{gridNameValue}',

        /**
         * Override
         */
        postMixInProperties : function() {
            // Init Services
            var dynamicGridService = new DynamicGridService();

            // loading configuration
            dynamicGridService.getMataConfig(this.gridName).then(lang.hitch(this, function(data) {
                this.gridNameValue = data.gridName;
                this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_ = lang.replace(this._TOPIC_ADVANCEDSEARCH_FILLQUERYVALUEANDSEARCH_, this);
                this._TOPIC_ADVANCEDSEARCH_RELOADPREDEFINEDLIST_ = lang.replace(this._TOPIC_ADVANCEDSEARCH_RELOADPREDEFINEDLIST_, this);
                this._TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_ = lang.replace(this._TOPIC_ADVANCEDSEARCH_PREDEFINED_CLEAR_, this);
                this._TOPIC_ADVANCEDSEARCH_CONDITION_CLEAR_ = lang.replace(this._TOPIC_ADVANCEDSEARCH_CONDITION_CLEAR_, this);
                this._TOPIC_SIMPLESEARCH_CLEAR_ = lang.replace(this._TOPIC_SIMPLESEARCH_CLEAR_, this);
                this._TOPIC_DYNAMICGRID_RESULTCOUNT_ = lang.replace(this._TOPIC_DYNAMICGRID_RESULTCOUNT_, this);
                this._TOPIC_DYNAMICGRID_SEARCH_ = lang.replace(this._TOPIC_DYNAMICGRID_SEARCH_, this);
                this._TOPIC_DYNAMICGRID_PROFILE_SETTING_ = lang.replace(this._TOPIC_DYNAMICGRID_PROFILE_SETTING_, this);
                this._TOPIC_DYNAMICGRID_INIT_COMPLETED_ = lang.replace(this._TOPIC_DYNAMICGRID_INIT_COMPLETED_, this);
            }));

            this.inherited(arguments);
        },

        /**
         * Override. Use 'app/lang/topic'
         */
        subscribe : function(t, method) {
            return this.own(topic.subscribe(t, lang.hitch(this, method)))[0]; // handle
        },

        /**
         * publish for subscribe
         */
        publish : function(t, event) {
            return topic.publish(t, event);
        }
    });
});