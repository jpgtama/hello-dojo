package com.philips.his.pixiu.cdr.formula.parser;

import java.util.Calendar;
import java.util.Date;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Hours;
import org.joda.time.Minutes;
import org.joda.time.Months;
import org.joda.time.Seconds;
import org.joda.time.Weeks;
import org.joda.time.Years;

public class DateCalc extends Calc {
	
	@Override
	public <Long> Long run(String oneExp, Context ctx) {
		String[] array = oneExp.split(" ");
		
		String op = array[0];
		String a = array[1];
		String b = array[2];
		
		if ("-".equals(op)) {
			return null;
		}
		
		throw new RuntimeException("no operation for date" + op);
	}
	
	public static void main_(String[] args) {
		
		DateTime start = new DateTime(System.currentTimeMillis() - 1200 * 60 * 60 * 24 * 3);
		
		DateTime end = new DateTime(System.currentTimeMillis());
		
		int years = Years.yearsBetween(start, end).getYears();
		
		int months = Months.monthsBetween(start, end).getMonths();
		
		int weeks = Weeks.weeksBetween(start, end).getWeeks();
		
		int days = Days.daysBetween(start.withTimeAtStartOfDay(), end.withTimeAtStartOfDay()).getDays();
		
		int hours = Hours.hoursBetween(start, end).getHours();
		
		int minutes = Minutes.minutesBetween(start, end).getMinutes();
		
		int seconds = Seconds.secondsBetween(start, end).getSeconds();
		
		System.out.println(String.format("years: %s, months: %s, weeks: %s, days: %s, hours: %s, minutes: %s, seconds: %s", years, months, weeks, days, hours,
				minutes, seconds));
		
	}
	
	public static void main(String[] args) {
		DateTime dt1 = new DateTime("2016-2-28");
		DateTime dt2 = new DateTime("2016-3-1");
		
		System.out.println(Days.daysBetween(dt1, dt2).getDays());
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		
		System.out.println(cal.getActualMaximum(Calendar.DAY_OF_YEAR));
		
	}
	
}
