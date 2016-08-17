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
 * FILE NAME: StudyCardList.js
 * 
 * CREATED: 2016年8月17日 上午9:43:24
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    '../studyCard/StudyCard',
    'dgrid/List',
    'dojo/dom-construct',
    'dojo/_base/declare',
    'xstyle/css!./study-card-list.css'
], function(StudyCard, List, domC, declare) {
    return declare('', [
        List
    ], {
        
        /**
         * Override
         */
        postscript: function(){
            arguments[0]['class'] = 'study-card-list';
            this.inherited(arguments);
        },

        /**
         * Override
         */
        renderRow : function(item) {
            debugger;
            var wrapper = domC.toDom('<div class="wrapper"><div>');

            var sd = new StudyCard({
                data : item
            });

            wrapper.appendChild(sd.domNode);

            return wrapper;
        }
    });
});