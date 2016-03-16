define([ 'dojo/date' ], function(date) {
	return {
		getWorkdayArray : function(dateStart, dateEnd, period) {
			var tempDate = dateStart;
			var workdayArray = [];
			var workdayArrayDisplay = [];
			while (tempDate.getTime() <= dateEnd.getTime()) {
				workdayArray.push(tempDate.getTime());
				workdayArrayDisplay.push(tempDate);

				tempDate = date.add(tempDate, "day", period);
			}
			return {
				'workdayArray' : workdayArray,
				'workdayArrayDisplay' : workdayArrayDisplay
			};
		}
	};
});