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
 * FILE NAME: CompleteBar.js
 * 
 * CREATED: 2016年8月16日 下午4:33:34
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/ProgressBar',
    'dojo/_base/declare',
    'dojo/text!./complete-bar.html',
    'xstyle/css!./complete-bar.css'
], function(ProgressBar, declare, template) {
    return declare('', [
        ProgressBar
    ], {

        templateString: template,
        
        total: 0,
        
        complete: 0,
        
        /**
         * Override
         */
        postCreate: function(){
            this.inherited(arguments);
            
            this.updateStatus(this.total, this.complete);
        },
        
        /**
         * Override, hidden percentage
         */
        report: function(){return '&nbsp;';},
        
        updateStatus: function(total, complete){
            this.completeCountNode.innerText = complete;
            this.incompleteCountNode.innerText = total - complete;
            this.set('value', complete/total*100);
        },
        
    });
});