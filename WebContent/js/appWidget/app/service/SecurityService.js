define([
    'app/service/_BaseService'
], function(_BaseService) {
    return dojo.declare('app.service.SecurityService', [_BaseService], {

        configKey: 'security'

    });
});
