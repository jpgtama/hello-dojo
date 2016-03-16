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
 * FILE NAME: JsonUtil.js
 * 
 * CREATED: Feb 9, 2015 2:58:00 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define(function() {
    return {
        // get the value from json object with the key including dot character
        getValue : function(/* Object */json, /* String */key) {
            // if (!json) return undefined;
            // if (key.indexOf('.') < 0) return json[key];
            // var keys = key.split('.');
            //
            // var str = "json";
            // for (var i in keys) {
            // str += "['" + keys[i] + "']";
            // }
            // try {
            // return eval(str);
            // } catch (e) {
            // console.log(e);
            // return undefined;
            // }
            try {
                return eval('json.' + key);
            } catch (e) {
                return undefined;
            }
        },

        setValue : function(/* Object */json, /* String */key, /* any */value) {
            if (!json)
                return;
            if (key.indexOf('.') < 0) {
                json[key] = value;
                return;
            }

            var keys = key.split('.');
            var obj = json;
            for ( var i in keys) {
                var k = keys[i];
                if (i == keys.length - 1) {
                    obj[k] = value;
                    return;
                }
                if (!obj[k]) {
                    obj[k] = {};
                }
                obj = obj[k];
            }
        }
    }
});
