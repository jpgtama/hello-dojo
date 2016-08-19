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
 * FILE NAME: MessageBox.js
 * 
 * CREATED: 2016年8月18日 下午5:26:23
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/declare',
    'dojo/dom-style',
    'dojo/text!./message-box.html',
    'xstyle/css!./message-box.css'
], function(_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, declare, style, template) {
    return declare('', [
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin
    ], {

        /**
         * template string
         */
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
         * dialog title
         */
        _title : '',

        /**
         * ok button title
         */
        _okTitle : '',

        /**
         * cancel button title
         */
        _cancelTitle : '',

        /**
         * options:
         * 
         * 1. state:
         * 
         * 2. content:
         * 
         */
        constructor : function(options) {
            // handle options
            var state = options.state;
            var type = options.type;
            var title = options.title;

            var sc = this._stateConfig[state];
            if (state && sc) {
                // class name
                this.baseClass = state + ' ' + (type ? type : '');

                // title & button
                this._title = sc.title || title || '';
                this._okTitle = sc.button.ok || '';
                this._cancelTitle = sc.button.cancel || '';

            }
        },

        /**
         * on close
         */
        _onClose : function() {
            this.destroy();
        },

        /**
         * on cancel
         */
        _onCancel : function() {
            if (this.onCancel) {
                this.onCancel();
            }

            this._onClose();
        },

        /**
         * on ok
         */
        _onOk : function() {
            if (this.onOk) {
                this.onOk();
            }

            this._onClose();
        }
    });
});