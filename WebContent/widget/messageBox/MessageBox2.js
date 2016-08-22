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
 * FILE NAME: MessageBox2.js
 * 
 * CREATED: 2016年8月22日 下午1:28:13
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/Dialog',
    'dojo/aspect',
    'dojo/Deferred',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/_base/declare',
    'dojo/text!./message-box2.html',
    'xstyle/css!./message-box2.css'
], function(Dialog, aspect, Deferred, domClass, domC, declare, template) {
    return declare([
        Dialog
    ], {

        templateString : template,

        /**
         * including: error, attention, confirm, information, message
         */
        state : null,

        /**
         * lime, blue, gray, closeIcon
         */
        type : null,

        /**
         * the content displayed on box. Default is ''
         */
        content : '',

        /**
         * state config
         */
        _stateConfig : {
            error : {
                title : 'Error',
                button : {
                    cancel : 'Acknowledge'
                }
            },

            attention : {
                title : 'Attention',
                button : {
                    cancel : 'Close'
                }
            },

            confirm : {
                title : 'Confirm',
                button : {
                    ok : 'OK',
                    cancel : 'Cancel'
                }
            },

            information : {
                title : 'Information',
                button : {
                    ok : 'OK'
                }
            },

            message : {
                button : {
                    ok : 'Done'
                }
            }
        },

        /**
         * ok button title
         */
        _okTitle : '',

        /**
         * cancel button title
         */
        _cancelTitle : '',

        clickDefer : null,

        /**
         * Override
         */
        constructor : function(options) {
            // handle options
            var state = options.state;
            var type = options.type;
            var title = options.title;

            var sc = this._stateConfig[state];
            if (state && sc) {
                // class name
                this.baseClass += ' ' + state + ' ' + (type ? type : '');

                // title & button
                this._title = sc.title || title || '';
                this._okTitle = sc.button.ok || '';
                this._cancelTitle = sc.button.cancel || '';
            }

            aspect.after(this, 'onExecute', function() {
                if (this.clickDefer) {
                    this.clickDefer.resolve();
                }
            });

            aspect.after(this, 'onCancel', function() {
                if (this.clickDefer) {
                    this.clickDefer.reject();
                }
            });

        },

        /**
         * Override
         */
        show : function() {
            this.inherited(arguments);

            this.clickDefer = new Deferred();

            return this.clickDefer;
        }
    });
});