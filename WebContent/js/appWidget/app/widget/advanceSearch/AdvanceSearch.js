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
 * FILE NAME: AdvanceSearch.js
 * 
 * CREATED: 2015年7月15日 下午1:13:53
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/advanceSearch/_SearchCriteriaMixin',
    'app/lang/topic',
    'app/util/Constants',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/text!./templates/advanceSearch.html',
    'dojo/_base/declare'
], function(_SearchCriteriaMixin, topic, Constants, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, registry, on, lang, template, declare) {
    return declare('app.widget.advanceSearch.AdvanceSearch', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * template
         */
        templateString : template,

        /**
         * base Class
         */
        baseClass : "advanceSearch",

        /**
         * constructor
         */
        constructor : function(options) {
            lang.mixin(this, options);
            this.inherited(arguments);
        },

        /**
         * Override
         */
        postCreate : function() {

            // clear
            on(this.clearButton, 'click', lang.hitch(this, function() {
                // get all children widgets
                var children = registry.findWidgets(this.domNode);
                // set default
                children.map(function(widget) {
                    if (widget.setDefaultValue) {
                        widget.setDefaultValue();
                    }
                });

            }));

            // query
            on(this.queryButton, 'click', lang.hitch(this, function() {
                // get all children widgets
                var children = registry.findWidgets(this.domNode);

                // get search criteria
                var searchCriteria = children.reduce(function(totalSc, widget, index) {
                    if (widget.getSearchCriteria) {
                        var sc = widget.getSearchCriteria();
                        // only add selected search
                        if (sc.length != 0) {
                            totalSc = totalSc.concat(sc);
                        }
                    }
                    return totalSc;
                }, []);

                topic.publish(Constants.appointment.SEARCH_TOPIC, {
                    search: JSON.stringify(searchCriteria)
                });

            }));
        }

    });
});