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
 * FILE NAME: TreeNode.js
 * 
 * CREATED: 2016年10月11日 下午5:46:31
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_Container',
    'dojo/_base/declare',
    'dojo/text!./TreeNode.html'
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Container, declare, template) {
    return declare('mytree.TreeNode', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        _Container
    ], {

        templateString : template,

        label : 'No label yet!!!'

    });
});