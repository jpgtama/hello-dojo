define([
    'app/widget/_WidgetI18nMixin',
    'app/widget/_WidgetSecurityMixin',
    'dijit/form/FilteringSelect',
    'dojo/_base/declare'
], function(_WidgetI18nMixin, _WidgetSecurityMixin, FilteringSelect, declare) {

    return declare('app.widget.FilteringSelect', [
        FilteringSelect,
        _WidgetSecurityMixin,
        _WidgetI18nMixin
    ], {

//        _changeLock : false,
//
//        onchange : function() {
//        },
//
//        onChange : function() {
//            if (this._changeLock) {
//                this.onchange();
//                this._changeLock = false;
//            }
//        },
//        
//        setValue:function(value){
//            this._changeLock = true;
//            
//        }
        
        setValueExt:function(value){
            this.valueNode.value = value;
        }

    });

});
