define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'app/lang/Stateful'
], function(declare, lang, string, Stateful) {

    var TokenHolder = declare('app.lang.TokenHolder', [Stateful], {

        token: '',
        setToken: null,

        //using timeout way to change the token value to avoid calling the method frequently
        // _setTokenAttr: function(/*String*/ newToken) {
        //     console.log('TokenHolder: ', '_setTokenAttr');
        //     clearTimeout(setToken);
        //     var _this = this;
        //     setToken = setTimeout(function() {
        //         _this.token.set('token', newToken);
        //     }, 500);
        // },

        // _getTokenAttr: function() {
        //     return this.token.get('token');
        // },
        generateNewToken: function() {
            var _this = this;
            clearTimeout(_this.setToken);
            _this.setToken = setTimeout(function() {
                _this.set('token', _this._guid());
            }, 500);
        },

        _guid: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }

    });

    return new TokenHolder();
});