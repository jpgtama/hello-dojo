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
 * FILE NAME: _LabelMixin.js
 * 
 * CREATED: 2016年1月22日 上午9:23:12
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/WrapperUtil',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/_base/declare',
    'xstyle/css!./styles/_LabelMixin.css'
], function(wrapperUtil, domC, domClass, declare) {
    return declare(null, {

        startup : function() {

            // create wrapper
            var labelWrapper = domC.create('div');
            domClass.add(labelWrapper, 'labelWrapper');

            // add lable
            var labelNode = domC.create('label', {
                innerHTML : this.label || this.title,
                className : 'label'
            });

            domC.place(labelNode, labelWrapper);

            // replace and append
            wrapperUtil.replaceAndAppend(this.domNode, labelWrapper);
            
//            // get parent
//            var parentNode = this.domNode.parentNode;
//
//            // get the index of this domNode
//            // NOTICE: it must be the childNodes, not children
//            var parentNodeChildren = parentNode.childNodes;
//
//            var thisIndex = 0;
//            for ( var i in parentNodeChildren) {
//                var childNode = parentNodeChildren[i];
//                if (childNode.id === this.domNode.id) {
//                    thisIndex = i;
//                    break;
//                }
//            }
//
//            // insert wrapper into parent, with the same index
//            domC.place(labelWrapper, parentNode, parseInt(thisIndex));
//
//            // put this domNode into wrapper
//            domC.place(this.domNode, labelWrapper);

            // call inheritance
            this.inherited(arguments);

        }

    });
});