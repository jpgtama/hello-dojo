define([
    'dijit/ProgressBar',
    'dojo/_base/declare'
], function(ProgressBar, declare) {

    
    var DPB = declare(ProgressBar, {

        startup : function() {
            // parent
            this.inherited(arguments);

            // add to instance group
            DPB.addToInstanceGroup(this);
        }

    });
    
    // static properties
    DPB.instanceGroup = {};
    
    DPB.addToInstanceGroup = function(dpb){
        var groupArray = DPB.instanceGroup[dpb.group] || [];
        
        groupArray.push(dpb);
        
        DPB.instanceGroup[dpb.group] = groupArray;
    };
    
    
    return DPB; 

});