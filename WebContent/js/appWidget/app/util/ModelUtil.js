define([], function() {
    return {
    	//set all the attributes in model from stateful object
        getModelValue: function(model, stateful) {
        	for (key in model) {
            	model[key] = stateful.get(key);
            }
            return model;
        }
    }
});
