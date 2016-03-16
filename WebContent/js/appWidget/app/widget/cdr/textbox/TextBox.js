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
 * FILE NAME: TextBox.js
 * 
 * CREATED: 2016年1月22日 上午9:33:53
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/TextBox',
    '../labelMixin/_LabelMixin',
    'app/widget/cdr/fieldWrapper/_FieldWrapperMixin',
    'dojo/_base/declare'
], function(TextBox, _LabelMixin, _FieldWrapperMixin, declare) {
    return declare([
        TextBox, _FieldWrapperMixin
    ], {

        postCreate: function() {
          
          this.inherited(arguments);
        },
        
        startup: function() {
            
            
            // call inheritance
            this.inherited(arguments);
            
        }
        
    });
});