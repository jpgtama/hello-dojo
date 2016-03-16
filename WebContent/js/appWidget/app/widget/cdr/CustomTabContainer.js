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
 * FILE NAME: CustomTabContainer.js
 * 
 * CREATED: 2016年1月4日 下午3:47:23
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/Label',
    'app/widget/cdr/CustomInlineEditBox',
    'dijit/form/TextBox',
    'dijit/ConfirmDialog',
    'dijit/registry',
    'dojo/aspect',
    'dojo/dom-construct',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/on',
    'dijit/layout/ContentPane',
    'dijit/layout/TabContainer',
    'dijit/Menu',
    'dijit/MenuItem',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(AppLabel, InlineEditBox, TextBox, ConfirmDialog, registry, aspect, domConstruct, domAttr, domStyle, on, ContentPane, TabContainer, Menu, MenuItem,
        array, lang, declare) {
    return declare('app.widget.cdr.CustomTabContainer', [
        TabContainer
    ], {

        /**
         * title width
         */
        titleWidth : null,

        /**
         * is title editable
         */
        titleEditable : false,

        /**
         * do check when switch tabs
         */
        switchCheck : false,

        /**
         * do check when close a tab
         */
        closeCheck : false,

        /**
         * Override, insert app/widget/Label & InlineEditBox
         * 
         */
        postMixInProperties : function() {
            var customTabContainer = this;

            // add Label & InlineEditBox & switch check & close check
            aspect.after(this, '_makeController', function() {
                // get tab controller
                var tabController = arguments[0];

                // add Label & InlineEditBox
                customTabContainer._addLabelAndInlineEditBox(tabController);

                // mixin onButtonClick & onCloseButtonClick function
                customTabContainer._addCheckBeforeSwitchAndClose(customTabContainer, tabController);

                
//                aspect.after(tabController, 'onSelectChild', function() {
//                    tabController._setButtonClass(tabController._getScroll());
//                });
                
                // after aspect must return the final value
                return tabController;
            });

            // make closing tab not to invoke switch check
            aspect.around(this, 'removeChild', function(originalFunction) {
                return function() {
                    // before
                    customTabContainer.switchDueToClose = true;

                    // call original function
                    var result = originalFunction.apply(customTabContainer, arguments);

                    // after
                    customTabContainer.switchDueToClose = false;

                    return result;
                };
            });

            // call inheritance
            this.inherited(arguments);

        },

        /**
         * insert Label & InlineEditBox
         */
        _addLabelAndInlineEditBox : function(/* Object */tabController) {
            var _this = this;
            // insert Label & InlineEditBox
            aspect.after(tabController, 'onAddChild', function() {
                // get control button
                var button = arguments[1][0].controlButton;

                // insert label
                var newTitle = _this.insertLabel(tabController, button);

                // make title editable
                _this.makeTitleEditable(newTitle);

            });
        },

        /**
         * insert Label as a new title
         * 
         * @return the inserted label widget/dom
         */
        insertLabel : function(/* Object */tabController, /* Object */button) {
            // title dom
            var titleDom = registry.byId(button.titleNode.getAttribute('widgetid')).containerNode;

            // redirect click event to tab controller, so click event will not
            // be blocked by AppLabel
            on(titleDom, 'click', function() {
                tabController.onButtonClick(button.page);
            });

            // inserted Label
            var newTitle = null;

            if (this.titleWidth) {
                newTitle = new AppLabel({
                    value : titleDom.innerHTML,
                    displayWidth : this.titleWidth
                });

                // clear outer label
                titleDom.innerHTML = '';

                // place inside
                domConstruct.place(newTitle.domNode, titleDom);
            } else {
                // use a common span
                newTitle = domConstruct.create('span', {
                    innerHTML : titleDom.innerHTML
                });

                // clear outer label
                titleDom.innerHTML = '';

                // place inside
                domConstruct.place(newTitle, titleDom);
            }

            return newTitle;
        },

        /**
         * make the title editable
         */
        makeTitleEditable : function(/* Widget|DOM */title) {
            if (this.titleEditable) {
                var titleInsideDom = this.titleWidth ? title.domNode.children[0] : title;

                new InlineEditBox({
                    editor : TextBox,
                    autoSave : true
                }, titleInsideDom).startup();
            }
        },

        /**
         * 
         */
        _addCheckBeforeSwitchAndClose : function(customTabContainer, tabController) {
            var _this = this;
            // tab switch check
            declare.safeMixin(customTabContainer, {
                /**
                 * Override
                 */
                selectChild : function(/* dijit/_WidgetBase|String */page, /* Boolean */animate) {
                    if (customTabContainer.selectedChildWidget === page) {
                        // self click, directly call inheritance
                        this.inherited(arguments);
                    } else {
                        // check switch
                        if (_this.switchCheck && !customTabContainer.switchDueToClose) {
                            // super method
                            var args = arguments;
                            var superClassFunction = function() {
                                customTabContainer.inherited('selectChild', args);
                            };

                            // confirm dialog before switch
                            myDialog = new ConfirmDialog({
                                title : "My ConfirmDialog",
                                content : "确定切换吗？",
                                style : "width: 300px",

                                onCancel : function() {

                                },

                                onExecute : function() {
                                    superClassFunction();
                                }

                            });

                            // show dialog
                            myDialog.show();
                        } else {
                            // call inheritance directly
                            this.inherited(arguments);
                        }

                    }
                }
            });

            // tab close check
            declare.safeMixin(tabController, {
                /**
                 * Override
                 */
                onCloseButtonClick : function(page) {
                    if (_this.closeCheck) {
                        // super method
                        var args = arguments;
                        var superClassFunction = function() {
                            tabController.inherited('onCloseButtonClick', args);
                        };

                        // confirm dialog before switch
                        myDialog = new ConfirmDialog({
                            title : "My ConfirmDialog",
                            content : "确定关闭吗？",
                            style : "width: 300px",

                            onCancel : function() {

                            },

                            onExecute : function() {
                                superClassFunction();
                            }

                        });

                        // show dialog
                        myDialog.show();
                    } else {
                        // call inheritance directly
                        this.inherited(arguments);
                    }

                }
            });
        },

        /**
         * Override
         */
        startup : function() {
            // call inheritance
            this.inherited(arguments);

            var _this = this;
            var menuBtn = this.tablist._menuBtn;

            // mixin to make menu item label ellipsis
            declare.safeMixin(menuBtn, {
                loadDropDown : function(callback) {
                    this.dropDown = new Menu({
                        id : this.containerId + "_menu",
                        ownerDocument : this.ownerDocument,
                        dir : this.dir,
                        lang : this.lang,
                        textDir : this.textDir
                    });
                    var container = registry.byId(this.containerId);
                    array.forEach(container.getChildren(), function(page) {
                        var menuItem = new MenuItem({
                            id : page.id + "_stcMi",
                            label : page.title,
                            iconClass : page.iconClass,
                            disabled : page.disabled,
                            ownerDocument : this.ownerDocument,
                            dir : page.dir,
                            lang : page.lang,
                            textDir : page.textDir || container.textDir,
                            onClick : function() {
                                container.selectChild(page);
                            }
                        });
                        
                        // CUSTOM: make menu item label ellipsis
                        var td = menuItem.containerNode;
                        domStyle.set(td, 'width', _this.titleWidth + 'px');
                        domStyle.set(td, 'display', 'inline-block');
                        domStyle.set(td, 'overflow', 'hidden');
                        domStyle.set(td, 'text-overflow', 'ellipsis');
                        domStyle.set(td, 'white-space', 'nowrap');
                        domAttr.set(td, 'title', td.innerHTML);
                        // CUSTOM END
                        
                        this.dropDown.addChild(menuItem);
                    }, this);
                    callback();
                }
            });
        }

    });
});