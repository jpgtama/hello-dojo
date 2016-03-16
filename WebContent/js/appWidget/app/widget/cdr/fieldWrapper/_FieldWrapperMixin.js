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
 * FILE NAME: _FieldWrapperMixin.js
 * 
 * CREATED: 2016年1月22日 下午3:33:38
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/WrapperUtil',
    '../labelMixin/_LabelMixin',
    'dojo/dom-construct',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'xstyle/css!./styles/FieldWrapper.css'
], function(wrapperUtil, _LabelMixin, domC, lang, declare) {
    return declare(null, {

        /**
         * 
         */
        postCreate : function() {
            // add label
            var labeledNode = wrapperUtil.wrapLabel(this.domNode, this.label || this.title);

            // add edit mode
            var editModeNode = wrapperUtil.wrapEditMode(labeledNode.domNode, {
                property: this.onPropertyClick
            });
            
            // call inheritance
            this.inherited(arguments);
        },
        
        onCloseClick : function() {
            // destory this
            this.destroyRecursive(false);
        }
    });
});