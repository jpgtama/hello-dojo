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
 * FILE NAME: WrapperUtil.js
 * 
 * CREATED: 2016年1月22日 下午3:47:00
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
        'dijit/_WidgetBase',
        'dijit/_Container',
        'dojo/_base/lang',
    'dojo/dom-construct',
    'dojo/_base/declare'
], function(_WidgetBase, _Container, lang, domC, declare) {
    return {
        /**
         * replace targetNode with node
         */
        replaceAndAppend : function(/* Node */targetNode, /**/node) {
            // get parent
            var parentNode = targetNode.parentNode;

            // get the index of this domNode
            // NOTICE: it must be the childNodes, not children
            var parentNodeChildren = parentNode.childNodes;

            var thisIndex = 0;
            for ( var i in parentNodeChildren) {
                var childNode = parentNodeChildren[i];
                if (childNode === targetNode) {
                    thisIndex = i;
                    break;
                }
            }

            // insert node into parent, with the same index
            domC.place(node, parentNode, parseInt(thisIndex));

            // place target into node
            domC.place(targetNode, node);
        },

        /**
         * wrapper label out of a node
         * 
         * @return the wrappered node
         */
        wrapLabel : function(/* Object */targetNode, /* String */label) {
            // create wrapper
            var wrapper = new declare([_WidgetBase, _Container], {
                baseClass: 'labelWrapper'
            })();
            
            // add lable
            var labelNode = domC.create('label', {
                innerHTML : label,
                className : 'label'
            });

            domC.place(labelNode, wrapper.domNode);

            // replace and append
            this.replaceAndAppend(targetNode, wrapper.domNode);

            // return 
            return wrapper;
        },

        /**
         * wrapper a node with edit mode: add an icon bar with property icon and
         * close icon.
         * 
         * @param iconAction
         *            {property: function(){}, close: function(){}}
         * 
         */
        wrapEditMode : function(/* Object */targetNode, /* Object */iconActon) {
            // 
            iconActon = iconActon || {};

            // create field wrapper
            var wrapper = new declare([_WidgetBase, _Container], {
                baseClass: 'fieldWrapper'
            })();

            // iconbar
            var iconBarNode = domC.create('div', {
                className : 'iconBar'
            });

            // icon property
            var iconProperty = domC.create('a', {
                className : 'properties',
                onclick : iconActon.property
            });

            // close action
            var closeAction = function() {
                wrapper.destroyRecursive();
            }
            
            // icon close
            var iconClose = domC.create('a', {
                className : 'close',
                onclick : closeAction
            });

            // add icon to icon bar
            domC.place(iconProperty, iconBarNode);
            domC.place(iconClose, iconBarNode);
            
            // add iconbar to wrapper
            domC.place(iconBarNode, wrapper.domNode);

            // replace target node
            this.replaceAndAppend(targetNode, wrapper.domNode);

            return wrapper;
        }

    };
});