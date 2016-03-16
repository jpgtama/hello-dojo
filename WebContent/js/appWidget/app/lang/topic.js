define([
    'dojo/topic'
], function(topic){

    return {
		publish: function(_topic, event){
			return topic.publish(_topic, event);
		},

		subscribe: function(_topic, listener){
			return topic.subscribe(_topic, listener);
		}
	};
});
