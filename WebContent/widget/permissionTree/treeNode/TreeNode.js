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
 * CREATED: 2016年8月31日 下午1:24:54
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_Container',
    'dijit/_Contained',
    'dijit/Tree',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/Deferred',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/on',
    'dojo/text!./templates/tree-node.html'
], function(_Container, _Contained, Tree, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Deferred, array, lang, declare, on, template) {
    return declare('myTreeNode', [
        Tree._TreeNode,
        _WidgetsInTemplateMixin
    ], {

        templateString : template,

        postCreate : function() {
            this.inherited(arguments);

            on(this.rowNode, 'click', lang.hitch(this, function() {
                this.checkNode._onClick({});
            }));

        },

        onCheckNodeChanged : function() {

        }

    });
});