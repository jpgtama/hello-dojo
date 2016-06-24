define([
    './_HeaderMixin',
    'dgrid/Grid',
    'dojo/_base/declare'
], function(_HeaderMixin, Grid, declare) {

    return declare([
        Grid,
        _HeaderMixin
    ], {
        
        /**
         * the array data
         */
        data : null,

        
        /**
         * Override
         */
        startup: function() {
            // call parent
            this.inherited(arguments);
            
            // render data
            if(this.data){
                this.renderArray(this.data);
            }
        }
        
        
        
    });

});