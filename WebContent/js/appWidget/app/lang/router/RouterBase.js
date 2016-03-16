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
 * FILE NAME: RouterBase.js
 * 
 * CREATED: Mar 6, 2015 3:29:27 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/JsonUtil',
    'dojo/router/RouterBase',
    'dojo/router',
    'dojo/_base/declare'
], function(JsonUtil, RouterBase, router, declare) {
    return declare('app.lang.router.RouterBase', RouterBase, {

        /**
         * Router Parameters Store: Used for Transfer Parameters when they can't
         * be posted by URL
         */
        _routerParams : {},

        /**
         * Register Store: All RouterConfig or ActionConfig with id
         */
        _routerConfig : {},

        /**
         * Register All Configurations
         */
        registerAll : function(/* Object */routerConfig) {
            this._routerConfig = routerConfig;
        },

        /**
         * Register Given Id's Configuration
         */
        registerId : function(/* String */id,/* Object */config) {
            this._routerConfig[id] = config;
        },

        /**
         * Go By Id. The parameter 'isNotByUrl' default is undefined/false/null
         * means router post 'params' By Url
         */
        goId : function(/* String */id, /* Object */params, /* Boolean */isNotByUrl) {
            var conf = JsonUtil.getValue(this._routerConfig, id);
            if (!conf) {
                console.error('can not find the router key [' + id + ']');
                return this.goId('error');
                // throw new Error('can not find the key [' + id + ']');
            }

            return this.goUrl(conf.url, params, isNotByUrl);
        },

        /**
         * Go To URL, Enhanced Function router.go. The parameter 'isNotByUrl'
         * default is undefined/false/null means router post 'params' By Url
         */
        goUrl : function(/* String */url, /* Object */params, /* Boolean */isNotByUrl) {
            if (params) {
                if (!isNotByUrl) {
                    for ( var key in params) {
                        var exp = eval('/:' + key + '/g');
                        url = url.replace(exp, params[key]);
                    }
                } else {
                    if (url) {
                        this._routerParams[url] = params;
                    }
                }
            }

            return this.go(url);
        },

        /**
         * Load Param from Router Parameters Store by url
         */
        getParam : function(/* String */url) {
            if (url) {
                var param = this._routerParams[url];
                if (param) {
                    delete this._routerParams[url];
                    return param;
                }
            }
        },

        /**
         * Get A Build URL By Id and Parameters
         */
        getUrl : function(/* String */id, /* Object */params) {
            var conf = JsonUtil.getValue(this._routerConfig, id);
            if (!conf) {
                if (id == 'error') {
                    return 'Cannot find the url for error';
                }
                return this.getUrl('error');
            }
            var url = conf.url;
            for ( var key in params) {
                var exp = eval('/:' + key + '/g');
                url = url.replace(exp, params[key]);
            }
            return url;
        },

        // register : function(/* String|RegExp */route, /* Function */callback)
        // {
        // router.register(route, callback); // TODO
        // return this.inherited(arguments);
        // },

        // startup : function(defaultPath) {
        // router.startup(defaultPath); // TODO
        // this.inherited(arguments);
        // },

        // _handlePathChange : function(/* String */newPath) {
        // var routes = this._routes;
        // var isExist = false;
        // for (var i in routes) {
        // var routeObj = routes[i];
        // if (routeObj.route.test(newPath)) {
        // //找到第一个括号之前的部分，如果是以w+结束，则继续往前找几个字符，来找到实际的路径
        // var path = routeObj.route + '';
        // var idx = path.lastIndexOf('([\\w-]+)!');
        // if (idx >= 0) {
        // path = path.substring(2, idx + 9);
        // } else {
        // path = path.substring(2, path.indexOf('('));
        // if (path.indexOf('w+') > 0) path = path.substring(0, path.length
        // - 4);
        // }

        // var urlPath = newPath.indexOf('?') > 0 ? newPath.substring(0,
        // newPath.indexOf('?')) : newPath;
        // if (new RegExp('^' + path + '$').test(urlPath)) {
        // isExist = true;
        // break;
        // }
        // }
        // }
        // if (!isExist) return this.goId('error');

        // return this.inherited(arguments);
        // }

        /**
         * For Refresh, set _currentPath to the other path before go
         */
        setCurrentPath : function(/* String */path) {
            this._currentPath = path;
        }

    });
});