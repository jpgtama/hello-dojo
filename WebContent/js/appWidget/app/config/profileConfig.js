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
 * FILE NAME: profileConfig.js
 * 
 * CREATED: Jul 1, 2015 10:06:06 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/date',
    'dojo/hash',
    'dojo/json',
    'dojo/request',
    'dojo/string',
    'dojo/_base/array',
    'dojo/_base/lang'
], function(date, hash, JSON, request, string, array, lang) {

    // profile for system personal info
    var _profile = null;
    // validation for authentication
    var _isValid = false;

    // Load Profile From Server
    var _loadProfile = function() {
        request.post('service/security/profile', {
            handleAs : 'json',
            sync : true
        }).then(function(data) {
            if (data && data.code == 0 && data.items != null) {
                _profile = data.items;
                _isValid = true;
            } else {
                _profile = null;
                _isValid = false;
            }
        });
    };
    // TODO
    // _loadProfile();

    // Get Configurations Map
    var _getConfiguration = function() {
        return lang.getObject('configruation', true, _profile);
    };

    // Persisted Configurations
    var _setCustomConfig = function(key, value) {
        request.put('service/security/custom/' + key, {
            handleAs : 'json',
            // sync : true,
            data : JSON.stringify(value)
        });
    };

    // Get Configurations From Persisted Storage
    var _getCustomConfig = function(key) {
        var value = null;
        request.get('service/security/custom/' + key, {
            handleAs : 'json',
            sync : true
        }).then(function(data) {
            if (data || data.items) {
                value = JSON.parse(data.items);
            }
        });
        return value;
    };

    // Get Password Options. Default Value is 30,7
    var _period = 30;
    var _prompt = 7;
    var _getPasswordOptions = function() {
//        request.post('service/security/password/options', {
//            handleAs : 'json',
//            sync : true
//        }).then(function(data) {
//            if (data) {
//                if (data.period)
//                    _period = Number(data.period);
//                if (data.prompt)
//                    _prompt = Number(data.prompt);
//            }
//        });
    }
    _getPasswordOptions();

    // Get Rest Period Before Expiration
    var _getRestPeriod = function() {
        var lastModifiedTime = lang.getObject('user.updateTime', false, _profile) || lang.getObject('user.createTime', false, _profile);
        var systemTime = lang.getObject('systemTime', false, _profile);
        if (lastModifiedTime) {
            return _period + date.difference(new Date(systemTime), new Date(lastModifiedTime), 'day');
        }
    };

    return {
        /**
         * clear all profile. Such as logout
         */
        clear : function() {
            _profile = null;
            _isValid = false;
            // TODO
            request.del('service/security/profile', {
                handleAs : 'json',
                sync : true
            });
        },

        /**
         * set profile
         * 
         * @param profile-object
         */
        set : function(/* Object */profile) {
            // TODO
            if (hash() == '/login') {
                _profile = {};
                lang.mixin(_profile, profile);
                _isValid = true;
            }
        },

        /**
         * get profile or custom configuration with key
         */
        get : function(/* String */key) {
            if (key != undefined) {
                // first get from cache
                var content = lang.getObject(key, false, _getConfiguration());
                if (content)
                    return content;
                // then from persisted storage
                content = _getCustomConfig(key);
                if (content) {
                    lang.setObject(key, content, _getConfiguration());
                    return content;
                }
                return null;
            }
            return lang.clone(_profile);
        },

        /**
         * set custom configuration with key
         */
        put : function(/* String */key,/* Object */content) {
            if (key == undefined || content == undefined)
                return;
            // set to cache
            lang.setObject(key, content, _getConfiguration());
            // set to persisted storage
            _setCustomConfig(key, content);
        },

        /**
         * isValid
         */
        isValid : function() {
            // Reload Profile and Check whether Profile is valid
            _loadProfile();
            return _isValid && (_profile != null);
        },

        /**
         * user password is expired. TIP: when value is null or undefined means
         * no user data, and can't use this info to do something.
         */
        isExpired : function() {
            var rest = _getRestPeriod();
            if (rest || rest == 0) {
                return rest <= 0;
            }
        },

        /**
         * get rest available days to use system. TIP: when value is null or
         * undefined means need not prompt user to change password.
         */
        getRemainingDays : function() {
            var rest = _getRestPeriod();
            if (rest || rest == 0) {
                if (rest < 0)
                    return 0;
                else if (rest <= _prompt)
                    return rest;
            }
        },

        /**
         * hasPermission
         * 
         * @param permission
         */
        hasPermission : function(/* String */permission) {
            if (!permission) {
                return true;
            }
            if (_profile && _profile.permission) {
                if (permission.match(/,|\|/)) {
                    return array.some(permission.split(/,|\|/), function(p) {
                        return array.some(_profile.permission, function(item) {
                            return string.trim(item) == string.trim(p);
                        });
                    });
                } else if (permission.match(/&/)) {
                    return array.every(permission.split(/&/), function(p) {
                        return array.some(_profile.permission, function(item) {
                            return string.trim(item) == string.trim(p);
                        });
                    });
                } else {
                    return array.some(_profile.permission, function(item) {
                        return string.trim(item) == string.trim(permission);
                    });
                }
            }
            return false;
        }
    };

});
