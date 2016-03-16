define([
    'app/service/_BaseService',
    'dojo/string',
    'app/config/appConfig'
], function(_BaseService, string, appConfig) {
    return dojo.declare('app.service.EnumItemService', [_BaseService], {

        constructor: function(module) {
            this.inherited('constructor', arguments);
            dojo.safeMixin(this, {
                resourceUrl: string.substitute(appConfig.dict, {
                    module: module,
                    locale: dojoConfig.locale
                })
            });
        }

    });
});
