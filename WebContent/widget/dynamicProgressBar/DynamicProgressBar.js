define([
    'dijit/ProgressBar',
    'dojo/_base/declare'
], function(ProgressBar, declare) {

    
    var DPB = declare(ProgressBar, {

        startup : function() {
            // parent
            this.inherited(arguments);

            // 
            var i = 0;
            var _this = this;
            setInterval(function() {
                _this.set("value", i++ % 100);
            }, 100);

        }

    });
    
    // static properties
    DPB.hello = 'hello';
    
    
    return DPB; 

});