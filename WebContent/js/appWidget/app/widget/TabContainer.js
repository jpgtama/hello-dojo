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
 * FILE NAME: TabContainer.js
 * 
 * CREATED: 2015年7月30日 上午9:59:29
 * 
 * ORIGINAL AUTHOR(S): 310189952
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/topic',
    'app/util/ListenerUtil',
    'dijit/layout/TabContainer',
    'dijit/registry',
    'dojo/_base/declare'
], function(topic, ListenerUtil, TabContainer, registry, declare) {

    return declare("app.widget.TabContainer", TabContainer, {

        /**
         * LatestWidget
         */
        latestWidget : null,

        /**
         * tabLock
         */
        tabLock : false,

        /**
         * Override
         */
        selectChild : function(/* dijit/_WidgetBase|String */page, /* Boolean */animate) {
            if (page.id)
                this.latestWidget = page.id;
            this.inherited(arguments);
        },

        /**
         * Override
         */
        postCreate : function() {
            this.inherited(arguments);
            var _this = this;

            this.own(this.watch('selectedChildWidget', function(name, oval, nval) {
                if (_this.latestWidget)
                    _this.latestWidget = oval.id;
                else
                    _this.latestWidget = nval.id;
            }));

            this.subscribe(ListenerUtil.TOPIC_KEYS.FORM_DATA_CHANGE_TAB_LOCK, function() {
                if (_this.tabLock)
                    _this.selectChild(_this.latestWidget);
                _this.tabLock = false;
            });

        }

    });
});
