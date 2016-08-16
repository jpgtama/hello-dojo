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
 * FILE NAME: StudyCard.js
 * 
 * CREATED: 2016年8月16日 下午5:13:53
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/declare',
    'dojo/text!./study-card.html'
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, declare, template) {
    return declare('', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        templateString : template,

        studyLabel: '研究数量',
        
        patientLabel: '患者人数',
        
        data : {
            studyName : '某某研究',
            studyCount: 0,
            patientCount : 0,
            completeCount : 0
        },

        /**
         * Override
         */
        constructor : function() {

        }
    });
});