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
 * FILE NAME: _WidgetSearchMixin.js
 * 
 * CREATED: 2016年6月13日 下午1:06:03
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/string',
    'dojo/_base/declare'
], function(string, declare) {
    return declare('app.widget._WidgetSearchMixin', null, {

        // queryExpr: String
        // This specifies what query is sent to the data store,
        // based on what the user has typed. Changing this expression will
        // modify
        // whether the results are only exact matches, a "starting with" match,
        // etc.
        // `${0}` will be substituted for the user text.
        // `*` is used for wildcards.
        // `${0}*` means "starts with", `*${0}*` means "contains", `${0}` means
        // "is"
        queryExpr : "*${0}*",

        // ignoreCase: Boolean
        // Set true if the query should ignore case when matching possible items
        ignoreCase : true,

        // summary:
        // Helper function to convert a simple pattern to a regular expression
        // for matching.
        // description:
        // Returns a regular expression object that conforms to the defined
        // conversion rules.
        // For example:
        //
        // - ca* -> /^ca.*$/
        // - *ca* -> /^.*ca.*$/
        // - *c\*a* -> /^.*c\*a.*$/
        // - *c\*a?* -> /^.*c\*a..*$/
        //
        // and so on.
        // pattern: string
        // A simple matching pattern to convert that follows basic rules:
        //
        // - * Means match anything, so ca* means match anything starting with
        // ca
        // - ? Means match single character. So, b?b will match to bob and bab,
        // and so on.
        // - \ is an escape character. So for example, \* means do not treat *
        // as a match, but literal character *.
        //
        // To use a \ as a character in the string, it must be escaped. So in
        // the pattern it should be
        // represented by \\ to be treated as an ordinary \ character instead of
        // an escape.
        _patternToRegExp : function(pattern) {
            return new RegExp("^" + pattern.replace(/(\\.)|(\*)|(\?)|\W/g, function(str, literal, star, question) {
                return star ? ".*" : question ? "." : literal ? literal : "\\" + str;
            }) + "$", this.ignoreCase ? "mi" : "m");
        },

        /**
         * Convert given text to search RegExp.
         */
        _convertToRegExp : function(text) {
            // replace queryExpr with user input & escape special char: \, *, ?
            // -> \\, \*, \?
            var qs = string.substitute(this.queryExpr, [
                text.replace(/([\\\*\?])/g, "\\$1")
            ]);
            var q = this._patternToRegExp(qs);
            q.toString = function() {
                return qs;
            };
            return q;
        }

    });
});