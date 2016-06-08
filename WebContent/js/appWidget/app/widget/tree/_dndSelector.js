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
 * FILE NAME: Tree.js
 * 
 * CREATED: 2016年3月4日 上午10:05:51
 * 
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/array', // array.filter array.forEach array.map
    'dojo/_base/declare', // declare
    'dojo/_base/kernel', // global
    'dojo/_base/lang', // lang.hitch
    'dojo/dnd/common',
    'dojo/dom', // isDescendant
    'dojo/mouse', // mouse.isLeft
    'dojo/on',
    'dojo/touch',
    'dijit/tree/_dndSelector',
    'dojo/_base/declare'
], function(array, declare, kernel, lang, dndCommon, dom, mouse, on, touch,_dndSelector, declare) {
    return declare('app.registry.widget.tree._dndSelector', [
        _dndSelector
    ], {
        
        /**
         * on select switch
         */
        onSelectSwitch : function(){
            return true;
        },
        
        /**
         * Override
         */
        constructor: function(){
            /** Override Segment Start remove onClickPress     */
            var events = this.events;
            // remove the 9th element
            // remove this -> on(this.tree.domNode, a11yclick.press, lang.hitch(this,"onClickPress")),
            events[8].remove();
            /** Override Segment End      */
        }
    });
});