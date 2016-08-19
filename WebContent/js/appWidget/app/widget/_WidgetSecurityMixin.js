define([
    '../config/profileConfig',
    'dojo/aspect',
    'dojo/dom',
    'dojo/dom-style',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/_base/declare'
], function(profileConfig, aspect, dom, domStyle, string, lang, declare) {
    return declare('app.widget._WidgetSecurityMixin', null, {

        // given permission key
        permission : '',

        // false is enable mode when true is visible mode.
        visibleMode : true,

        // when visibleMode is true, true will use css visibility hidden
        hiddenMode : false,

        // when visibleMode is true, true will use css display none
        displayMode : false,

        /** Override* */
        constructor : function() {
            var _this = this;
            aspect.after(_this, 'postCreate', function() {
                if (_this.permission == '')
                    return;
                // console.log('postCreate aspect.........', _this.id,
                // _this.widgetid, _this.containerNode);
                var outputNode = _this.srcNodeRef || _this.domNode;
                // var outputNode = dijit.byId(this.id).domNode;

                // domStyle.set(outputNode, 'display', 'none');

                var hasPermission = profileConfig.hasPermission(_this.permission);

                if (!hasPermission) {
                    if (_this.visibleMode)
                        if (_this.displayMode)
                            domStyle.set(outputNode, 'display', 'none');
                        else if (_this.hiddenMode)
                            domStyle.set(outputNode, 'visibility', 'hidden');
                        else
                            _this.destroy();
                    else
                        _this.set('disabled', true);
                }
            });
        }
    });
});
