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
 * FILE NAME: GridTotalCount.js
 * 
 * CREATED: 2015年8月10日 下午2:29:46
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/ResourceUtil',
    'app/widget/advanceSearch/_SearchTopicMixin',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./templates/grid-total-count.html'
], function(i18n, _SearchTopicMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, lang, declare, template) {
    return declare('app.widget.gridTotalCount.GridTotalCount', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _SearchTopicMixin
    ], {

        /**
         * base class
         */
        baseClass : 'gridTotalCount',

        /**
         * template
         */
        templateString : template,

        /**
         * Override super class
         */
        constructor : function(options) {
            lang.mixin(this, options);
        },

        /**
         * Override super class
         */
        postCreate : function() {
            // total row number
            this.subscribe(this._TOPIC_DYNAMICGRID_RESULTCOUNT_, lang.hitch(this, function(data) {
                var totalCountLabel = this.totalCountNode;
                var options = {
                    count : data
                }
                var totalCountLabelValue = i18n.getText('appointment_grid_count', options);
                totalCountLabel.set('value', totalCountLabelValue);
            }));
        }
    });
});