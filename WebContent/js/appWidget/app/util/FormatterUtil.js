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
 * FILE NAME: FormatterUtil.js
 * 
 * CREATED: Jul 24, 2015 2:33:30 PM
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/util/EnumUtil',
    'app/util/ResourceUtil',
    'dojo/date/locale',
    'dojo/string',
    'dojo/_base/array',
    'dojo/_base/lang'
], function(EnumUtil, i18n, locale, string, array, lang) {

    /**
     * {count,i18n} payments averaging {avg,date,yyyy/mm/dd} USD per
     * payment{sex,enum,gender}.
     */
    var _getFormatter = function(/* String */pattern) {

        // Internal Formatters
        var customFormatters = {
            i18n : function(value, opts) {
                return i18n.getText(value);
            },
            date : function(value, opts) {
                if (value || value == 0)
                    return locale.format(new Date(value), {
                        selector : 'date',
                        datePattern : opts[0]
                    });
                else
                    // Ignore null
                    return '';
            },
            enum : function(value, opts) {
                return EnumUtil.getValue(opts[0], value);
            }
        };

        var formatter = function(/* Object */cell,/* Object */row) {

            var result = lang.replace(pattern, lang.hitch(row,
            /* key must be /{.*}/ */
            function(_, key) {
                var parts = array.map(key.split(','), function(item) {
                    return string.trim(item);
                });

                if (parts.length == 1) {
                    var value = lang.getObject(parts[0], false, row);
                    if (value == null) // Ignore null
                        return '';
                    return value;
                }

                // Fetch Value
                var value = parts[0];
                var type = parts[1].toLowerCase();

                if (type == 'fn') {
                    return eval(value)(cell, row);
                }

                if (/^'.*'$/.test(value))
                    value = eval(value);
                else
                    value = lang.getObject(value, false, row);

                // Get Formatter
                if (lang.getObject(type, false, customFormatters)) {
                    return customFormatters[type](value, parts.slice(2));
                } else {
                    console.error(lang.replace('formatter {0} not found', [
                        type
                    ]));
                    return value;
                }
            }));

            // result if contain {}
            if (/\{.+\}/.test(result)) {
                result = _getFormatter(result)(cell, row);
            }

            return result;
        };

        return formatter;
    };

    return {
        getFormatter : _getFormatter
    };

});