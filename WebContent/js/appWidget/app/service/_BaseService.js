define([
    'app/config/appConfig',
    'app/util/JsonUtil',
    'dojox/lang/aspect',
    'dojo/json',
    'dojo/request',
    'dojo/request/notify',
    'dojo/string',
    'dojo/_base/declare'
], function(appConfig, jsonUtil, aspect, JSON, Request, notify, string, declare) {

    return declare('app.service._BaseService', [], {

        configKey : '',
        searchUrl : '',
        resourceUrl : '',
        _advisedMethod : /^(load|search|put|remove|save)/,

        constructor : function() {
            if (!this.configKey) {
                this.configKey = this.declaredClass || this.prototype.declaredClass;
            }

            var _this = this;
            aspect.advise(_this, _this._advisedMethod, {
                before : function() {
                    var config = jsonUtil.getValue(appConfig, _this.configKey);// appConfig[_this.configKey];
                    if (!config)
                        return;

                    _this.set('searchUrl', config.query);
                    _this.set('resourceUrl', config.url);
                }
            });
        },

        set : function(/* String */prop, /* Object */value) {
            this[prop] = value;
        },

        get : function(/* String */prop) {
            return this[prop];
        },

        _getResourceUrl : function(/* Long */id) {
            if (id) {
                return string.substitute(this.resourceUrl, {
                    id : id
                });
            } else {
                var idx = this.resourceUrl.indexOf('${id}');
                var url = this.resourceUrl.substr(0, idx - 1);
                if (idx < (this.resourceUrl.length - 5)) {
                    url += this.resourceUrl.substr(idx + 5);
                }
                return url;
            }
        },

        _getSearchUrl : function() {
            return this.searchUrl;
        },

        search : function(/* Object */params) {
            return Request.post(this._getSearchUrl(), {
                handleAs : 'json',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : JSON.stringify(params)
            });
        },

        load : function(/* Long */id,/* Boolean */sync) {
            return Request.get(this._getResourceUrl(id), {
                handleAs : 'json',
                sync : sync || false
            });
        },

        put : function(/* Object */data) {
            return Request.put(this._getResourceUrl(), {
                handleAs : 'json',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : JSON.stringify(data)
            });
        },

        remove : function(/* Long */id) {
            return Request.del(this._getResourceUrl(id), {
                handleAs : 'json'
            });
        },

        save : function(/* Object */data) {
            return Request.post(this._getResourceUrl(), {
                handleAs : 'json',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : JSON.stringify(data)
            });
        }

    });
});
