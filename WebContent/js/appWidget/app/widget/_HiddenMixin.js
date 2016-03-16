define([
    'dojo/aspect',
    'dojo/dom',
    'dojo/dom-style',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(aspect, dom, domStyle, string, lang, declare) {
    return declare('app.widget._HiddenMixin', null, {

        //widget is hidden
        isHidden : false,

        constructor : function() {
            aspect.after(this, 'postCreate', lang.hitch(this, function() {
                if (this.isHidden) {
                    domStyle.set(this.domNode, 'display', 'none');
                }
            }));
        },
    });
});
