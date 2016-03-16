define([], function() {
    return {
        getRandomInt: function(min, max) {
            return Math.floor((Math.random() * max) + min);
        }
    }
});
