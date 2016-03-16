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
 * FILE NAME: FloatTitleContentPane.js
 * 
 * CREATED: 2016年1月27日 上午10:45:00
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/layout/ContentPane',
    'dijit/registry',
    'dojo/_base/array',
    'dojo/dom',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/on',
    'dojo/query',
    'dojo/_base/declare'
], function(ContentPane, registry, arrayUtil, dom, domAttr, domC, domGeometry, domStyle, on, query, declare) {
    return declare([
        ContentPane
    ], {

        /**
         * Override
         */
        startup : function() {

            // call inheritance
            this.inherited(arguments);
            
            
            // the suffix string for the cloned title
            var clonedElSuffix = "_cloned";

            // scroll div, this.domNode
            var scrollDiv = this.domNode;
            domStyle.set(scrollDiv, 'position', 'relative');
            domStyle.set(scrollDiv, 'padding', '0px');

            // add fixed title bar
            var fixedTitleBarEl = domC.toDom('<div id="fixedTitleBar" class="fixedTitleBar"></div>');
            domStyle.set(fixedTitleBarEl, 'position', 'fixed');
            domStyle.set(fixedTitleBarEl, 'z-index', '1');
            domC.place(fixedTitleBarEl, this.domNode, 'first');

            // add wheel event to fixed title bar, so scrolling on fixed title bar will also scroll the div
            fixedTitleBarEl.addEventListener('wheel', function(evt) {
                var offsetScrollTop = evt.wheelDelta; 
                scrollDiv.scrollTop = scrollDiv.scrollTop - offsetScrollTop;
            });
            
            // function to set title fixed
            var setTitleFixed = function(titleElement) {
                var clonedEl = null;

                // add scroll event
                scrollDiv.addEventListener('scroll', function() {
                    // title above height:
                    // the space between the title's top and scroll div's top
                    var titleElAboveHeight = titleElement.offsetTop - scrollDiv.scrollTop;

                    // fix bar height
                    var fixedTitleBarElHeight = fixedTitleBarEl.clientHeight;

                    // fix title
                    // when title aboveHeight < fixedTitleBar height
                    if (titleElAboveHeight < fixedTitleBarElHeight) {
                        // fix
                        fixTitle(titleElement);
                    }

                    // release fix
                    // when titleEl above height >= cloned title offsetTop
                    if (clonedEl) {
                        if (titleElAboveHeight >= clonedEl.offsetTop) {
                            releaseFix(titleElement);
                        }
                    }

                });

                // fix title
                var fixTitle = function(el) {
                    // if exist, show it
                    if (clonedEl) {
                        clonedEl.style.display = "block";
                        setBackgroundPosition(el, clonedEl);
                    } else {
                        // clone
                        clonedEl = el.cloneNode(true);
                        clonedEl.id = el.id + clonedElSuffix;
                        clonedEl.setAttribute('masterId', el.id);
                        clonedEl.style.cursor = "pointer";

                        // set dijitArrowNode backgroundPosition
                        setBackgroundPosition(el, clonedEl);

                        // append
                        fixedTitleBarEl.appendChild(clonedEl);

                        // set width
                        var targetWholeWidth = el.offsetWidth;
                        var me = domGeometry.getMarginExtents(clonedEl);
                        var be = domGeometry.getBorderExtents(clonedEl);
                        var pe = domGeometry.getPadExtents(clonedEl);

                        var acutalWidth = targetWholeWidth - me.w - be.w - pe.w;
                        clonedEl.style.width = acutalWidth + "px";

                        // set height
                        var targetWholeHeight = el.offsetHeight;
                        var acutalHeight = targetWholeHeight - me.h - be.h - pe.h;
                        clonedEl.style.height = acutalHeight + "px";

                        // add link back
                        addLinkBack(clonedEl);
                    }
                };

                // release fix
                var releaseFix = function(el) {
                    // hide cloned title
                    if (clonedEl) {
                        clonedEl.style.display = "none";
                    }
                };

                // add link back
                var addLinkBack = function(clonedEl) {
                    clonedEl.addEventListener('click', linkBack);
                };

                // link back function
                var linkBack = function() {
                    // scroll back
                    var newScrollPos = titleElement.offsetTop - clonedEl.offsetTop;
                    scrollDiv.scrollTop = newScrollPos;

                    // extend title pane if it is closed
                    var masterId = this.getAttribute('masterId');
                    var masterTitle = dom.byId(masterId);
                    var titlePane = registry.byId(masterTitle.parentNode.id);
                    if (!titlePane.open) {
                        titlePane.toggle();
                    }
                };

                // set background position
                var setBackgroundPosition = function(el, clonedEl) {
                    var arrowNode = query('.dijitArrowNode', el)[0];
                    var computedStyle = domStyle.getComputedStyle(arrowNode);
                    var bp = computedStyle.backgroundPosition;

                    var clonedArrowNode = query('.dijitArrowNode', clonedEl)[0];
                    domStyle.set(clonedArrowNode, 'backgroundPosition', bp);
                };
            };

            // loop children
            arrayUtil.forEach(this.getChildren(), function(child) {
                var titleElement = child.titleBarNode;
                setTitleFixed(titleElement);
            });

        }
    });
});