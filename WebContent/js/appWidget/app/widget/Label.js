define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom',
    'dojo/regexp',
    'dojox/mvc/Output',
    'dijit/_Widget',
    'dijit/_TemplatedMixin',
    'app/widget/_WidgetSecurityMixin',
    'dojo/dom-class',
    'dojo/dom-style',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'app/util/ResourceUtil'
], function(declare, lang, dom, regexp, Output, _Widget, _TemplatedMixin, _WidgetSecurityMixin, domClass, domStyle, domAttr, domConstruct, i18n) {

    return declare('app.widget.Label', [
        Output,
        _WidgetSecurityMixin
    ], {
        /**
         * use original dojox.mvc.Output._output without i18n
         */
        original : false,

        /**
         * 文本显示的宽度，如果原文本超这个宽度，就会显示... 这里可以传入单位如：（20px），也可以只是数字，但会自动加px
         */
        displayWidth : null,

        /**
         * format
         */
        format: null,
        
        /** Override */
        constructor : function(/* Object */options) {
            lang.mixin(this, options);
        },

        /** Override */
        _output : function() {
            // convert multiple language
            if (!this.original) {
                this.value = i18n.getText(this.value);
            }

            // use format
            if (this.format && (this.value || (this.value === 0))) {
                this.value = lang.replace(this.format, {
                    value : this.value
                });
            }

            var outputNode = this.srcNodeRef || this.domNode;
            if (this.displayWidth == null) {
                outputNode.innerHTML = this.value || this.value == 0 ? this.value : this._exprRepl(this.templateString.trim());
            } else {
                // width: 20; height: 15px; border: 0px; overflow: hidden;
                // text-overflow: ellipsis; white-space: nowrap;

                // TODO clean outputNode child, because this method was called 2
                // times
                outputNode.innerHTML = '';

                var node = domConstruct.create('div', null, outputNode);
                domStyle.set(node, 'width', isNaN(this.displayWidth) ? this.displayWidth : this.displayWidth + "px");
                domStyle.set(node, 'border', '0px');
                domStyle.set(node, 'overflow', 'hidden');
                domStyle.set(node, 'text-overflow', 'ellipsis');
                domStyle.set(node, 'white-space', 'nowrap');
                domStyle.set(node, 'cursor', 'pointer');
                node.innerHTML = this.value;
                domAttr.set(node, 'title', this.value);
            }
        },

        addClass : function(classes) {
            domClass.add(this.domNode, classes);
        },

        removeClass : function(classes) {
            domClass.remove(this.domNode, classes);
        }
    });

});
