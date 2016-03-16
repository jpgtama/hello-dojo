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
 * FILE NAME: CheckedMultiSelect.js
 * 
 * CREATED: 2015年7月8日 上午9:44:18
 * 
 * ORIGINAL AUTHOR(S): 310189849
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/ResourceUtil',
    'dojox/form/CheckedMultiSelect',
    'dojo/on',
    'dojo/_base/declare'
], function(i18n, CheckedMultiSelect, on, declare) {
    return declare('app.widget.CheckedMultiSelect', [
        CheckedMultiSelect
    ], {
        /**
         * Use original dojox.mvc.Output._output without i18n
         */
        original : false,

        /**
         * Expression for checking Module //TODO
         */
        groupExpr : null,

        /**
         * Override false:不会根据label排序
         */
        sortByLabel : false,

        /**
         * Override
         */
        _isEqual : function(a, b) {
            // summary:
            // Function that determines whether two values are identical,
            // taking into account that NaN is not normally equal to itself
            // in JS.
            // For Array
            if (a instanceof Array && b instanceof Array) {
                if (a.length == b.length) {
                    for (var i = 0; i < a.length; i++) {
                        if (a[i] != b[i])
                            return false;
                    }
                    return true;
                }
                return false;
            }
            // From _WidgetBase
            return a === b || (/* a is NaN */a !== a && /* b is NaN */b !== b);
        },

        /**
         * Override add to support array under _isEqual
         */
        _set : function(/* String */name, /* anything */value) {
            var oldValue = this[name];
            this[name] = value;
            // Modified By H.W Start
            if (this._created && !this._isEqual(oldValue, value)) {
                // Modified By H.W End
                if (this._watchCallbacks) {
                    this._watchCallbacks(name, oldValue, value);
                }
                this.emit("attrmodified-" + name, {
                    detail : {
                        prevValue : oldValue,
                        newValue : value
                    }
                });
            }
        },

        /**
         * Override 初始化编辑页面时，把选中的数据渲染到页面上。
         * 约定好页面引用组件时传递选中的数据源，用value,而不是selectedValue 例如：
         * value:at(this.roleData,'permissionIds')， 而不是
         * selectedValue:at(this.roleData,'permissionIds')
         */
        store : null,
        _setStoreAttr : function(val) {
            this._set('store', val);
            this._deprecatedSetStore(val, this.value);
        },

        /**
         * Check whether Item is Module
         */
        _isGroup : function(/* Object */item) {
            // TODO 兼容处理 权限和组织两种数据model都可以使用
            if (this._isArray(item.code) && this._isArray(item.module)) {
                return item.code[0] == item.module[0];
            } else {
                return true;
            }
        },

        _isArray : function(source) {
            return '[object Array]' == Object.prototype.toString.call(source);
        },

        _addOptionForItem : function(/* item */item) {
            // summary:
            // Creates (and adds) the option for the given item
            var store = this.store;
            if (store.isItemLoaded && !store.isItemLoaded(item)) {
                // We are not loaded - so let's load it and add later.
                // Remove for 2.0 (it's the old dojo.data API)
                store.loadItem({
                    item : item,
                    onItem : function(i) {
                        this._addOptionForItem(i);
                    },
                    scope : this
                });
                return;
            }
            var newOpt = this._getOptionObjForItem(item);
            this.addOption(newOpt);
        },

        /**
         * Override
         */
        _getOptionObjForItem : function(/* Object */item) {
            // summary:
            // Returns an option object based off the given item. The "value"
            // of the option item will be the identity of the item, the "label"
            // of the option will be the label of the item.

            // remove getLabel() call for 2.0 (it's to support the old dojo.data
            // API)
            var store = this.store, label = (this.labelAttr && this.labelAttr in item) ? item[this.labelAttr] : store.getLabel(item), value = (label ? store
                    .getIdentity(item) : null);
            // 国际化label
            if (!this.original)
                label = i18n.getText(label);
            if (!this._isGroup(item)) {
                label = '&nbsp;&nbsp;&nbsp;&nbsp;' + label;
            }
            return {
                value : value,
                label : label,
                item : item
            }; // __SelectOption
        }

    });
});